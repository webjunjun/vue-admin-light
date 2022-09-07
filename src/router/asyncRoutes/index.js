// 一次性载入的组件
import Layout from '@/layout/layout.vue'

const asyncRoutes = [{
  path: '/admin',
  name: 'Admin',
  component: Layout,
  redirect: '/admin/index',
  children: [{
    path: '/admin/index',
    name: 'AdminIndex',
    component: () => import('@/views/admin/admin.vue'),
    meta: { title: '后台', requiresAuth: true }
  }, {
    path: '/admin/test',
    name: 'AdminTest',
    component: () => import('@/views/admin/test.vue'),
    meta: { title: '测试', requiresAuth: true }
  }]
}]

export default asyncRoutes
