import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from '../router'
import store from '../store/index'
import defaultSetting from './setting'

// 新建一个axios实例，配置请求默认设置
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? defaultSetting.devBaseUrl : defaultSetting.baseUrl,
  // withCredentials: true, // 跨域请求是否携带cookie
  timeout: 60000 // 请求超时设置
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    console.log(error) // debug用
    return Promise.reject(error) // 抛出错误
  }
)

// response响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 状态码200
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  (error) => {
    console.log(`err${error}`) // debug
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          Message({
            message: '登录过期，请重新登录',
            type: 'warning',
            duration: 3000
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('isLogin', null)
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 3000)
          break
        case 404:
          Message({
            message: '网络请求不存在',
            type: 'error',
            duration: 3000
          })
          break
        default:
          Message({
            message: error.response.data.error,
            type: 'error',
            duration: 3000
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
