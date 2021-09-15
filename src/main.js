import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 模拟数据
require('../mock')

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// this.$store访问store对象
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
