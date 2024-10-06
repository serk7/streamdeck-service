# Streamdeck-service

This is a simple service that allows you to control your Streamdeck from a web interface. It is built using the [twurple](https://twurple.js.org/) to connect to twitch chat and the [obs-websocket-js](https://github.com/obs-websocket-community-projects/obs-websocket-js) to connect to [OBS](https://obsproject.com/).

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [OBS](https://obsproject.com/)
- [xdotool](https://www.semicomplete.com/projects/xdotool/)
- [Xorg](https://www.x.org/wiki/) or [Wayland](https://wayland.freedesktop.org/)

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `config.json` file in the root of the project with the following content:
```
{
    "obs": {
        "address": "ws://localhost:4455",
        "password": "your-obs-password"
    },
    "twitch": {
        "username": "your-twitch-username",
        "password": "your-twitch-oauth-token",
        "channel": "your-twitch-channel"
    },
    "server": {
        "port": 3000
    }
}
```

## Usage

1. Run `npm start`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.