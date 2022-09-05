// 定义所需的 mutations
module.exports = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ASIDE_MENU: (state, asideMenu) => {
    state.asideMenu = asideMenu
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_LEFTWIDTH: (state, leftWidth) => {
    state.leftWidth = leftWidth
  }
}
