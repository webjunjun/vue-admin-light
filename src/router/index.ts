import { createRouter, createWebHistory } from 'vue-router'
import { start, close } from '@/utils/nprogress'
import LayoutView from '@/layout/index.vue'
import HomeView from '@/views/homeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 参数可选 配置base路径
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/other/loginView.vue')
    },
    {
      path: '/about',
      name: 'AboutView',
      component: () => import('../views/aboutView.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/other/notFound.vue')
    },
    {
      path: '/',
      name: 'LayoutView',
      component: LayoutView,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'HomeView',
          component: HomeView
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 进度条开始
  start()
  next()
})

router.afterEach(() => {
  // 进度条结束
  close()
})

export default router
