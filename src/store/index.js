import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

// 应用初始状态
const state = {
  token: null,
  userInfo: null,
  asideMenu: [],
  leftWidth: '200px',
  permissionBtns: []
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
