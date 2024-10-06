import OBS from '../../modules/obs'
import { exec } from 'child_process'

async function getApplicationWindowsIds(application: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        exec(`xdotool search --onlyvisible --class "${application}"`, (err, stdout, stderr) => {
            if (err) {
                resolve([])
            } else {
                resolve(stdout.split('\n').filter(id => id))
            }
        })
    })
}

async function getApplicationWindowsTitle(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`xwininfo -id ${id} | grep xwininfo`, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                const title = stdout.split('"')[1]
                resolve(title)
            }
        })
    })
}

async function getApplicationWindowsSubTitle(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`xprop -id ${id} WM_CLASS`, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                const title = stdout.split('"')[1]
                resolve(title)
            }
        })
    })
}

async function openApplication(commandLine: string) : Promise<void> {
    return new Promise((resolve, reject) => {
        exec(`${commandLine} > /dev/null 2>&1 &`, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export default async function openAppOnInput (inputName: string, commandLine: string, obs: OBS) {
    const application = commandLine.split(' ')[0]
    const ids = await getApplicationWindowsIds(application)
    await openApplication(commandLine)
    do {
        var newIds = await getApplicationWindowsIds(application)
        await new Promise(resolve => setTimeout(resolve, 100))
    } while (ids.length == newIds.length)
    const id = newIds.filter(id => !ids.includes(id))[0]
    const title = await getApplicationWindowsTitle(id)
    const subTitle = await getApplicationWindowsSubTitle(id)
    await obs.setInputSettings(inputName, {
        capture_window: `${id}\r\n${title}\r\n${subTitle}`,
    })
}