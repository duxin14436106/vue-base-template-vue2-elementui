class Log {
    constructor() {
        this.logMap = new Map()
    }
    printf(key, res) {
        if (this.logMap.has(key)) {
            const item = this.logMap.get(key)
            const endTime = window.performance.now()
            console.log('------------------请求开始---------------------')
            console.log(
                '%c接口地址：',
                'color: #fff; background: #333; padding:4px; border-radius: 3px 0 0 3px;',
                `${item.baseURL}${item.url}`,
            )
            console.log(
                '%c接口耗时：',
                'color: #fff; background: #333; padding:4px; border-radius: 3px 0 0 3px;',
                Math.floor(endTime - item.startTime, 0) + 'ms',
            )
            console.log(
                '%c接口类型：',
                'color: #fff; background: #333; padding:4px; border-radius: 3px 0 0 3px;',
                item.method,
            )
            console.log(
                '%c接口配置：',
                'color: #fff; background: #333; padding:4px; border-radius: 3px 0 0 3px;',
                item.headers,
            )
            console.log(
                '%c接口参数：',
                'color: #fff; background: #333; padding:4px; border-radius: 3px 0 0 3px;',
                item.method.toLocaleLowerCase() == 'get' ? item.params : item.data,
            )
            console.log(
                '%c接口返回：',
                'color: #fff; background: #333; padding:4px; border-radius: 3px 0 0 3px;',
                res.data,
            )
            console.log('------------------请求结束---------------------')
            this.remove(key)
        }
    }
    add(key, op = {}) {
        op['startTime'] = window.performance.now()
        this.logMap.set(key, op)
    }
    remove(key) {
        this.logMap.delete(key)
    }
}

export default new Log()
