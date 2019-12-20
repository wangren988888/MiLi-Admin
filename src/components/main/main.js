import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import {
    mapMutations,
    mapActions,
    mapGetters
} from 'vuex'
import {
    getNewTagList,
    routeEqual
} from '@/libs/util'
// import config from '@/config'
import routers from '@/router/routers'
import minLogo from '@/assets/images/minlogo.png'
import maxLogo from '@/assets/images/maxlogo.png'
import './main.less'
// const imgBaseUrl = process.env.NODE_ENV === 'development' ? config.imgBaseUrl.dev : config.imgBaseUrl.pro;

export default {
    name: 'Main',
    components: {
        SideMenu,
        HeaderBar,
        Language,
        TagsNav,
        Fullscreen,
        ErrorStore,
        User,
        ABackTop
    },
    data() {
        return {
            collapsed: false,
            siderShow: false,
            minLogo,
            maxLogo,
            isFullscreen: false,
            screenWidth: document.body.clientWidth,
            immersedStatusbarStyle: {
                headerConStyle: {}
            },

        }
    },
    computed: {
        ...mapGetters([
            'errorCount'
        ]),
        tagNavList() {
            return this.$store.state.app.tagNavList
        },
        tagRouter() {
            return this.$store.state.app.tagRouter
        },
        userAvatar() {
            if (this.$store.state.user.userInfo.avatarImgPath !== '') {
                // return imgBaseUrl + this.$store.state.user.userInfo.avatarImgPath
                // return this.$store.state.user.userInfo.avatarImgPath
                //头像根据实际情况处理。
                return minLogo;
            } else {
                return minLogo
            }
        },
        cacheList() {
            const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta &&
                item.meta.notCache)).map(item => item.name) : []]
            return list
        },
        menuList() {
            return this.$store.getters.menuList
        },
        local() {
            return this.$store.state.app.local
        },
        hasReadErrorPage() {
            return this.$store.state.app.hasReadErrorPage
        },
        unreadCount() {
            return this.$store.state.user.unreadCount
        }
    },
    methods: {
        ...mapMutations([
            'setBreadCrumb',
            'setTagNavList',
            'addTag',
            'setLocal',
            'setHomeRoute',
            'closeTag',
            'setScreenType'
        ]),
        ...mapActions([
            'handleLogin',
            'getUnreadMessageCount'
        ]),
        turnToPage(route) {
            let {
                name,
                params,
                query
            } = {}
            if (typeof route === 'string') name = route
            else {
                name = route.name
                params = route.params
                query = route.query
            }
            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1])
                return
            }
            this.$router.push({
                name,
                params,
                query
            })
        },
        handleCollapsedChange(state) {
            if (this.screenWidth > 600) {
                this.collapsed = state
            } else {
                this.siderShow = state
            }
        },
        //刷新页面初始化数据功能
        handleCollReload() {
            if (this.$refs['viewArea'].initData && typeof this.$refs['viewArea'].initData === 'function') {
                this.$Loading.start();
                this.$refs['viewArea'].initData().then(res => {
                    console.log(res);
                    this.$Loading.finish();
                }).catch(err => {
                    console.log(err);
                    this.$Loading.error();
                })
            } else {
                this.$router.go(0)
            }
        },
        handleCloseTag(res, type, route) {
            if (type !== 'others') {
                if (type === 'all') {
                    this.turnToPage(this.$config.homeName)
                } else {
                    if (routeEqual(this.$route, route)) {
                        this.closeTag(route)
                    }
                }
            }
            this.setTagNavList(res)
        },
        handleClick(item) {
            this.turnToPage(item)
            // let routerObj = {}
            // routerObj.name = item.name
            // if (item.params) routerObj.params = item.params
            // if (item.query) routerObj.query = item.query
            // this.$router.push(routerObj)
        }
    },
    watch: {
        '$route'(newRoute) {
            const {
                name,
                query,
                params,
                meta
            } = newRoute
            this.addTag({
                route: {
                    name,
                    query,
                    params,
                    meta
                },
                type: 'push'
            })
            this.setBreadCrumb(newRoute)
            this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
            this.$refs.sideMenu.updateOpenName(newRoute.name)
        },

        'screenWidth'(newValue, oldValue) {
            if (newValue < oldValue && newValue < 800) {
                this.collapsed = true;
            }
        }


    },
    mounted() {
        /**
         * @description 初始化设置面包屑导航和标签导航
         */
        this.setTagNavList()
        this.setHomeRoute(routers)
        const {
            name,
            params,
            query,
            meta
        } = this.$route
        this.addTag({
            route: {
                name,
                params,
                query,
                meta
            }
        })


        this.setBreadCrumb(this.$route)
        // 设置初始语言
        this.setLocal(this.$i18n.locale)
        // 如果当前打开页面不在标签栏中，跳到homeName页
        if (!this.tagNavList.find(item => item.name === this.$route.name)) {
            this.$router.push({
                name: this.$config.homeName
            })
        }
        // 获取未读消息条数
        this.getUnreadMessageCount();
        this.screenWidth = document.body.clientWidth;
        this.setScreenType(this.screenWidth);
        window.onresize = () => {
            this.screenWidth = document.body.clientWidth;
            this.setScreenType(this.screenWidth);
        }
        if (this.cordovaReady) {
            //&& this.$store.state.app.screenType === 'small'
            // window.StatusBar.immersion().then(res => {
            //     if (res) {
            //         window.StatusBar.getStatusHeight().then(res => {
            //             //状态栏的高度等于获取到的状态栏高度除以dpi的值。
            //             console.log('statusBarHeight:' + (res / window.devicePixelRatio) + 'px');
            //             window.StatusBar.styleDefault();
            //             this.immersedStatusbarStyle.headerConStyle = {
            //                 paddingTop: (res / window.devicePixelRatio) + 'px',
            //                 height: 64 + (res / window.devicePixelRatio) + 'px'
            //             }
            //         })
            //     }
            // }).catch(err => {
            //     console.log(err);
            // })

            window.StatusBar.backgroundColorByHexString("#FFFFFF");
            window.StatusBar.styleDefault();
        } else {
            // this.immersedStatusbarStyle.headerConStyle = {
            //     paddingTop: '0px',
            //     height: '64px'
            // }
        }
    }
}
