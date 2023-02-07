const { isType } = require('./helper')

const PREFIX_KEY = process.env.VUE_APP_LOCAL_STORAGE_PREFIX

class Cache {
    /**
     * 获取缓存，
     * @param {string} key
     */
    get(key) {
        let data = localStorage.getItem(`${PREFIX_KEY}_${key}`)

        try {
            data = JSON.parse(data)
        } catch (error) {
            console.error(error)
        }

        return data
    }
    /**
     * 设置缓存
     * @param {string} key
     * @param {string} data
     */
    set(key, data) {
        if (!isType(key, 'String')) {
            return new Error('参数 key 只能为 String')
        }

        if (!isType(data, 'Object') && !isType(data, 'Array') && !isType(data, 'String')) {
            return new Error('参数 data 不合法，只支持 Object|Array|String')
        }

        if (isType(data, 'Object') || isType(data, 'Array')) {
            data = JSON.stringify(data)
        }

        return localStorage.setItem(`${PREFIX_KEY}_${key}`, data)
    }
    /**
     * 删除数据
     * @param {string} key
     * @returns
     */
    remove(key) {
        return localStorage.removeItem(`${PREFIX_KEY}_${key}`)
    }
    /**
     * 删除所有缓存
     */
    removeAll() {
        const reg = new RegExp(`^${PREFIX_KEY}`)
        const len = localStorage.length
        const keys = []
        for (let i = 0; i < len; i++) {
            keys.push(localStorage.key(i))
        }

        for (let i = 0; i < keys.length; i++) {
            if (reg.test(keys[i])) {
                localStorage.removeItem(keys[i])
            }
        }
    }
}

const cache = new Cache()

export default cache
