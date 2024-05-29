import { terminal as term } from "terminal-kit"
import OBS from "./modules/obs"
import Server from "./api/server"
import config from "../config.json"

term.blue.bold("Starting StreamDeck Service By Bubexel\n\n")

const obs = new OBS(config.obs)
const server = new Server(config.server, obs)

async function main() {
    try {
        await obs.connect()
        term.green("Connected to OBS\n")
        await server.start()
        term.green(`Server running on port ${config.server.port}\n`)
    } catch (error) {
        term.red("Error connecting to OBS\n")
        term.red(error)
        term.processExit(1)
    }
}

main()