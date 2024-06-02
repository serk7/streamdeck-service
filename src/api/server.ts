import express from 'express'
import OBS from '../modules/obs'
import api from './api'

interface IServer {
    port: number
}

export default class Server {
    private app: express.Application
    private config: IServer
    private obs: OBS

    constructor(config: IServer, obs: OBS) {
        this.app = express()
        this.config = config
        this.obs = obs
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

        return new Promise((resolve, reject) => {
            this.app.listen(this.config.port, () => {
                resolve()
            });
        })
    }
}
