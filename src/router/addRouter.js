import asyncRoutes from './asyncRoutes'
import store from '../store/index'

const pathArr = []
const btnArr = []

function filterAsyncMenus(menus, curMenu) {
  const tempMenus = menus
  const asideMenu = curMenu
  for (let i = 0; i < tempMenus.length; i++) {
    asideMenu.push({
      path: tempMenus[i].path,
      title: tempMenus[i].title,
      icon: tempMenus[i].icon
    })
    // 提取按钮
    if (tempMenus[i].btnList && tempMenus[i].btnList.length > 0) {
      btnArr.push(...tempMenus[i].btnList)
    }
    // 收集菜单元素为一维数组
    pathArr.push(tempMenus[i].path)
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

// 开启路由权限的路由与菜单的处理
export function generateRoutes(authArr) {
  const routerList = authArr
  // 生成左侧菜单树
  const accessedMenus = filterAsyncMenus(routerList, [])
  store.commit('SET_ASIDE_MENU', accessedMenus)
  // 生成权限按钮
  store.commit('SET_PERMISSION', btnArr)

  // 生成路由
  const accessedRoutes = filterAsyncRoutes(asyncRoutes)
  // 返回路由
  return accessedRoutes
}

// 不开启路由权限的菜单原始数据处理
function filterNoAuthMenus(menus, curMenu) {
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
      filterNoAuthMenus(tempMenus[i].children, asideMenu[i].children)
    }
  }
  return asideMenu
}

// 不开启路由权限的路由与菜单的处理
export function concatTotalRoutes() {
  // 生成菜单
  const accessedMenus = filterNoAuthMenus(asyncRoutes, [])
  store.commit('SET_ASIDE_MENU', accessedMenus)
  // 直接把路由文件返回
  return asyncRoutes
}
