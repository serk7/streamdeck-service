import changeScene from "./obs/changeScene"
import microphone from "./obs/microphone"

import say from "./twitch/say"
import prediction from "./twitch/prediction"

export default {
    obs: {
        changeScene,
        microphone
    },
    twitch: {
        say,
        prediction
    }
}