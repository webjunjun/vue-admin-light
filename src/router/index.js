import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import defaultSetting from '@/utils/setting.js'
import { getToken } from '@/utils/auth.js'

// 一次性载入的组件
import Layout from '@/layout/layout.vue'
import NotFound from '@/views/other/404.vue'
import Login from '@/views/other/login.vue'
import Register from '@/views/other/register.vue'
import Home from '@/views/home/index.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
	path: '*',
    redirect: '/404'
}, {
	path: '/login',
    name: 'Login',
	component: Login,
	meta: {title: '登录', islogin: false}
}, {
	path: '/register',
    name: 'Register',
	component: Register,
	meta: {title: '注册', islogin: false}
}, {
	path: '/404',
    name: 'NotFound',
	component: NotFound,
	meta: {title: '404', islogin: false}
}, {
	path: '/home',
    name: 'Home',
	component: Home,
	meta: {title: '首页', islogin: false}
}, {
	path: '/',
    name: 'Layout',
	component: Layout,
	redirect: '/admin/index',
	children: [{
		path: '/admin/index',
		name: 'AdminIndex',
		component: () => import('@/views/admin/admin.vue'),
		meta: {title: '后台', islogin: false}
	}]
}]

const router = new Router({
  routes
})

// 刷新页面时，sessionStorage、cookie中获取token
// if (sessionStorage.getItem(defaultSetting.TokenKey)) {
// 	store.commit('SET_TOKEN', sessionStorage.getItem(defaultSetting.TokenKey))
// }
if (getToken()) {
	store.commit('SET_TOKEN', getToken())
}

router.beforeEach((to, from, next) => {
	const fobidLoginUser = ['Login', 'Register']
	// 从vuex中获取token
	let curToken = store.getters.token
	document.title = `${defaultSetting.title}`
	if (to.meta.title) {
		document.title = `${to.meta.title} - ${defaultSetting.title}`
	}
	if (to.matched.some(record => record.meta.islogin)) {
		// 需要登录，判断是否有token
		if (curToken) {
			// token存在
			next()
		} else {
			// token不存在
			next({path: '/login',query: {redirect: to.fullPath}})
		}
	} else {
		if (fobidLoginUser.indexOf(to.name) !== -1) {
			// 登录、注册等已登录用户禁止进入，看是否有token
			if (curToken) {
				next({path: '/',query: {redirect: to.fullPath}})
			} else {
				next()
			}
		} else {
			next()
		}
    }
    // next()
})

export default router
