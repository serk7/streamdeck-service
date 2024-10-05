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
        this.app.use(express.json())
        this.config = config
        this.obs = obs
        this.twitch = twitch
    }

    start() : Promise<void>{
        this.app.use('/obs/change_scene/:sceneName', async (req, res) => {
            try {
                await api.obs.changeScene(req.params.sceneName, this.obs)
                res.send("OK")
            } catch (error) {
                res.status(500).send(error)
            }
        })
        
        this.app.use('/obs/microphone/:mute', async (req, res) => {
            try {
                await api.obs.microphone(req.params.mute === "mute", this.obs)
                res.send("OK")
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.use('/twitch/say/:channel/:message', async (req, res) => {
            try {
                await api.twitch.say(req.params.channel, req.params.message, this.twitch)
                res.send("OK")
            } catch (error) {
                res.status(500).send(error)
            }
        })
        
        this.app.post('/twitch/prediction/:channel', async (req, res) => {
            const requiredFields = ["title", "outcomes", "duration"]
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    res.status(400).send(`Missing required field: ${field}`)
                    return
                }
            }
            const {title, outcomes, duration} = req.body
            try {
                await api.twitch.prediction(req.params.channel, title, outcomes, duration, this.twitch)
                res.send("OK")
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.get('/obs/get_scene_item_list/:scene', async (req, res) => {
            try {
                const items = await api.obs.getSceneItemList(req.params.scene, this.obs)
                res.send(items)
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.get('/obs/get_input_settings/:inputName', async (req, res) => {
            try {
                const settings = await api.obs.getInputSettings(req.params.inputName, this.obs)
                res.send(settings)
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.post('/obs/set_input_settings/:inputName', async (req, res) => {
            try {
                await api.obs.setInputSettings(req.params.inputName, req.body, this.obs)
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
