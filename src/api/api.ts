import changeScene from "./obs/changeScene"
import microphone from "./obs/microphone"
import getSceneItemList from "./obs/getSceneItemList"
import getInputSettings from "./obs/getInputSettings"
import setInputSettings from "./obs/setInputSettings"

import openAppOnInput from "./scripts/openAppOnInput"

import say from "./twitch/say"
import prediction from "./twitch/prediction"

export default {
    obs: {
        changeScene,
        microphone,
        getSceneItemList,
        getInputSettings,
        setInputSettings
    },
    scripts: {
        openAppOnInput
    },
    twitch: {
        say,
        prediction
    }
}