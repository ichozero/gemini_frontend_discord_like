# Gemini Chat - Discord Like Application

一个类似Discord的聊天应用，用于与Gemini AI进行对话。

## 功能特性

- 🎨 Discord风格的现代化UI设计
- 💬 实时聊天界面
- ⚙️ 可配置的API设置（协议、IP、端口）
- 🔌 连接状态显示
- 📱 响应式设计，支持移动端
- 🖥️ 跨平台支持（Web、桌面、移动端）

## 技术栈

### 前端
- **React 18** - 用户界面库
- **Vite** - 构建工具
- **Axios** - HTTP客户端
- **Lucide React** - 图标库

### 桌面端
- **Electron** - 跨平台桌面应用框架

### 移动端（计划中）
- **React Native** - 跨平台移动应用框架

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

#### Web开发
```bash
npm run dev
```
访问 http://localhost:5173

#### 桌面应用开发
```bash
npm run electron-dev
```

### 构建

#### Web构建
```bash
npm run build
```

#### 桌面应用构建
```bash
npm run electron-build
```

## API配置

应用支持配置以下参数：

- **协议**: HTTP / HTTPS
- **IP地址**: 默认 192.168.31.84
- **端口**: 默认 8629

API端点: `{protocol}://{ip}:{port}/gemini`

### API格式

**请求:**
```json
{
  "message": "用户输入的消息"
}
```

**响应:**
```json
{
  "answer": "AI回复的内容"
}
```

## 项目结构

```
gemini_request_discord_like/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.jsx         # React入口
│   └── index.css        # 全局样式
├── electron/
│   └── main.js          # Electron主进程
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── index.html           # HTML模板
```

## 跨平台发布计划

### ✅ 已完成
- [x] Web版本
- [x] 桌面版本配置 (Electron)

### 🚧 计划中
- [ ] Windows桌面应用
- [ ] macOS桌面应用  
- [ ] Linux桌面应用
- [ ] Android应用 (React Native)
- [ ] iOS应用 (React Native)

## 开发说明

### 添加新功能
1. 在 `src/App.jsx` 中添加React组件
2. 在 `src/App.css` 中添加样式
3. 测试Web版本功能
4. 测试桌面版本兼容性

### 样式指南
- 使用Discord的配色方案
- 保持响应式设计
- 遵循现有的组件结构

## 许可证

MIT License