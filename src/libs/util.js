import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import {forEach, hasOneOf, objEqual} from '@/libs/tools'
import crypto from 'crypto'
import storage from '@/libs/storageUtil';

const {title, cookieExpires, useI18n} = config

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
    // storage.set(TOKEN_KEY, token);
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    // const token = storage.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
        if (hasOneOf(item.meta.access, access)) return true
        else return false
    } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
    let res = []
    forEach(list, item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
                obj.children = getMenuByRouter(item.children, access)
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href
            if (showThisMenuEle(item, access)) res.push(obj)
        }
    })
    return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
    let homeItem = {...homeRoute, icon: homeRoute.meta.icon}
    let routeMetched = route.matched
    if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
    let res = routeMetched.filter(item => {
        return item.meta === undefined || !item.meta.hideInBread
    }).map(item => {
        let meta = {...item.meta}
        if (meta.title && typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true
            meta.title = meta.title(route)
        }
        let obj = {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: meta
        }
        return obj
    })
    res = res.filter(item => {
        return !item.meta.hideInMenu
    })
    return [{...homeItem, to: homeRoute.path}, ...res]
}

export const getRouteTitleHandled = (route) => {
    let router = {...route}
    let meta = {...route.meta}
    let title = ''
    if (meta.title) {
        if (typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true
            title = meta.title(router)
        } else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
}

export const showTitle = (item, vm) => {
    let {title, __titleIsFunction__} = item.meta
    if (!title) return
    if (useI18n) {
        if (title.includes('{{') && title.includes('}}') && useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
        else if (__titleIsFunction__) title = item.meta.title
        else title = vm.$t(item.name)
    } else title = (item.meta && item.meta.title) || item.name
    return title
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
        let item = routers[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName)
            if (res.name) return res
        } else {
            if (item.name === homeName) homeRoute = item
        }
    }
    return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const {name, path, meta} = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({name, path, meta})
    return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
    if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
    else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
    const routePermissionJudge = (list) => {
        return list.some(item => {
            if (item.children && item.children.length) {
                return routePermissionJudge(item.children)
            } else if (item.name === name) {
                return hasAccess(access, item)
            }
        })
    }

    return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    let res = {}
    if (list.length === 2) {
        res = getHomeRoute(list)
    } else {
        const index = list.findIndex(item => routeEqual(item, route))
        if (index === list.length - 1) res = list[list.length - 2]
        else res = list[index + 1]
    }
    return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
        callback(i)
    }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
    let nameSplit = file.name.split('.')
    let format = nameSplit[nameSplit.length - 1]
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsText(file) // 以文本格式读取
        let arr = []
        reader.onload = function (evt) {
            let data = evt.target.result // 读到的数据
            let pasteData = data.trim()
            arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
                return row.split('\t')
            }).map(item => {
                return item[0].split(',')
            })
            if (format === 'csv') resolve(arr)
            else reject(new Error('[Format Error]:你上传的不是Csv文件'))
        }
    })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
    let columns = []
    let tableData = []
    if (array.length > 1) {
        let titles = array.shift()
        columns = titles.map(item => {
            return {
                title: item,
                key: item
            }
        })
        tableData = array.map(item => {
            let res = {}
            item.forEach((col, i) => {
                res[titles[i]] = col
            })
            return res
        })
    }
    return {
        columns,
        tableData
    }
}

export const findNodeUpper = (ele, tag) => {
    if (ele.parentNode) {
        if (ele.parentNode.tagName === tag.toUpperCase()) {
            return ele.parentNode
        } else {
            return findNodeUpper(ele.parentNode, tag)
        }
    }
}

export const findNodeUpperByClasses = (ele, classes) => {
    let parentNode = ele.parentNode
    if (parentNode) {
        let classList = parentNode.classList
        if (classList && classes.every(className => classList.contains(className))) {
            return parentNode
        } else {
            return findNodeUpperByClasses(parentNode, classes)
        }
    }
}

export const findNodeDownward = (ele, tag) => {
    const tagName = tag.toUpperCase()
    if (ele.childNodes.length) {
        let i = -1
        let len = ele.childNodes.length
        while (++i < len) {
            let child = ele.childNodes[i]
            if (child.tagName === tagName) return child
            else return findNodeDownward(child, tag)
        }
    }
}

