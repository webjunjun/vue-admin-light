const token = state => {
    return state.token
}

const userInfo = state => {
    return state.userInfo
}

const permission_routes = state => {
    return state.routes
}

const leftWidth = state => {
    return state.leftWidth
}

module.exports = {
    token,
    userInfo,
    permission_routes,
    leftWidth
}