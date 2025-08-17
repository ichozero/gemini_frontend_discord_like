import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' 
    ? './' 
    : process.env.NODE_ENV === 'production' && process.env.BUILD_TARGET === 'web'
    ? '/gemini_frontend/' 
    : './', // 为Electron应用使用相对路径
  server: {
    port: process.env.PORT || 3000, // 默认使用3000端口
    host: true, // 允许外部访问
    open: true, // 自动打开浏览器
    strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
    cors: true // 启用CORS
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'lucide-react']
        }
      }
    }
  }
})