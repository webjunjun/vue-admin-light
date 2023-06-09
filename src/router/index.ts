import { createRouter, createWebHistory } from 'vue-router';
import { start, close } from '@/utils/nprogress';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 参数可选 配置base路径
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/other/login.vue'),
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/other/notFound.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  // 进度条开始
  start();
  next();
});

router.afterEach(() => {
  // 进度条结束
  close();
});

export default router;
