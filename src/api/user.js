import request from '@/utils/request'

// 注册
export function register(data) {
  return request({
    url: '/dsUser',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
