import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuesetupExtend from 'vite-plugin-vue-setup-extend'
// 通过自动导入插件实现按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vuesetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
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
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    }
  },
  preview: {
    host: 'localhost',
    port: 4173,
    strictPort: false,
    proxy: {}
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js', // 自定义分割的chunks的名称
        entryFileNames: 'static/js/[name]-[hash].js', // chunks的入口文件
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 静态资源名称 不包含点的文件扩展名
        // 自定义的公共chunk
        manualChunks: {
          vue: ['vue', 'pinia', 'vue-router'],
          elementIcons: ['@element-plus/icons-vue']
        }
      }
    }
  }
})
