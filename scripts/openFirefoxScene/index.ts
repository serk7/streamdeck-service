import { exec } from 'child_process'

async function getFirefoxWindowsIds(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        exec('xdotool search --onlyvisible --class "firefox"', (err, stdout, stderr) => {
            if (err) {
                resolve([])
            } else {
                resolve(stdout.split('\n').filter(id => id))
            }
        })
    })
}

async function getFirefoxWindowsTitle(id: string): Promise<string> {
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

async function getFirefoxWindowsSubTitle(id: string): Promise<string> {
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

async function openFireFox() {
    exec('firefox --new-instance -P "OBS" https://google.es > /dev/null 2>&1 &')
}

async function openFirefoxScene() {
    const ids = await getFirefoxWindowsIds()
    openFireFox()
    do {
        var newIds = await getFirefoxWindowsIds()
        await new Promise(resolve => setTimeout(resolve, 100))
    } while (ids.length == newIds.length)
    const id = newIds.filter(id => !ids.includes(id))[0]
    const title = await getFirefoxWindowsTitle(id)
    const subTitle = await getFirefoxWindowsSubTitle(id)
    await fetch('http://localhost:3000/obs/set_input_settings/Firefox', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            capture_window: `${id}\r\n${title}\r\n${subTitle}`,
        })
    })
    await fetch('http://localhost:3000/obs/change_scene/Firefox%20Scene')
}

openFirefoxScene()