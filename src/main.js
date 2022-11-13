import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import useComponent from './utils/useComponent'
import App from './App'
import router from './router/index'
import store from './store/index'

import '@/directive/permission'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import '@/icons' // 引入icons

// 模拟数据
require('../mock')

Vue.use(ElementUI)
Vue.use(useComponent) // 注册自定义全局组件
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// this.$store访问store对象
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
