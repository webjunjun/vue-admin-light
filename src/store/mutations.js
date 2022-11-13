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
  SET_LEFTWIDTH: (state, leftWidth) => {
    state.leftWidth = leftWidth
  },
  SET_PERMISSION: (state, permissionBtns) => {
    state.permissionBtns = permissionBtns
  },
  SET_BTNAUTH: (state, btnAuthOn) => {
    state.btnAuthOn = btnAuthOn
  }
}
