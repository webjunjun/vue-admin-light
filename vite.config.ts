import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuesetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vuesetupExtend()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局导入scss 以下两种形式都可以 在其他组件再次引入会报错
        additionalData: '@import "./src/theme/default.module.scss";'
        // additionalData: '@use "./src/theme/default.module.scss" as *;'
      }
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    strictPort: false, // 端口号被占用就使用下一个
    proxy: {}
  },
  preview: {
    host: 'localhost',
    port: 4173,
    strictPort: false,
    proxy: {}
  },
  build: {}
})
