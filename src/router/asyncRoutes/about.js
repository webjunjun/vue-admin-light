// 一次性载入的组件
import AboutIndex from '@/views/about/index.vue'

const aboutRoutes = [{
  path: '/about',
  name: 'AboutIndex',
  component: AboutIndex,
  meta: { title: '关于', icon: 'wxiconwarning-circle' },
  redirect: '/about/project',
  children: [{
    path: '/about/project',
    name: 'AboutProject',
    component: () => import('@/views/about/project.vue'),
    meta: { title: '关于项目', icon: '', requiresAuth: true }
  }]
}]

export default aboutRoutes
