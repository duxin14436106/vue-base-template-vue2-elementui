import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapse: false,
        breadcrumbList: [],
        keepAliveList: [],
        appVersion: 'V1.0.0',
        appName: process.env.VUE_APP_SYSTEM_NAME || '系统',
    },
    mutations: {
        setCollapse(state, isCollapse) {
            state.isCollapse = isCollapse
        },
        setBreadcrumbList(state, breadcrumbList) {
            state.breadcrumbList = breadcrumbList
        },
        setKeepAliveList(state, keepAliveList) {
            state.keepAliveList = keepAliveList
        },
    },
    actions: {
        setCollapse(context, isCollapse) {
            context.commit('setCollapse', isCollapse)
        },
        setBreadcrumbList(context, breadcrumbList) {
            context.commit('setBreadcrumbList', breadcrumbList)
        },
        setKeepAliveList(context, keepAliveList) {
            context.commit('setKeepAliveList', keepAliveList)
        },
    },
    getters: {
        isCollapse: state => state.isCollapse,
        breadcrumbList: state => state.breadcrumbList,
        keepAliveList: state => state.keepAliveList,
        appVersion: state => state.appVersion || 'V1.0.0',
        isDev: () => process.env.VUE_APP_BUILD_ENV === 'dev',
        isTest: () => process.env.VUE_APP_BUILD_ENV === 'test',
        isRelease: () => process.env.VUE_APP_BUILD_ENV === 'release',
        appName: state => state.appName,
    },
})
