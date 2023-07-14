/// <reference types="vite/client" />

// 找不到vue模块的解决方法
// 声明.vue文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//声明window上自定义属性，如事件总线
declare interface Window {
  // eventBus: any;
  pendingMap: Map<string, AbortController>;
}
