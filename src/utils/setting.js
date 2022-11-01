module.exports = {
  title: 'vue-admin-light管理系统', // 系统名称
  baseUrl: '/', // 生产环境api基础路径
  devBaseUrl: '/api', // 非生产环境api基础路径
  TokenKey: 'Admin-Token', // token在cookie里的key名
  routerKey: 'Admin-Router', // localstorage 存储路由对象的key名
  pagePermission: false, // 是否开启页面权限
  btnPermissionBoolean: false // 是否开启按钮权限 暂未实现
}
