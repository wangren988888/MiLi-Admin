import store from '@/store'
import {getBrowser, getOs} from '@/libs/util'

export default {
    install(Vue, options) {
        if (options.developmentOff && process.env.NODE_ENV === 'development') return
        Vue.config.errorHandler = (error, vm) => {
            console.log(error);
            let info = {
                type: 'script',
                code: 0,
                osInfo: getOs(),
                browserInfo: getBrowser().browser + '/' + getBrowser().version,
                mes: error.message,
                url: window.location.href
            }
            Vue.nextTick(() => {
                store.dispatch('addErrorLog', info)
            })
        }
    }
}
