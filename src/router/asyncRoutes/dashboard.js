// 一次性载入的组件
import DashboardIndex from '@/views/dashboard/index.vue'

const dashboardRoutes = [{
  path: '/dashboard',
  name: 'DashboardIndex',
  component: DashboardIndex,
  meta: { title: '仪表盘', icon: 'wxicondashboard' },
  redirect: '/dashboard/analysis',
  children: [{
    path: '/dashboard/analysis',
    name: 'DashboardAnalysis',
    component: () => import('@/views/dashboard/analysis.vue'),
    meta: { title: '分析页', icon: '', requiresAuth: true }
  }, {
    path: '/dashboard/workplace',
    name: 'DashboardWorkplace',
    component: () => import('@/views/dashboard/workplace.vue'),
    meta: { title: '工作台', icon: '', requiresAuth: true }
  }]
}]

export default dashboardRoutes
