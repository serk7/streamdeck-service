import changeScene from "./obs/changeScene"

import say from "./twitch/say"
import prediction from "./twitch/prediction"

export default {
    obs: {
        changeScene
    },
    twitch: {
        say,
        prediction
    }
}