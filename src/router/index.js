import Vue from 'vue'
import VueRouter from 'vue-router'
import cache from '@/tool/cache.js'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '',
        component: () => import('@/layout/PageLayout.vue'),
        children: [
            {
                path: '/home',
                component: () => import('@/views/home'),
                meta: {
                    title: '首页',
                },
            },
            {
                path: '/table',
                component: () => import('@/layout/ViewLayout.vue'),
                meta: {
                    title: '表格',
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('@/views/table/list/index.vue'),
                        meta: {
                            title: '列表',
                        },
                    },
                    {
                        path: 'list/detail',
                        component: () => import('@/views/table/detail/index.vue'),
                        meta: {
                            title: '详情',
                        },
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '*',
        component: () => import('@/views/NotFound.vue'),
    },
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
})

export default router

// 跳转登录页, 清空 vue-router 的路由列表
export const jumpToLogin = () => {
    cache.removeAll()
    window.location.href = `${window.location.origin}${window.location.pathname}#/login`
}
