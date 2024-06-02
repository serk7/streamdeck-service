import { terminal as term } from "terminal-kit"
import OBS from "./modules/obs"
import Twitch from "./modules/twitch"
import Server from "./api/server"
import config from "../config.json"

term.blue.bold("Starting StreamDeck Service By Bubexel\n\n")

const obs = new OBS(config.obs)
const twitch = new Twitch(config.twitch)
const server = new Server(config.server, obs, twitch)

async function main() {
    try {
        await obs.connect()
        term.green("Connected to OBS\n")
        await twitch.connect()
        term.green("Connected to Twitch\n")
        await server.start()
        term.green(`Server running on port ${config.server.port}\n`)
    } catch (error) {
        term.red("Error connecting to OBS\n")
        term.red(error)
        term.processExit(1)
    }
}

main()