export const showByAccess = (access, canViewAccess) => {
    return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
        if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
}

export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}

export const localRead = (key) => {
    return localStorage.getItem(key) || ''
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback()
            return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
    const handledRoute = getRouteTitleHandled(routeItem)
    const pageTitle = showTitle(handledRoute, vm)
    const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
    window.document.title = resTitle
}


/*
* 获取当前浏览器名
* */

export const getBrowser = () => {  // 获取浏览器名
    var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var rEdge = /(chrome)\/([\w.]+)/;//IE

    var rFirefox = /(firefox)\/([\w.]+)/;  //火狐
    var rOpera = /(opera).+version\/([\w.]+)/;  //旧Opera
    var rNewOpera = /(opr)\/(.+)/;  //新Opera 基于谷歌
    var rChrome = /(chrome)\/([\w.]+)/; //谷歌
    var rUC = /(chrome)\/([\w.]+)/;//UC
    var rMaxthon = /(chrome)\/([\w.]+)/;//遨游
    var r2345 = /(chrome)\/([\w.]+)/;//2345
    var rQQ = /(chrome)\/([\w.]+)/;//QQ
    //var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
    var rSafari = /version\/([\w.]+).*(safari)/;

    var ua = navigator.userAgent.toLowerCase();


    var matchBS, matchBS2;

    //IE 低版
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
        matchBS2 = rTrident.exec(ua);
        if (matchBS2 != null) {
            switch (matchBS2[2]) {
                case "4.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 8"  //内核版本号
                    };
                    break;
                case "5.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 9"
                    };
                    break;
                case "6.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 10"
                    };
                    break;
                case "7.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 11"
                    };
                    break;
                default:
                    return {
                        browser:
                            "Microsoft IE",
                        version: "Undefined"
                    };
            }
        } else {
            return {
                browser: "Microsoft IE",
                version: "IE:" + matchBS[2] || "0"
            };
        }
    }
    //IE最新版
    matchBS = rEdge.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "Microsoft Edge",
            version: "Chrome/" + matchBS[2] || "0"
        };
    }
    //UC浏览器
    matchBS = rUC.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "UC",
            version: "Chrome/" + matchBS[2] || "0"
        };
    }
    //火狐浏览器
    matchBS = rFirefox.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "火狐",
            version: "Firefox/" + matchBS[2] || "0"
        };
    }
    //Oper浏览器
    matchBS = rOpera.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "Opera",
            version: "Chrome/" + matchBS[2] || "0"
        };
    }
    //遨游
    matchBS = rMaxthon.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "遨游",
            version: "Chrome/" + matchBS[2] || "0"
        };
    }
    //2345浏览器
    matchBS = r2345.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "2345",
            version: "Chrome/ " + matchBS[2] || "0"
        };
    }
    //QQ浏览器
    matchBS = rQQ.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "QQ",
            version: "Chrome/" + matchBS[2] || "0"
        };
    }
    //Safari（苹果）浏览器
    matchBS = rSafari.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
        return {
            browser: "Safari",
            version: "Safari/" + matchBS[1] || "0"
        };
    }
    //谷歌浏览器
    matchBS = rChrome.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        matchBS2 = rNewOpera.exec(ua);
        if (matchBS2 == null) {
            return {
                browser: "谷歌",
                version: "Chrome/" + matchBS[2] || "0"
            };
        } else {
            return {
                browser: "Opera",
                version: "opr/" + matchBS2[2] || "0"
            };
        }
    }
}

export const getOs = () => {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Win64") || (navigator.platform == "wow64");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
    if (isLinux) {
        if (bIsAndroid) return "Android";
        else return "Linux";
    }
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows nt 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows nt 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
        sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows nt 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows nt 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows nt 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8) return "Win8";
        var isWin10 = sUserAgent.indexOf("windows nt 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "其他";
}

export const handleFullscreen = (type) => {
    let main = document.body;
    if (!type) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    } else {
        if (main.requestFullscreen) {
            main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
            main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
            main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
            main.msRequestFullscreen()
        }
    }
}

export const getMd5 = (str) => {
    let md5 = crypto.createHash("md5");
    return md5.update('str').digest('hex');
}

//获取本机ip地址
export const getUserIP = (onNewIP) => { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function () {
        },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
    });

    //sten for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

//深拷贝对象
export const deepCopyObj = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}
