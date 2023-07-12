import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from '@/i18n'; // 国际化
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 全局注册所有图标

import App from './App.vue';
import router from './router';

import './assets/styles/main.css';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
