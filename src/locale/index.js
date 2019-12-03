import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {
    localRead
} from '@/libs/util'
import {
    VantLocal
} from './vantLocale.js'
import customZhCn from './lang/zh-CN'
import customEnUs from './lang/en-US'
import customFrFr from './lang/fr-FR'
import zhCnLocale from 'iview/src/locale/lang/zh-CN'
import enUsLocale from 'iview/src/locale/lang/en-US'
import frFrLocale from 'iview/src/locale/lang/fr-FR'

Vue.prototype.$VantLocal = VantLocal

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localLang || localRead('local') || 'zh-CN'

Vue.config.lang = lang
VantLocal(lang)

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
    'zh-CN': Object.assign(zhCnLocale, customZhCn),
    'en-US': Object.assign(enUsLocale, customEnUs),
    'fr-FR': Object.assign(frFrLocale, customFrFr)
}
const i18n = new VueI18n({
    locale: lang,
    messages
})

export default i18n
