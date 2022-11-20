// 一次性载入的组件
import Layout from '@/layout/layout'
import NotFound from '@/views/other/404'
import Login from '@/views/other/login'
import Register from '@/views/other/register'
import AccountMine from '@/views/account/mine'
import RefreshBlank from '@/views/other/blank'

/**
 * meta: {
 *  keepAlive: true 页面缓存
 *  canMultipleOpen: true 页面参数不同打开新的tab
 *  requiresAuth: true 页面需要登录
 *  title: 页面标题
 *  activeMenu: 页面和左侧哪一个菜单保持高亮
 * },
 * hidden: true 不显示在左侧菜单栏
 * alwaysShow: true 某父级菜单只有一个子级菜单时显示父级菜单
 */

const constantRoutes = [{
  path: '*',
  redirect: '/404'
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { title: '登录' }
}, {
  path: '/register',
  name: 'Register',
  component: Register,
  meta: { title: '注册' }
}, {
  path: '/404',
  name: 'NotFound',
  component: NotFound,
  meta: { title: '404' }
}, {
  path: '/',
  name: 'Layout',
  component: Layout,
  meta: { title: '后台', requiresAuth: true, keepAlive: true },
  children: [{
    path: '/mine',
    name: 'AccountMine',
    component: AccountMine,
    meta: { title: '个人中心', requiresAuth: true, keepAlive: true }
  }, {
    // 空白页面用于多标签页刷新
    path: '/blank',
    name: 'RefreshBlank',
    component: RefreshBlank
  }]
}]

export default constantRoutes
