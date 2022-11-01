import asyncRoutes from './asyncRoutes'
import store from '../store/index'

const pathArr = []

function filterAsyncMenus(menus, curMenu) {
  const tempMenus = menus
  const asideMenu = curMenu
  for (let i = 0; i < tempMenus.length; i++) {
    asideMenu.push({
      path: tempMenus[i].path,
      title: tempMenus[i].meta.title,
      icon: tempMenus[i].meta.icon
    })
    if (tempMenus[i].children) {
      asideMenu[i].children = []
      filterAsyncMenus(tempMenus[i].children, asideMenu[i].children)
    }
  }
  return asideMenu
}

function filterAsyncRoutes(route) {
  const routeArr = []
  const tempRoute = route
  tempRoute.forEach((item) => {
    const equalIdx = pathArr.findIndex((ele) => ele === item.path)
    if (equalIdx !== -1) {
      if (item.children) {
        // 如果没匹配到，item的子集会置为空数组
        item.children = filterAsyncRoutes(item.children)
      }
      routeArr.push(item)
    }
  })
  return routeArr
}

export function generateRoutes(authArr) {
  const routerList = authArr
  // 生成左侧菜单树
  let accessedMenus = []
  if (routerList.length > 0) {
    // 第一次开始取pid，后面取id
    accessedMenus = filterAsyncMenus(routerList, routerList[0].pid, 0)
  }
  store.commit('SET_ASIDE_MENU', accessedMenus)

  // 生成路由
  const accessedRoutes = filterAsyncRoutes(asyncRoutes)
  // 返回路由
  return accessedRoutes
}

// 不开启路由权限的路由与菜单的处理
export function concatTotalRoutes() {
  // 生成菜单
  const accessedMenus = filterAsyncMenus(asyncRoutes, [])
  store.commit('SET_ASIDE_MENU', accessedMenus)
  // 直接把路由文件返回
  return asyncRoutes
}
