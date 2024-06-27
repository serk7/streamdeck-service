import OBSWebSocket from "obs-websocket-js"

interface IOBS {
    url: string,
    password: string
}

export default class OBS {
    private obs: OBSWebSocket = new OBSWebSocket()
    private config: IOBS = {} as IOBS

    constructor(config: IOBS) {
        this.config = config
    }

    connect() {
        return this.obs.connect(this.config.url, this.config.password)
    }

    changeScene(scene: string) {
        return this.obs.call("SetCurrentProgramScene", {
            sceneName: scene
        })
    }

    microphone(mute: boolean) {
        return this.obs.call("SetInputMute", {
            inputName: "Mic/Aux",
            inputMuted: mute
        })
    }

    startTimer() {
        return this.obs.call("CallVendorRequest", {
            vendorName: "adanced-timer",
            requestType: "start_timer"
        })
    }
}