import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
        cordovaReady: false
    },
    mutations: {
        //
        setCordovaReady(state, cordovaReady) {
            state.cordovaReady = cordovaReady;
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
