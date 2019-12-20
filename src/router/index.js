import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import menus from './menus'
import store from '@/store'
import iView from 'iview'
import {setToken, getToken, canTurnTo, setTitle} from '@/libs/util'
import config from '@/config'

const {homeName} = config
let allMenus = routes.concat(menus)
Vue.use(Router)


//如果点击相同路由页面出现报错请把此段代码关闭注释
// Router.prototype.replace = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }
// const originalReplace = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalReplace.call(this, location).catch(err => err)
// }

const router = new Router({
    routes: allMenus,
    // mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
    if (canTurnTo(to.name, access, store.state.app.permission)) next() // 有权限，可访问
    else next({replace: true, name: 'error_401'}) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
        })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        next({
            name: homeName // 跳转到homeName页
        })
    } else {
        if (store.state.user.hasGetInfo) {
            turnTo(to, store.state.user.access, next)
        } else {
            store.dispatch('getUserInfo').then(user => {
                // 拉取用户信息
                turnTo(to, user.access, next)
            }).catch(() => {
                setToken('')
                next({
                    name: 'login'
                })
            })
        }
    }
})

router.afterEach(to => {
    setTitle(to, router.app)
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
