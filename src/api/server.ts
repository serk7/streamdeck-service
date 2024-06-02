import express from 'express'
import OBS from '../modules/obs'
import Twitch from '../modules/twitch'
import api from './api'

interface IServer {
    port: number
}

export default class Server {
    private app: express.Application
    private config: IServer
    private obs: OBS
    private twitch: Twitch

    constructor(config: IServer, obs: OBS, twitch: Twitch) {
        this.app = express()
        this.config = config
        this.obs = obs
        this.twitch = twitch
    }

    start() : Promise<void>{
        this.app.use('/obs/change_scene/:sceneName', async (req, res) => {
            try {
                await api.changeScene(req.params.sceneName, this.obs)
                res.send("OK")
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.use('/twitch/say/:channel/:message', async (req, res) => {
            try {
                await api.say(req.params.channel, req.params.message, this.twitch)
                res.send("OK")
            } catch (error) {
                res.status(500).send(error)
            }
        })

        return new Promise((resolve, reject) => {
            this.app.listen(this.config.port, () => {
                resolve()
            });
        })
    }
}
