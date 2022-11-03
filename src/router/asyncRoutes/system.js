// 一次性载入的组件
import SystemIndex from '@/views/system/index.vue'

const systemRoutes = [{
  path: '/system',
  name: 'SystemIndex',
  component: SystemIndex,
  meta: { title: '系统管理', icon: 'wxiconsetting' },
  redirect: '/system/auth',
  children: [{
    path: '/system/auth',
    name: 'SystemAuth',
    component: () => import('@/views/system/auth.vue'),
    meta: { title: '权限管理', icon: '', requiresAuth: true }
  }, {
    path: '/system/role',
    name: 'SystemRole',
    component: () => import('@/views/system/role.vue'),
    meta: { title: '角色管理', icon: '', requiresAuth: true }
  }, {
    path: '/system/user',
    name: 'SystemUser',
    component: () => import('@/views/system/user.vue'),
    meta: { title: '用户管理', icon: '', requiresAuth: true }
  }, {
    path: '/system/route',
    name: 'SystemRoute',
    component: () => import('@/views/system/route.vue'),
    meta: { title: '路由管理', icon: '', requiresAuth: true }
  }]
}]

export default systemRoutes
