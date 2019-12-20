// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import './comm.less'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
// cordova插件
// import {CordovaFileManage, CordovaPermissionsManage} from '@/cordova-plugins';

import { mapGetters } from 'vuex'
import VueUeditorWrap from 'vue-ueditor-wrap'

Vue.component('vue-ueditor-wrap', VueUeditorWrap)

import { VueHammer } from 'vue2-hammer'

Vue.use(VueHammer)

import Vconsole from 'vconsole'

if (process.env.NODE_ENV === 'production') {
    new Vconsole()
}

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

Vue.mixin({
    computed: {
        ...mapGetters(['screenType', 'clientHeight', 'cordovaReady']),
    }
})

function initApp () {
    let app = new Vue({
        el: '#app',
        router,
        i18n,
        store,
        render: h => h(App)
    })
}

initApp()

// 初始化系统的文件读写权限，根据读写权限的获取情况进行逻辑判断；主要是为了打包为app后单独部署时可通过读取配置文件中的网络请求baseUrl字段。
// function initFileManage() {
//     CordovaFileManage.initFile().then(fs => {
//         fs.root.getFile('weShopXAdmin.txt', {
//             create: false,
//             exclusive: false
//         }, res => {
//             console.log('success:', res);
//             CordovaFileManage.readFile(res).then(readRes => {
//                 if (readRes === '') {
//                     store.commit('setConfigMessage', '服务器配置信息为空,请先进行了相关设置.')
//                     store.commit('setBaseUrl', {ip: '', port: ''});
//                 } else {
//                     let readResObj = JSON.parse(readRes);
//                     console.log('读取成功:', readResObj);
//                     store.commit('setBaseUrl', {ip: readResObj.ip, port: readResObj.port});
//                 }
//                 initApp();
//             }).catch(error => {
//                 console.log('读取失败:', error);
//                 store.commit('setConfigMessage', '读取配置文件失败,' + error.message);
//                 initApp();
//             })
//         }, err => {
//             console.log('err:', err);
//             if (err.code === 1) {
//                 CordovaFileManage.createFile(fs.root, 'weShopXAdmin.txt', false).then(res => {
//                     console.log('创建成功:', res);
//                     initApp();
//                 }).catch(err => {
//                     console.log('创建失败:', err);
//                     store.commit('setConfigMessage', '配置文件创建失败,' + err.toString())
//                     initApp();
//                 })
//             }
//         })
//     })
// }
//
// 判断当前打包模式
// if (process.env.VUE_APP_TYPE === 'cordova') {
//     document.addEventListener("deviceready", () => {
//         store.commit('setCordovaReady', true);
//         Object.assign(window.device, {serial: 'E032H23'});
//         CordovaPermissionsManage.checkPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE).then(res => {
//             if (!res.hasPermission) {
//                 //没有权限
//                 CordovaPermissionsManage.requestPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE).then(res => {
//                     if (res.hasPermission) {
//                         //申请权限成功
//                         initFileManage();
//                     } else {
//                         //申请失败
//                         store.commit('setConfigMessage', '申请读写权限失败,请给予读写权限后重启APP');
//                         initApp();
//                     }
//                 }).catch(error => {
//                     //申请失败
//                     store.commit('setConfigMessage', '调用申请权限接口失败,' + error.toString());
//                     initApp();
//                 })
//             } else {
//                 //有权限
//                 initFileManage();
//             }
//         }).catch(error => {
//             //检测权限失败
//             store.commit('setConfigMessage', '调用检测权限接口失败,' + error.toString());
//             initApp();
//         })
//     }, false);
// } else {
//     initApp()
// }






