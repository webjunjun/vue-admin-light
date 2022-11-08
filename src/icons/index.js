import Vue from 'vue'
import IconSvg from '@/components/IconSvg' // svg组件

// 全局注册
Vue.component('svg-icon', IconSvg)

const req = require.context('./svg', false, /.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
