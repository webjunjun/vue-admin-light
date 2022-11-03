import Mock from 'mockjs'

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
]

Mock.mock('/api/user/login', function (options) {
  return {
    code: 0,
    msg: '登录成功',
    data: {
      token: LoginUsers[0].username,
      routes: [{
        path: '/dashboard',
        name: 'DashboardIndex',
        icon: '',
        btnList: [],
        children: [{
          path: '/dashboard/analysis',
          name: 'DashboardAnalysis',
          icon: '',
          btnList: []
        }, {
          path: '/dashboard/workplace',
          name: 'DashboardWorkplace',
          icon: '',
          btnList: []
        }]
      }, {
        path: '/system',
        name: 'SystemIndex',
        icon: '',
        btnList: [],
        children: [{
          path: '/system/role',
          name: 'SystemRole',
          icon: '',
          btnList: []
        }]
      }]
    }
  }
})
