// 一次性载入的组件
import DashboardIndex from '@/views/dashboard'

const dashboardRoutes = [{
  path: '/dashboard',
  name: 'DashboardIndex',
  component: DashboardIndex,
  meta: {
    title: '仪表盘', icon: 'wxicondashboard', requiresAuth: true, keepAlive: true
  },
  redirect: '/dashboard/analysis',
  children: [{
    path: '/dashboard/analysis',
    name: 'DashboardAnalysis',
    component: () => import('@/views/dashboard/analysis'),
    meta: {
      title: '分析页', icon: '', requiresAuth: true, keepAlive: true
    }
  }, {
    path: '/dashboard/workplace',
    name: 'DashboardWorkplace',
    component: () => import('@/views/dashboard/workplace'),
    meta: {
      title: '工作台', icon: '', requiresAuth: true, keepAlive: true
    }
  }]
}]

export default dashboardRoutes
