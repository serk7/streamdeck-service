import OBS from '../../modules/obs'

export default async function microphone (mute: boolean, obs: OBS) {
    return await obs.microphone(mute)
}