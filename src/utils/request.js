import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from '../router'
import store from '../store/index'
import defaultSetting from './setting'

window.pendingMap = new Map()
let controller = null // 存储当前接口取消请求

/**
 * 生成每个请求唯一的键
 * https://abhishekdutta.org/blog/standalone_uuid_generator_in_javascript.html
 * @time 2022-11-17 11:07:29
 */
const generateUuidKey = (config) => {
  // const tempUrl = URL.createObjectURL(new Blob()) // 返回的URL会带上一段36位长的字符串，这个字符串与UUID的格式是一致的
  // const uuid = tempUrl.toString()
  // URL.revokeObjectURL(tempUrl) // 释放这个url
  // return uuid.substring(uuid.lastIndexOf("/") + 1)
  // 还是用url + 请求方式做key
  const { url, method } = config
  return [url, method].join('&')
}

/**
 * 储存每个请求唯一值 用于取消请求或取消上一个路由的所有请求
 * @time 2022-11-17 11:27:18
 */
const addPending = (config) => {
  const pendingKey = generateUuidKey(config)
  if (window.pendingMap.has(pendingKey)) {
    // 如果有key 说明先前请求过 现在是重复请求
    controller = new AbortController()
    config.signal = controller.signal
    // 取消请求 取消请求不一定非得在请求发出后拒绝，可以在请求前就关闭
    controller.abort()
  } else {
    window.pendingMap.set(pendingKey, new AbortController())
    config.requestKey = pendingKey // 自定义参数 每个请求加上唯一key 便于删除
    config.signal = window.pendingMap.get(pendingKey).signal
  }
}

/**
 * 删除请求 移除key
 * @time 2022-11-17 11:45:25
 */
const removePending = (config) => {
  const pendingKey = config.requestKey
  if (pendingKey && window.pendingMap.has(pendingKey)) {
    const signal = window.pendingMap.get(pendingKey)
    signal.abort()
    window.pendingMap.delete(pendingKey)
  }
}

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
    addPending(config)
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
    removePending(response.config) // 响应结束移除key
    const res = response.data
    // 状态码200
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  (error) => {
    console.log(`err${error}`) // debug
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error)
    }
    if (error.config) {
      removePending(error.config) // 响应结束移除key
    }
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
