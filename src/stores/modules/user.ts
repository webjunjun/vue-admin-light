import { defineStore } from 'pinia'
import store from '@/stores'
import { reactive, toRefs } from 'vue'

interface LoginUserState {
  userInfo: null | {}
  token: string
}

export const useUserStore = defineStore('user', () => {
  const loginUser = reactive<LoginUserState>({
    userInfo: null,
    token: ''
  })

  const setLoginUser = (data: null | {}) => {
    loginUser.userInfo = data
  }

  const setToken = (val: string) => {
    loginUser.token = val
  }

  return {
    ...toRefs(loginUser),
    setLoginUser,
    setToken
  }
})

// 在setup外使用
export const useUserStoreHook = () => {
  return useUserStore(store)
}
