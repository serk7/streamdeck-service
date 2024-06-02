import config from "../../config.json"
import express from "express"
import fs from "fs"

if (process.argv.length < 3) {
    console.log("Usage: node authtwitch.js <redirect_url>")
    process.exit(1)
}

const redirectUrl = process.argv[2]
const server = express()

var accessToken = ""
var refreshToken = ""

server.get("/", (req, res) => {
    if (req.query.code) {
        const { code } = req.query
        fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${config.twitch.clientId}&client_secret=${config.twitch.clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUrl}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(json => {
                accessToken = json.access_token
                refreshToken = json.refresh_token
                fs.writeFileSync(`./tokens.${config.twitch.userId}.json`, JSON.stringify({ accessToken, refreshToken, expiresIn: 0, obtainmentTimestamp: 0}))
                res.send(`<h1>success!!</h1><br>Token has been save into file tokens.${config.twitch.userId}.json<br><b>You can close this tab now.</b>`)
                console.log(`Access token: ${accessToken}`)
                console.log(`Refresh token: ${refreshToken}`)
                process.exit(0)
            })
            .catch(err => {
                console.error(err)
                res.send("error")
                process.exit(1)
            })
    } else {
        res.send("error")
        process.exit(1)
    }
})

server.listen(3000, () => {
    console.log('Server listening on port 3000');
    console.log(`Visit: https://id.twitch.tv/oauth2/authorize?client_id=${config.twitch.clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=user:write:chat+channel:manage:predictions`)
})