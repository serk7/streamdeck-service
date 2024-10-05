import OBS from '../../modules/obs'

export default async function changeScene (scene: string, obs: OBS) {
    return await obs.changeScene(scene)
}