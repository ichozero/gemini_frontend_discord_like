# Gemini Chat - Discord Like Application

[![English](https://img.shields.io/badge/Language-English-blue?style=flat-square)](./README_EN.md) [![中文](https://img.shields.io/badge/语言-中文-red?style=flat-square)](./README.md)

![Version](https://badgen.net/badge/version/0.1.0-a1/blue)
![React](https://badgen.net/badge/React/18.2.0/61dafb)
![Electron](https://badgen.net/badge/Electron/28.0.0/47848f)

This is a Discord-style chat application project designed to provide a modern, beautiful, and feature-rich Gemini API chat client. The project supports multi-platform deployment, including web applications, desktop applications, and mobile applications, providing users with a unified and excellent chat experience.

## ✨ Features

### 🎨 User Interface
- **Discord-style Design** - Familiar chat interface to reduce learning curve
- **Responsive Layout** - Perfect adaptation to desktop, tablet, and mobile devices
- **Dark Theme** - Eye-friendly dark design style
- **Real-time Status Display** - Visual feedback for connection status, loading status, etc.

### 💬 Chat Features
- **Real-time Messaging** - Smooth chat experience
- **Message Copy Function** - One-click copy message content
- **Message History** - Local storage of chat records
- **Long Press Selection** - Mobile-friendly interaction methods

### ⚙️ Configuration Management
- **Flexible API Configuration** - Support for custom protocols, IP addresses, and ports
- **Configuration Persistence** - Automatic saving of user configurations
- **Connection Testing** - One-click API connectivity testing
- **Configuration File Management** - Electron version supports configuration file viewing

### 📊 Logging System
- **Real-time Log Display** - View application running status
- **Multi-level Logging** - Support for info, warning, error levels
- **Log Export** - Convenient for troubleshooting and debugging

### 🖥️ Cross-platform Support
- **Web Application** - Direct browser access
- **Desktop Application** - Native applications for Windows, macOS, Linux
- **Mobile Application** - Android, iOS applications (based on Capacitor)

## 🛠️ Technology Stack

### Frontend Core
- **React 18.2.0** - Modern user interface library
- **Vite 5.0.0** - Fast build tool and development server
- **Axios 1.6.0** - HTTP client for API communication
- **Lucide React 0.294.0** - Elegant icon library

### Desktop
- **Electron 28.0.0** - Cross-platform desktop application framework
- **Electron Builder 24.9.1** - Application packaging and distribution tool

### Mobile
- **Capacitor 7.4.2** - Cross-platform mobile application framework
- Support for Android and iOS native features

### Development Tools
- **TypeScript Support** - Type-safe development experience
- **Hot Reload** - Real-time updates during development
- **Code Splitting** - Application performance optimization
- **Multi-environment Build** - Support for development, testing, production environments

## 🔧 Configuration

### API Configuration
The application supports flexible API configuration:
- **Protocol**: HTTP/HTTPS
- **Server Address**: IP address or domain name
- **Port Number**: Custom port
- **Request Path**: API endpoint path

### Build Configuration
The project supports multiple build targets:
- `BUILD_TARGET=web` - Web application build
- `GITHUB_PAGES=true` - GitHub Pages build
- `NODE_ENV=production` - Production environment build

## 📂 Project Structure

```
gemini_request_discord_like/
├── src/                    # Source code directory
│   ├── App.jsx            # Main application component
│   ├── TitleBar.jsx       # Title bar component
│   ├── useConfig.js       # Configuration management Hook
│   └── *.css              # Style files
├── electron/              # Electron related files
│   ├── main.js           # Main process entry
│   └── preload.js        # Preload script
├── public/               # Static resources
├── dist/                 # Build output directory
├── dist-electron/        # Electron build output
├── package.json          # Project configuration
├── vite.config.js        # Vite configuration
├── capacitor.config.json # Capacitor configuration
└── README.md             # Project documentation
```

## 🌐 Online Experience

- **Live Preview**: [Gemini Chat - Discord Like](https://us-hudiyun.vincentzyu233.cn/gemini_frontend/)
- **GitHub Pages**: [Demo Site](https://ichozero.github.io/gemini_frontend_discord_like/)

## 📖 Documentation Links

- **Development Guide**: [dev.md](./dev.md) - Detailed local development instructions
- **Deployment Guide**: [prod.md](./prod.md) - Production environment deployment instructions
- **API Documentation**: View API integration instructions in the project

## 🤝 Contributing Guide

We welcome all forms of contributions! Please check the following guidelines:

1. **Fork** this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Development Standards
- Follow ESLint code standards
- Ensure code passes all tests
- Add appropriate documentation for new features
- Keep commit messages clear and concise


## ⭐ Support the Project

If this project is helpful to you, please give it a ⭐ Star!

---

> 💡 **Tip**: Check [dev.md](./dev.md) for detailed development environment setup guide, or see [prod.md](./prod.md) to understand the production environment deployment process.
