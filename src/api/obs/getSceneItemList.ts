import OBS from '../../modules/obs'

export default async function getSceneItemList (sceneName: string, obs: OBS) {
    return (await obs.getSceneItemList(sceneName))
}