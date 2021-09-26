import { login } from '@/api/user.js'
import { setToken } from '@/utils/auth.js'
import { generateRoutes } from '../router/addRouter'
import defaultSetting from '@/utils/setting.js'
import router from '../router/index'

// 登录
const userLogin = ({commit}, userInfo) => {
    return new Promise((resolve, reject) => {
        login(userInfo)
        .then((res) => {
            if (res.code === 0) {
                // 登录成功
                setToken(res.data.token)
                commit('SET_TOKEN', res.data.token)
                // 设置router缓存
                if (res.data.routes) {
                    localStorage.setItem(defaultSetting.routerKey, JSON.stringify(res.data.routes))
                    // commit('SET_ROUTES', res.data.routes)
                    // 添加路由
                    const permissionRouter = generateRoutes(res.data.routes)
                    for (let i = 0; i < permissionRouter.length; i++) {
                        router.addRoute(permissionRouter[i].name, permissionRouter[i])
                    }
                }
            }
            resolve(res)
        })
        .catch((err) => {
            reject(err);
        })
    })
}

// 前面使用了import，这里就不要使用module.exports了。es6和commonJS不能混用
export {
    userLogin
}