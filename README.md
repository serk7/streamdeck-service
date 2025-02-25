# Streamdeck-service

This is a simple service that allows you to control your Streamdeck from a web interface. It is built using the [twurple](https://twurple.js.org/) to connect to twitch chat and the [obs-websocket-js](https://github.com/obs-websocket-community-projects/obs-websocket-js) to connect to [OBS](https://obsproject.com/).

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [OBS](https://obsproject.com/)
- [xdotool](https://www.semicomplete.com/projects/xdotool/)
- [Xorg](https://www.x.org/wiki/)
- [Wayland](https://wayland.freedesktop.org/)(May work everything less script to open applications)

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `config.json` file in the root of the project with the following content:
```
{
    "obs": {
        "url": "ws://localhost:4455",
        "password": "12345"
    },
    "twitch": {
        "userId": "YOUR_TWITCH_USER_ID",
        "clientId": "YOUR_TWITCH_CLIENT_ID",
        "clientSecret": "YOUR_TWITCH_SECRET"
    },
    "server": {
        "port": 3000
    }
}
```

## Usage

1. Run `npm start`

## Features

### OBS
- Change scenes
- Get input settings
- Set input settings
- Get item list from scene
- Mute/Unmute microphone
### Twitch
- Send messages to chat
- Start prediction
### Scripts
- Open an application and set it to a specifict input in OBS

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.