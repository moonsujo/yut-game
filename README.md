<<<<<<< Updated upstream
# YUT NORI - WEB MULTIPLAYER
www.yutnori.app: Classic Korean board game that can be played with multiple devices
=======
# Yutnori (윷놀이) - Online 3D Korean Board Game

🎮 **Play Now:** [yutnori.app](https://yutnori.app)

## About

Yutnori (윷놀이) is a traditional Korean board game that has been played for centuries, especially during Korean New Year celebrations. This project brings the classic game to life with stunning 3D graphics, real-time multiplayer capabilities, and an interactive animated rulebook.

## Features

- 🎲 **3D Animated Gameplay** - Experience realistic yut stick throws with physics-based animations
- 👥 **Multiplayer** - Play with friends online in real-time or challenge AI opponents
- 📖 **Interactive Rulebook** - Learn the game through a beautifully animated 3D tutorial
- 🌐 **Cross-Platform** - Play directly in your browser on desktop, tablet, or mobile
- 🆓 **Free to Play** - No downloads, no registration required
- 🎨 **Beautiful Graphics** - Built with Three.js and React Three Fiber for immersive 3D experiences
- 🔊 **Sound Effects** - Authentic audio feedback for an engaging experience

## Game Rules (Quick Overview)

Yutnori is a race game where players move their pieces around a board based on the throw of four wooden sticks:

- **Do** (도): 1 space
- **Ge** (개): 2 spaces  
- **Gul** (걸): 3 spaces
- **Yut** (윷): 4 spaces + extra throw
- **Mo** (모): 5 spaces + extra throw
- **Backdo** (뒷도): -1 space (skip turn if no tokens on the board)
- **Nak** (낙): 0 space (sticks out of bounds)

The first team to move all their pieces around the board and reach the finish wins!

## Technology Stack

### Client
- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Vite** - Fast build tool
- **Socket.io Client** - Real-time multiplayer communication
- **Wouter** - Lightweight routing

### Server
- **Node.js** - Server runtime
- **Express** - Web framework
- **Socket.io** - WebSocket communication
- **MongoDB/Mongoose** - Database (optional)

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/moonsujo/yut-game.git
cd yut-game
```

2. Install client dependencies:
```bash
cd client
npm install
```

3. Install server dependencies:
```bash
cd ../server
npm install
```

### Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client (in a new terminal):
```bash
cd client
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
yut-game/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── gameLogic/   # Game rules and logic
│   │   ├── meshes/      # 3D models and geometries
│   │   ├── seo/         # SEO and structured data
│   │   └── soundPlayers/# Audio management
│   └── public/          # Static assets
│       ├── models/      # 3D model files
│       ├── sounds/      # Audio files
│       └── textures/    # Image textures
├── server/              # Backend Node.js server
│   ├── rules/           # Game rules validation
│   └── src/             # Server source code
└── art-source/          # Original 3D assets (Blender files)
```

## Contributing

This project is open for viewing and learning, but please note the license restrictions. For contributions, please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with a clear description

Please respect the non-commercial and no-derivatives license terms.

## Credits

Created by [Beat Rhino Studio](https://github.com/moonsujo)

Yutnori (윷놀이) is a traditional Korean board game with a history spanning over a thousand years. This digital version aims to preserve and share this cultural heritage with a global audience.

## License

Copyright (c) 2025 Beat Rhino Studio

This project is licensed under **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**.

**What this means:**
- ✅ You can view and study the code
- ✅ You can share links to this repository
- ❌ You cannot use it for commercial purposes
- ❌ You cannot publish modified versions
- ❌ You cannot claim it as your own work

See the [LICENSE](LICENSE) file for full details.

For commercial licensing or collaboration inquiries, please contact the repository owner.

## Links

- 🌐 Website: [yutnori.app](https://yutnori.app)
- 📚 How to Play: [yutnori.app/how-to-play](https://yutnori.app/how-to-play)
- 🐙 GitHub: [github.com/moonsujo/yut-game](https://github.com/moonsujo/yut-game)

---

**Keywords:** yutnori, 윷놀이, korean board game, traditional korean game, yut, multiplayer game, 3D board game, online game, webgl game, three.js game, react game, korean culture
>>>>>>> Stashed changes
