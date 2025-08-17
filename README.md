# Gemini Chat - Discord Like Application

[![English](https://img.shields.io/badge/Language-English-blue?style=flat-square)](./README_EN.md) [![中文](https://img.shields.io/badge/语言-中文-red?style=flat-square)](./README.md)

![Version](https://badgen.net/badge/version/0.1.0-a1/blue)
![React](https://badgen.net/badge/React/18.2.0/61dafb)
![Electron](https://badgen.net/badge/Electron/28.0.0/47848f)

这是一个模仿 Discord 风格的聊天应用项目，旨在提供一个现代化、美观且功能丰富的 Gemini API 聊天客户端。项目支持多平台部署，包括 Web 应用、桌面应用和移动应用，为用户提供统一且优秀的聊天体验。

## ✨ 功能特性

### 🎨 用户界面
- **Discord 风格设计** - 熟悉的聊天界面，降低学习成本
- **响应式布局** - 完美适配桌面、平板和手机
- **暗色主题** - 护眼的暗色设计风格
- **实时状态显示** - 连接状态、加载状态等可视化反馈

### 💬 聊天功能
- **实时消息传输** - 流畅的聊天体验
- **消息复制功能** - 一键复制消息内容
- **消息历史记录** - 本地保存聊天记录
- **长按选择** - 移动端友好的交互方式

### ⚙️ 配置管理
- **灵活的 API 配置** - 支持自定义协议、IP 地址、端口
- **配置持久化** - 自动保存用户配置
- **连接测试** - 一键测试 API 连通性
- **配置文件管理** - Electron 版本支持配置文件查看

### � 日志系统
- **实时日志显示** - 查看应用运行状态
- **多级别日志** - 支持 info、warning、error 等级别
- **日志导出** - 便于问题排查和调试

### 🖥️ 跨平台支持
- **Web 应用** - 浏览器直接访问
- **桌面应用** - Windows、macOS、Linux 原生应用
- **移动应用** - Android、iOS 应用（基于 Capacitor）

## 🛠️ 技术栈

### 前端核心
- **React 18.2.0** - 现代化的用户界面库
- **Vite 5.0.0** - 快速的构建工具和开发服务器
- **Axios 1.6.0** - HTTP 客户端，用于 API 通信
- **Lucide React 0.294.0** - 优雅的图标库

### 桌面端
- **Electron 28.0.0** - 跨平台桌面应用框架
- **Electron Builder 24.9.1** - 应用打包和分发工具

### 移动端
- **Capacitor 7.4.2** - 跨平台移动应用框架
- 支持 Android 和 iOS 原生功能

### 开发工具
- **TypeScript 支持** - 类型安全的开发体验
- **热重载** - 开发时实时更新
- **代码分割** - 优化应用性能
- **多环境构建** - 支持开发、测试、生产环境


## 🔧 配置说明

### API 配置
应用支持灵活的 API 配置：
- **协议**: HTTP/HTTPS
- **服务器地址**: IP 地址或域名
- **端口号**: 自定义端口
- **请求路径**: API 端点路径

### 构建配置
项目支持多种构建目标：
- `BUILD_TARGET=web` - Web 应用构建
- `GITHUB_PAGES=true` - GitHub Pages 构建
- `NODE_ENV=production` - 生产环境构建

## 📂 项目结构

```
gemini_request_discord_like/
├── src/                    # 源代码目录
│   ├── App.jsx            # 主应用组件
│   ├── TitleBar.jsx       # 标题栏组件
│   ├── useConfig.js       # 配置管理 Hook
│   └── *.css              # 样式文件
├── electron/              # Electron 相关文件
│   ├── main.js           # 主进程入口
│   └── preload.js        # 预加载脚本
├── public/               # 静态资源
├── dist/                 # 构建输出目录
├── dist-electron/        # Electron 构建输出
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
├── capacitor.config.json # Capacitor 配置
└── README.md             # 项目说明
```

## 🌐 在线体验

- **在线预览**: [Gemini Chat - Discord Like](https://us-hudiyun.vincentzyu233.cn/gemini_frontend/)
- **GitHub Pages**: [Demo Site](https://ichozero.github.io/gemini_frontend_discord_like/)

## 📖 文档链接

- **开发指南**: [dev.md](./dev.md) - 详细的本地开发说明
- **部署指南**: [prod.md](./prod.md) - 生产环境部署说明
- **API 文档**: 查看项目中的 API 集成说明

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看以下指南：

1. **Fork** 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 **Pull Request**

### 开发规范
- 遵循 ESLint 代码规范
- 确保代码通过所有测试
- 为新功能添加适当的文档
- 保持提交信息清晰明确

## ⭐ 支持项目

如果这个项目对您有帮助，请给它一个 ⭐ Star！

---

> 💡 **提示**: 查看 [dev.md](./dev.md) 获取详细的开发环境搭建指南，或查看 [prod.md](./prod.md) 了解生产环境部署流程。
