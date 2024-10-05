import OBS from '../../modules/obs'

export default async function getInputSettings (inputName: string, obs: OBS) {
    return await obs.getInputSettings(inputName)
}