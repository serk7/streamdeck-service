import OBS from '../../modules/obs'

export default function changeScene (scene: string, obs: OBS) {
    return obs.changeScene(scene)
}