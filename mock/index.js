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
        title: '仪表盘',
        icon: 'wxicondashboard',
        btnList: [],
        children: [{
          path: '/dashboard/analysis',
          title: '分析页',
          icon: '',
          btnList: []
        }, {
          path: '/dashboard/workplace',
          title: '工作台',
          icon: '',
          btnList: []
        }]
      }, {
        path: '/system',
        title: '系统管理',
        icon: 'wxiconsetting',
        btnList: [],
        children: [{
          path: '/system/role',
          title: '角色管理',
          icon: '',
          btnList: []
        }]
      }]
    }
  }
})
