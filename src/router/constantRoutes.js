// 一次性载入的组件
import Layout from '@/layout/layout.vue'
import NotFound from '@/views/other/404.vue'
import Login from '@/views/other/login.vue'
import Register from '@/views/other/register.vue'

const constantRoutes = [{
  path: '*',
  redirect: '/404'
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { title: '登录', requiresAuth: false }
}, {
  path: '/register',
  name: 'Register',
  component: Register,
  meta: { title: '注册', requiresAuth: false }
}, {
  path: '/404',
  name: 'NotFound',
  component: NotFound,
  meta: { title: '404', requiresAuth: false }
}, {
  path: '/',
  name: 'Layout',
  component: Layout,
  meta: { title: '后台', requiresAuth: true },
  redirect: '/dashboard/analysis'
}]

export default constantRoutes
