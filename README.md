# YouTube Speed Control

A lightweight browser extension that enhances YouTube's video playback speed controls with convenient keyboard shortcuts and a sleek on-screen display.

## Features

- **Keyboard Shortcuts**:

  - `Ctrl + ↑`: Increase playback speed by 0.05x
  - `Ctrl + ↓`: Decrease playback speed by 0.05x
  - `Ctrl + ↑ + ↓` (pressed together): Reset speed to 1x

- **Visual Feedback**:

  - Clean, minimal speed indicator overlay
  - Automatically fades to subtle opacity after 2 seconds
  - Updates in real-time as you change speeds

- **Speed Range**:
  - Minimum: 0.25x
  - Maximum: 16x
  - Increments: 0.05x

## Installation

### Temporary Installation (for testing)

1. Clone this repo `git clone https://github.com/milanmarton/yt-speed.git`
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Navigate to the extension's directory and select `manifest.json`

### Permanent Installation

1. Zip the extension files (`content.js`, `manifest.json`, and `styles.css`) directly (not the containing folder)
2. Rename the zip file to have `.xpi` extension (e.g., `youtube-speed-control.xpi`)
3. In Firefox, go to `about:addons`
4. Click the gear icon (⚙️) and select "Install Add-on From File"
5. Select your `.xpi` file

## How It Works

The extension adds a subtle speed indicator to the top-left corner of any YouTube video. The indicator becomes more visible when you change the playback speed and automatically fades after 2 seconds to avoid being distracting.

Speed changes persist until you either:

- Reset the speed using the keyboard shortcut
- Navigate to a different video
- Reload the page

## Technical Details

The extension consists of three main files:

- `content.js`: Handles keyboard events and speed control logic
- `manifest.json`: Extension configuration and permissions
- `styles.css`: Styling for the speed indicator overlay

## Contributing

Feel free to submit issues and pull requests for:

- Bug fixes
- New features
- Documentation improvements
- UI enhancements

## License

This project is open source and available under the MIT License.

## Acknowledgments

Inspired by the need for more precise YouTube playback speed controls while keeping the interface clean and minimal.
