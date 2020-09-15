import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    token: null,
    userInfo: null,
    permission_routes: [],
    leftWidth: '200px'
}

// 定义所需的 mutations
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    },
    SET_ROUTES: (state, permission_routes) => {
        state.permission_routes = permission_routes
    },
    SET_LEFTWIDTH: (state, leftWidth) => {
        state.leftWidth = leftWidth
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})