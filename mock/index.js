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
        id: '0',
        pid: null,
        path: '/admin',
        name: 'Admin',
        title: '管理员',
        icon: ''
      }, {
        id: '01',
        pid: '0',
        path: '/admin/index',
        name: 'AdminIndex',
        title: '后台',
        icon: ''
      }, {
        id: '02',
        pid: '0',
        path: '/admin/test',
        name: 'AdminTest',
        title: '测试',
        icon: ''
      }]
    }
  }
})
