module.exports = {
  title: 'vue-admin-light管理系统', // 系统名称
  baseUrl: '/', // 生产环境api基础路径
  devBaseUrl: '/api', // 非生产环境api基础路径
  TokenKey: 'Admin-Token', // token在cookie里的key名
  routerKey: 'Admin-Router', // localstorage 存储路由对象的key名
  pagePermission: true, // 是否开启页面权限 false: 关闭 true: 打开
  btnPermissionBoolean: true // 是否开启按钮权限 必须开启页面权限生效 false: 关闭 true: 打开
}
