import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import defaultSetting from '@/utils/setting'
import { getToken } from '@/utils/auth'

import constantRoutes from './constantRoutes'
import { generateRoutes, concatTotalRoutes } from './addRouter'
import store from '../store/index'

Vue.use(Router)

// 全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载icon
  trickleSpeed: 100, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 重复点击路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new Router({
  mode: 'history', // 默认history模式
  routes: constantRoutes,
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
      router.addRoute('Layout', permissionRouter[i])
    }
  }
}
if (defaultSetting.pagePermission) {
  getUserRoutes()
} else {
  // 不开启页面权限
  const allRouter = concatTotalRoutes()
  for (let i = 0; i < allRouter.length; i++) {
    router.addRoute('Layout', allRouter[i])
  }
}

if (defaultSetting.btnPermissionBoolean) {
  // 开启按钮权限
  store.commit('SET_BTNAUTH', true)
}

// 禁止登录后访问的页面名单
const fobidLoginUser = ['Login', 'Register']

// 是否首次或刷新页面后进入鉴权页面
let firstOrRefresh = true

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!defaultSetting.multipleTabs) {
    // 多标签页不取消路由变化的上一个路由的ajax请求
    if (window.pendingMap && window.pendingMap.size !== 0) {
      // 进入路由前取消上一个路由的所有请求
      const allPendingMap = window.pendingMap
      for (const value of allPendingMap) {
        value.abort()
      }
      // 清除所有键值对
      allPendingMap.clear()
    }
  }
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
        // 重定向到分析页
        next({ name: 'DashboardAnalysis' })
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

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})

export default router
