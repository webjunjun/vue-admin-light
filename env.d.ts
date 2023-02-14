/// <reference types="vite/client" />

// 找不到vue模块的解决方法
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
