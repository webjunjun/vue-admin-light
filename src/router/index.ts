import { createRouter, createWebHistory } from 'vue-router'
import { start, close } from '@/utils/nprogress'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('@/views/other/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 进度条开始
  start()
  next()
})

router.afterEach(() => {
  // 进度条结束
  close()
})

export default router
