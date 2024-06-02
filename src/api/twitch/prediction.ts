import Twitch from "../../modules/twitch";

export default function prediction(channel: string, title: string, outcomes: string[], duration: number, twitch: Twitch) {
    return twitch.predicition(channel, title, outcomes, duration)
}