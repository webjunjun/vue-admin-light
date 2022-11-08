// 注册自定义的全局组件
import PageTitle from '@/components/PageTitle'

export default {
  install(Vue) {
    Vue.component('PageTitle', PageTitle)
  }
}
