// 一次性载入的组件
import SystemIndex from '@/views/system'

const systemRoutes = [{
  path: '/system',
  name: 'SystemIndex',
  component: SystemIndex,
  meta: {
    title: '系统管理', icon: 'wxiconsetting', requiresAuth: true, keepAlive: true
  },
  redirect: '/system/auth',
  children: [{
    path: '/system/auth',
    name: 'SystemAuth',
    component: () => import('@/views/system/auth'),
    meta: {
      title: '权限管理', icon: '', requiresAuth: true, keepAlive: true
    }
  }, {
    path: '/system/role',
    name: 'SystemRole',
    component: () => import('@/views/system/role'),
    meta: {
      title: '角色管理', icon: '', requiresAuth: true, keepAlive: true
    }
  }, {
    path: '/system/user',
    name: 'SystemUser',
    component: () => import('@/views/system/user'),
    meta: {
      title: '用户管理', icon: '', requiresAuth: true, keepAlive: true
    }
  }, {
    path: '/system/route',
    name: 'SystemRoute',
    component: () => import('@/views/system/route'),
    meta: {
      title: '路由管理', icon: '', requiresAuth: true, keepAlive: true
    }
  }]
}]

export default systemRoutes
