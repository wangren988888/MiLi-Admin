import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cordovaReady: false,
        clientHeight: 0
    },
    getters: {
        cordovaReady: state => state.cordovaReady,
        clientHeight: state => state.clientHeight,
    },
    mutations: {
        //设置cordova环境是否加载成功
        setCordovaReady (state, cordovaReady) {
            state.cordovaReady = cordovaReady
        },
        //获取设备的可见高度
        setClientHeight (state, height) {
            state.clientHeight = height
        }
    },
    actions: {
        //
    },
    modules: {
        user,
        app
    }
})
