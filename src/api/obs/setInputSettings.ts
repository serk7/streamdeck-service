import OBS from '../../modules/obs'

export default async function setInputSettings (inputName: string, settings: any, obs: OBS) {
    return await obs.setInputSettings(inputName, settings)
}