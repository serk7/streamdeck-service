import Twitch from "../../modules/twitch";

export default function say(channel: string, message: string, twitch: Twitch) {
    return twitch.say(channel, message)
}