import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import defaultSetting from '@/utils/setting'
import { generateRoutes } from '../router/addRouter'
import router from '../router/index'

// 登录
const userLogin = ({ commit }, userInfo) => new Promise((resolve, reject) => {
  login(userInfo)
    .then((res) => {
      if (res.code === 0) {
        // 登录成功
        setToken(res.data.token)
        commit('SET_TOKEN', res.data.token)
        // 个人用户信息保存
        const userData = {
          userName: res.data.userName
        }
        localStorage.setItem('userInfo', JSON.stringify(userData))
        commit('SET_USERINFO', userData)
        if (defaultSetting.pagePermission) {
          // 设置router缓存
          if (res.data.routes) {
            localStorage.setItem(defaultSetting.routerKey, JSON.stringify(res.data.routes))
            // 生成路由
            const permissionRouter = generateRoutes(res.data.routes)
            // 添加路由
            for (let i = 0; i < permissionRouter.length; i++) {
              router.addRoute('Layout', permissionRouter[i])
            }
          }
        }
      }
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
})

// 前面使用了import，这里就不要使用module.exports了。es6和commonJS不能混用
export {
  userLogin
}
