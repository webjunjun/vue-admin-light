// 生成动态路由
// 后端返回一个不含有children层级的数组，前端自行组成菜单列表
// 菜单结构
// {
//     id: '',// 菜单id，字符串
//     pid: null,// 菜单父id，是某个父菜单的子菜单，默认null，字符串
//     path: '',// 菜单路径
//     name: '',// 菜单name
//     icon: '',// 菜单icon
// }
// { id: '0101', pid: null, path: '', name: '', icon: '' },
// { id: '0102', pid: '01', path: '', name: '', icon: '' },
// { id: '0103', pid: '01', path: '', name: '', icon: '' },
// { id: '010301', pid: '0103', path: '', name: '', icon: '' },
// { id: '010302', pid: '0103', path: '', name: '', icon: '' },
// { id: '0201', pid: null, path: '', name: '', icon: '' },
// { id: '0202', pid: '02', path: '', name: '', icon: '' },
import { routes, asyncRoutes } from './index'
import store from '../store/index'

let pathArr = []

function filterAsyncMenus(menus, pid, idx) {
    let tempMenu = menus
    let menuList = []
    for (let arrIdx = idx; arrIdx < tempMenu.length; arrIdx++) {
        if (tempMenu[arrIdx].pid === pid) {
            // 生成一个一维的路径数组，权限路由需要
            pathArr.push(tempMenu[arrIdx].path)
            // 生成菜单
            menuList.push(tempMenu[arrIdx])
            tempMenu[arrIdx].children = filterAsyncMenus(tempMenu, tempMenu[arrIdx].id, arrIdx)
        }
    }
    return menuList
}

function filterAsyncRoutes(route) {
    let routeArr = []
    let tempRoute = route
    tempRoute.forEach((item) => {
        const equalIdx = pathArr.findIndex((ele) => {
            return ele === item.path
        })
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
    let routerList = authArr
    // 生成左侧菜单树
    let accessedMenus = []
    if (routerList.length > 0) {
        // 第一次开始取pid，后面取id
        accessedMenus = filterAsyncMenus(routerList, routerList[0].pid, 0)
    }
    store.commit('SET_ASIDE_MENU', accessedMenus)

    // 生成路由
    const accessedRoutes = filterAsyncRoutes(asyncRoutes)
    // const allRoutes = accessedRoutes.concat(routes)
    // 返回路由
    return accessedRoutes
}