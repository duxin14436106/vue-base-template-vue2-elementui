import { mapActions, mapGetters } from 'vuex'
/**
 * 适用于 列表页  -> 详情页面， 缓存列表页面的数据，在列表页调用
 * 跳转其他页面， 不会缓存
 * @param {*} nextPage 下次跳转页面的数组
 * @param {*} cachePageName 需要缓存的页面
 * @returns
 */
export const usePageCache = (nextPage, cachePageName) => {
    if (!(nextPage instanceof Array)) {
        throw new Error('nextPage must be an array')
    }

    return {
        beforeRouteLeave(to, from, next) {
            if (nextPage.includes(to.path)) {
                const arr = [...this.keepAliveList, cachePageName]
                const set = new Set(arr)
                this.setKeepAliveList([...set])
            } else {
                if (to.matched.length > 0) {
                    const nextCom = to.matched[from.matched.length - 1].components.default
                    const index = this.keepAliveList.indexOf(nextCom.name)
                    if (index >= 0) {
                        const arr = [...this.keepAliveList]
                        arr.splice(index + 1)
                        this.setKeepAliveList(arr)
                    } else {
                        this.setKeepAliveList([])
                    }
                }
            }
            setTimeout(() => {
                next()
            }, 0)
        },
        computed: {
            ...mapGetters(['keepAliveList']),
        },
        methods: {
            ...mapActions(['setKeepAliveList']),
        },
    }
}

/**
 * 执行清除缓存操作， 需要在一些列缓存页面的最后一个页面调用
 * 适用于 列表页  -> 详情页面， 缓存列表页面的数据，
 * 在详情页调用， 可以在离开时清除页面缓存
 * @returns
 */
export const usePageClear = () => {
    return {
        beforeRouteLeave(to, from, next) {
            const nextCom = to.matched[from.matched.length - 1].components.default
            const index = this.keepAliveList.indexOf(nextCom.name)
            if (index >= 0) {
                const arr = [...this.keepAliveList]
                arr.splice(index + 1)
                this.setKeepAliveList(arr)
            } else {
                this.setKeepAliveList([])
            }
            next()
        },
        computed: {
            ...mapGetters(['keepAliveList']),
        },
        methods: {
            ...mapActions(['setKeepAliveList']),
        },
    }
}
