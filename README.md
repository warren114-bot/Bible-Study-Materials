# 📚 Bible Study Materials

A comprehensive desktop application for Bible study classes with materials, schedules, and discussion forums.

## Features

- 📖 **Study Materials** - Access comprehensive Bible study resources
- 👥 **Class Schedules** - View and manage Bible study classes
- 💬 **Discussion Forum** - Engage with community members
- 🖥️ **Cross-Platform** - Works on Windows, macOS, and Linux
- 🌐 **Web & Desktop** - Available as both web app and standalone desktop application
- ⚡ **Real-time API** - Dynamic content with Express.js backend

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/warren114-bot/Bible-Study-Materials.git
cd Bible-Study-Materials
```

### 2. Install dependencies

```bash
npm install
```

## Development

### Run both API and Desktop App

```bash
npm run dev
```

This will start:
- 🔌 API server on `http://localhost:3000`
- 🖥️ Electron app displaying the UI

### Run only the API

```bash
npm run api
```

### Run only the Desktop App

```bash
npm start
```

## Build

### Build for current platform

```bash
npm run build
```

This generates installers for your OS:
- **Windows**: `.exe` installer and portable executable
- **macOS**: `.dmg` disk image and `.zip` archive
- **Linux**: `.AppImage` and `.deb` packages

## Deployment & Going Live

### 🚀 Automated Deployment

This project uses GitHub Actions for continuous integration and deployment.

#### For Web Deployment

Every push to `main` automatically deploys to GitHub Pages:
- **Web URL**: `https://warren114-bot.github.io/Bible-Study-Materials/`

#### For Desktop Releases

Create a release to build for all platforms:

```bash
# Create and push a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

GitHub Actions will automatically:
1. Build for Windows, macOS, and Linux
2. Create installers for each platform
3. Publish a GitHub Release with all installers
4. Make them available for download

### Manual Build & Release

If you want to build manually:

```bash
npm run build
```

Installers will be in the `dist/` directory.

## Project Structure

```
Bible-Study-Materials/
├── main.js                 # Electron main process
├── preload.js             # Secure preload script
├── package.json           # Project configuration
├── public/
│   ├── index.html        # Web UI
│   ├── app.js            # Client-side logic
│   └── style.css         # Styling
├── server/
│   └── api.js            # Express.js API server
└── .github/workflows/
    ├── build-and-deploy.yml  # Build & web deployment
    └── release.yml           # Cross-platform build & release
```

## API Endpoints

### Health Check
```bash
GET http://localhost:3000/api
```

### Study Materials
```bash
GET http://localhost:3000/api/materials
GET http://localhost:3000/api/materials/:id
```

### Classes
```bash
GET http://localhost:3000/api/classes
```

### Discussion Forum
```bash
GET http://localhost:3000/api/discussion
POST http://localhost:3000/api/discussion
```

## Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Desktop**: Electron.js
- **Backend**: Express.js
- **Build**: electron-builder
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages (web) + GitHub Releases (desktop)

## Security

- ✅ Context isolation enabled in Electron
- ✅ Preload script validation
- ✅ CORS enabled for API
- ✅ Input validation on server
- ✅ No remote code execution

## Troubleshooting

### API not connecting
Make sure the API server is running:
```bash
npm run api
```

### Port 3000 already in use
Change the port:
```bash
PORT=3001 npm run api
```

### Build fails
Try reinstalling dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open a GitHub issue or contact the team.

---

**Made with ❤️ for Bible Study Communities**

**Status**: 🚀 Ready to deploy! Just push a version tag to go live.
