const token = state => {
    return state.token
}

const userInfo = state => {
    return state.userInfo
}

const aside_menu = state => {
    return state.aside_menu
}

const routes = state => {
    return state.routes
}

const leftWidth = state => {
    return state.leftWidth
}

module.exports = {
    token,
    userInfo,
    aside_menu,
    routes,
    leftWidth
}