import Vue from 'vue'
import VueScroll from 'vuescroll'

import App from './App.vue'
import router from './router'
import store from './store'

import './tool/useElementUI.js'

console.log(process.env)

Vue.config.productionTip = false

Vue.use(VueScroll, {
    name: 'VueScroll',
    detectResize: true,
    ops: {
        rail: {
            background: '#fff',
            opacity: 0,
            border: '0px solid #fff',
            size: '8px',
        },
        bar: {
            background: '#c1c1c1',
            opacity: 1,
        },
    },
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
