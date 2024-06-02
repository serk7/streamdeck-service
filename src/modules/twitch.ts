import { RefreshingAuthProvider } from "@twurple/auth";
import api, { ApiClient } from "@twurple/api";
import fs from "fs";

interface ITwitch {
    clientId: string,
    clientSecret: string,
    userId: string
}

interface AuthRefreshToken {
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    obtainmentTimestamp: number
}

export default class Twitch {
    private authProvider: RefreshingAuthProvider
    private authData: AuthRefreshToken
    private api: ApiClient

    constructor(config: ITwitch) {
        this.authData = <AuthRefreshToken>JSON.parse(fs.readFileSync(`./tokens.${config.userId}.json`, "utf-8"))
        this.authProvider = new RefreshingAuthProvider({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
        })
        this.api = new ApiClient({ authProvider: this.authProvider })
    }

    async connect() {
        await this.authProvider.addUserForToken(this.authData)
    }

    async say(channel: string, message: string) {
        const user = await this.api.users.getUserByName(channel)
        if (!user) throw new Error("User not found")
        await this.api.chat.sendChatMessage(user, message).catch(err => console.error(err))
    }
}