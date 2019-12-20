import {
    getBreadCrumbList,
    setTagNavListInLocalstorage,
    getMenuByRouter,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    getNextRoute,
    routeHasExist,
    routeEqual,
    getRouteTitleHandled,
    localSave,
    localRead
} from '@/libs/util'
import { saveAdminErrorApi } from '@/api/user'
import router from '@/router'
import routers from '@/router/routers'
import menus from '@/router/menus'
import config from '@/config'

const { homeName } = config

const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
        return !routeEqual(item, route)
    })
    router.push(nextRoute)
}

const cloneMenu = function (newMenus, { path, name, meta, component, children }) {
    let obj = { path, name, meta, component }
    newMenus.push(obj)
    if (children && children.forEach) {
        obj.children = []
        children.forEach(function (child) {
            cloneMenu(obj.children, child)
        })
    }
}

const cloneMenus = function (menus) {
    let newMenus = []
    menus.forEach(function (menu) {
        cloneMenu(newMenus, menu)
    })
    return newMenus
}

const filterMenu = function (menu, targets) {
    if (menu.children) {
        for (let i = 0; i < menu.children.length; i++) {
            let remain = filterMenu(menu.children[i], targets)
            if (remain === false) {
                menu.children.splice(i, 1)
                i--
            }
        }
        if (menu.children.length === 0) {
            return false
        }
    } else if (!targets || targets.indexOf(menu.name) === -1) {
        return false
    }
}
const filterMenus = function (menus, targets) {
    for (let i = 0; i < menus.length; i++) {
        let remain = filterMenu(menus[i], targets)
        if (remain === false) {
            menus.splice(i, 1)
            i--
        }
    }
    return menus
}

export default {
    state: {
        breadCrumbList: [],
        tagNavList: [],
        homeRoute: {},
        local: localRead('local'),
        errorList: [],
        hasReadErrorPage: false,
        permission: routers,
        screenType: 'big',
        ip: '',
        port: '',
        baseUrl: '',
        configMessage: ''
    },
    getters: {
        // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
        menuList: (state, getters, rootState) => getMenuByRouter(state.permission, rootState.user.access),
        errorCount: state => state.errorList.length,
        screenType: state => state.screenType,
    },
    mutations: {
        setBaseUrl (state, baseUrlObj) {
            state.ip = baseUrlObj.ip
            state.port = baseUrlObj.port
            if (baseUrlObj.ip !== '' && baseUrlObj.port !== '') {
                state.baseUrl = baseUrlObj.ip + ':' + baseUrlObj.port
            } else {
                state.baseUrl = ''
            }
        },
        setConfigMessage (state, message) {
            state.configMessage = message
        },
        setScreenType (state, screenWidth) {
            if (screenWidth > 750) {
                state.screenType = 'big'
            } else {
                state.screenType = 'small'
            }
        },
        setPermission (state, { userName, permission }) {
            if (userName === 'super_admin') {
                state.permission = routers.concat(menus)
            } else {
                let newMenus = cloneMenus(menus)
                let filteredMenus = filterMenus(newMenus, permission)
                state.permission = routers.concat(filteredMenus)
            }
        },
        setBreadCrumb (state, route) {
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
        },
        setHomeRoute (state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        },
        setTagNavList (state, list) {
            let tagList = []
            if (list) {
                tagList = [...list]
            } else {
                tagList = getTagNavListFromLocalstorage() || []
            }
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0]
                tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
        },
        closeTag (state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
        },
        addTag (state, { route, type = 'unshift' }) {
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                if (type === 'push') {
                    state.tagNavList.push(router)
                } else {
                    if (router.name === homeName) {
                        state.tagNavList.unshift(router)
                    } else {
                        state.tagNavList.splice(1, 0, router)
                    }
                }
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },

        // addTag(state, {route, type = 'unshift'}) {
        //     let router = getRouteTitleHandled(route)
        //     if (!routeHasExist(state.tagNavList, router)) {
        //         if (type === 'push') {
        //             state.tagNavList = state.tagNavList.filter(d => d.name !== router.name)
        //             state.tagNavList.push(router)
        //         } else {
        //             if (router.name === homeName) state.tagNavList.unshift(router)
        //             else state.tagNavList.splice(1, 0, router)
        //         }
        //         setTagNavListInLocalstorage([...state.tagNavList])
        //     }
        // },
        setLocal (state, lang) {
            localSave('local', lang)
            state.local = lang
        },
        addError (state, error) {
            state.errorList.push(error)
        },
        setHasReadErrorLoggerStatus (state, status = true) {
            state.hasReadErrorPage = status
        }
    },
    actions: {
        addErrorLog ({ commit, rootState }, info) {
            if (!window.location.href.includes('error_logger_page')) {
                commit('setHasReadErrorLoggerStatus', false)
            }
            saveAdminErrorApi(info).then(() => {
                commit('addError', info)
            })
        }
    }
}
