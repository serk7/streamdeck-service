import OBS from '../../modules/obs'

export default function microphone (mute: boolean, obs: OBS) {
    return obs.microphone(mute)
}