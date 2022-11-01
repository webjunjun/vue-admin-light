// 一次性载入的组件
import AdminIndex from '@/views/admin/index.vue'
import UserIndex from '@/views/user/index.vue'

const asyncRoutes = [{
  path: '/admin',
  name: 'AdminIndex',
  component: AdminIndex,
  meta: { title: '仪表盘', icon: 'dashboard' },
  redirect: '/admin/admin',
  children: [{
    path: '/admin/admin',
    name: 'AdminPage',
    component: () => import('@/views/admin/admin.vue'),
    meta: { title: '后台', icon: '', requiresAuth: true }
  }, {
    path: '/admin/test',
    name: 'AdminTest',
    component: () => import('@/views/admin/test.vue'),
    meta: { title: '测试', icon: '', requiresAuth: true }
  }, {
    path: '/admin/list',
    name: 'AdminList',
    component: () => import('@/views/admin/list.vue'),
    meta: { title: '列表页', icon: '', requiresAuth: true }
  }]
}, {
  path: '/user',
  name: 'UserIndex',
  component: UserIndex,
  meta: { title: '用户管理', icon: 'dashboard' },
  redirect: '/user/user',
  children: [{
    path: '/user/user',
    name: 'UserPage',
    component: () => import('@/views/user/user.vue'),
    meta: { title: '用户', icon: '', requiresAuth: true }
  }, {
    path: '/user/form',
    name: 'UserForm',
    component: () => import('@/views/user/form.vue'),
    meta: { title: '表单', icon: '', requiresAuth: true }
  }]
}]

export default asyncRoutes
