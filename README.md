# CS2 Offline Cheat System 🎯

A comprehensive cheat system for Counter-Strike 2 offline bot games, featuring a classic CS:GO style interface with modern ES6+ implementation.

## ⚠️ IMPORTANT DISCLAIMER

**THIS IS FOR OFFLINE TESTING ONLY!**
- Never use on VAC-secured servers
- Only for offline bot games and testing
- Educational and QA testing purposes only
- Use at your own risk

## 🚀 Quick Start

### 1. Launch CS2 in Safe Mode
Start Counter-Strike 2 with these launch options:
```bash
-insecure -novid +map de_dust2 +bot_add +bot_difficulty 1
```

### 2. Open the Setup Interface
Open `setup_cs2_cheats.html` in your browser:
```bash
# Option 1: Direct file
start setup_cs2_cheats.html

# Option 2: Local server (recommended)
python -m http.server 8080
# Then visit: http://localhost:8080/setup_cs2_cheats.html
```

### 3. Load the Cheat System
Click "Load Cheat System" in the interface, then press **INSERT** to open the menu.

## 🎮 Controls

| Key | Action |
|-----|--------|
| **INSERT** | Toggle cheat menu |
| **END** | Panic key (disable all) |
| **H** | Hide/show setup interface |

## 🛠️ Features

### Aimbot
- **FOV**: Adjustable field of view (1-180°)
- **Smooth**: Aim smoothing (0.1-10.0)
- **RCS**: Recoil control system
- **Human-like**: Randomized imperfections

### Visuals
- **Wallhack**: See enemies through walls
- **ESP**: Boxes, names, health, distance
- **Radar**: Enhanced minimap
- **No Flash/Smoke**: Remove visual effects

### Movement
- **Bunny Hop**: Auto or perfect hopping
- **Speed Hack**: Movement speed multiplier
- **No Clip**: Phase through walls

### Misc
- **God Mode**: Infinite health
- **Skin Changer**: Weapon skins (planned)
- **Rank Revealer**: Show hidden ranks (planned)

## 📁 File Structure

```
cs2-cheat-system/
├── csgo420.js              # Main cheat interface
├── cs2_integration.js      # CS2 game integration
├── setup_cs2_cheats.html   # Setup interface
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔧 Technical Implementation

### Current Approach: Browser Overlay
The system currently runs as a browser overlay with simulated game integration. For actual CS2 integration, you need one of these methods:

#### Method 1: Memory Reading (Advanced)
```bash
# Install memory reading tools
npm install memoryjs  # May require build tools
# or use external tools like Cheat Engine
```

#### Method 2: DLL Injection (Expert)
- Convert JavaScript to native code
- Inject into CS2 process
- Hook game functions directly

#### Method 3: External Process (Safest)
- Read CS2 memory externally
- Overlay interface on top of game
- No process modification

### Memory Offsets
The system uses memory offsets to read game data. These change with CS2 updates:

```javascript
// Example offsets (update for your CS2 version)
dwLocalPlayer: 0x18233D8,
dwEntityList: 0x19BBCC8,
m_vecOrigin: 0x1268,
m_iHealth: 0x334,
// ... more offsets
```

**Finding Current Offsets:**
- Visit [hazedumper.github.io](https://hazedumper.github.io) for auto-updated offsets
- Use Cheat Engine to scan for patterns
- Use ReClass.NET for structure analysis

## 🛡️ Anti-Detection Features

- **Randomized Timings**: Human-like delays
- **Smooth Aim**: Natural movement curves
- **Panic Key**: Instant disable all features
- **Offline Only**: No network communication

## 🔧 Development Setup

```bash
# Clone/download the files
cd cs2-cheat-system

# Install dependencies
npm install

# Start development server
npm start
# or
python -m http.server 8080

# For Electron app
npm run dev
```

## 📊 System Status

The setup interface shows:
- ✓ CS2Integration - Core integration loaded
- ✓ CSGOStyleCheats - Main interface loaded  
- ✗ Memory Access - Requires implementation
- ✗ CS2 Process - Needs CS2 running

## 🎯 Usage Guide

### Basic Aimbot Setup
1. Open cheat menu (INSERT)
2. Go to "Aimbot" tab
3. Enable "Aimbot"
4. Adjust FOV (recommended: 60-90)
5. Set smoothing (recommended: 3-5)

### ESP Configuration
1. Go to "Visuals" tab
2. Enable "ESP" 
3. Choose desired options:
   - Boxes: Player outline boxes
   - Names: Player names
   - Health: Health bars and values
   - Distance: Distance in meters

### Safety Settings
- Always use with `-insecure` launch parameter
- Enable panic key for quick disable
- Start with low settings and increase gradually
- Never use on online servers

## 🔍 Troubleshooting

### Cheat Menu Not Showing
- Check browser console for errors
- Ensure both JS files are loaded
- Try refreshing the page

### Features Not Working
- Verify CS2 is running in offline mode
- Check that integration is initialized
- Update memory offsets for your CS2 version

### Performance Issues
- Lower ESP update frequency
- Reduce particle limits
- Disable unused features

### Memory Access Errors
- Run as administrator
- Check antivirus settings
- Verify CS2 process permissions

## 🔗 Resources

- **Offset Updates**: [hazedumper.github.io](https://hazedumper.github.io)
- **Memory Scanning**: [Cheat Engine](https://cheatengine.org/)
- **Structure Analysis**: [ReClass.NET](https://github.com/ReClassNET/ReClass.NET)
- **CS2 Development**: [Source 2 SDK](https://developer.valvesoftware.com/)

## 📜 License

MIT License - Educational and testing purposes only.

## ⚡ Quick Test

1. Open `setup_cs2_cheats.html`
2. Click "Load Cheat System"
3. Press INSERT key
4. You should see the cheat menu appear!

The system will run in demo mode without CS2, showing the interface and simulated features for testing and development.

---

**Remember: This is for educational and offline testing only. Always respect game terms of service and never use cheats on public servers or in competitive environments.** 