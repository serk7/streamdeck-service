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

    async changeScene(scene: string) {
        return await this.obs.call("SetCurrentProgramScene", {
            sceneName: scene
        })
    }

    async microphone(mute: boolean) {
        return await this.obs.call("SetInputMute", {
            inputName: "Mic/Aux",
            inputMuted: mute
        })
    }

    async startTimer() {
        return await this.obs.call("CallVendorRequest", {
            vendorName: "adanced-timer",
            requestType: "start_timer"
        })
    }

    async getSceneItemList(scene: string) {
        return await this.obs.call("GetSceneItemList", {
            sceneName: scene
        })
    }

    async getInputSettings(inputName: string) {
        return await this.obs.call("GetInputSettings", {
            inputName: inputName
        })
    }

    async setInputSettings(inputName: string, settings: any) : Promise<any> {
        return await this.obs.call("SetInputSettings", {
            inputName: inputName,
            inputSettings: settings
        })
    }
}