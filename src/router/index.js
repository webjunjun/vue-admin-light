import Vue from 'vue'
import Router from 'vue-router'
import defaultSetting from '@/utils/setting'
import { getToken } from '@/utils/auth'

// 一次性载入的组件
import Layout from '@/layout/layout.vue'
import NotFound from '@/views/other/404.vue'
import Login from '@/views/other/login.vue'
import Register from '@/views/other/register.vue'
import { generateRoutes } from './addRouter'
import store from '../store/index'

Vue.use(Router)

// 重复点击路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export const routes = [{
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
  meta: { title: '后台', requiresAuth: true }
}]

const router = new Router({
  // mode: 'history',// 默认hash模式
  routes,
  scrollBehavior: () => ({ y: 0 })
})

// 刷新页面时，cookie中获取token
if (getToken()) {
  store.commit('SET_TOKEN', getToken())
}

// 刷新页面时，localstorage中获取路由
function getUserRoutes() {
  const strRouter = localStorage.getItem(defaultSetting.routerKey)
  if (strRouter) {
    const pasreRouter = JSON.parse(strRouter)
    const permissionRouter = generateRoutes(pasreRouter)
    // 可以不用把路由写入vuex
    for (let i = 0; i < permissionRouter.length; i++) {
      router.addRoute(permissionRouter[i].name, permissionRouter[i])
    }
  }
}
getUserRoutes()

// 禁止登录后访问的页面名单
const fobidLoginUser = ['Login', 'Register']

// 是否首次或刷新页面后进入鉴权页面
let firstOrRefresh = true

router.beforeEach((to, from, next) => {
  // 从vuex中获取token
  const hasToken = store.getters.token
  // 配置页面标题
  document.title = `${defaultSetting.title}`
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${defaultSetting.title}`
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 需要登录页面
    if (hasToken) {
      if (firstOrRefresh) {
        firstOrRefresh = false
        // 路由守卫会一直执行，直到添加路由完成。
        next({ ...to, replace: true })
      } else if (to.path === '/') {
        next({ path: '/admin/index' })
      } else {
        next()
      }
    } else if (to.path === '/') {
      next({ path: '/login' })
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {
    // 不需要登录的页面
    if (hasToken) {
      // 已登录用户禁止进入注册、登录等页面
      if (fobidLoginUser.indexOf(to.name) !== -1) {
        next({ path: '/', query: { redirect: to.fullPath } })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
