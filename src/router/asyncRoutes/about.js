// 一次性载入的组件
import AboutIndex from '@/views/about/index.vue'

const aboutRoutes = [{
  path: '/about',
  name: 'AboutIndex',
  component: AboutIndex,
  meta: { title: '关于', icon: 'wxiconwarning-circle' },
  redirect: '/about/project'
}]

export default aboutRoutes
