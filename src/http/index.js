import store from '@/store'
import { REQUEST_FORM_DATA, REQUEST_FORM_URL, REQUEST_JSON } from './constant'
import instance from './core'

// 用户自定义扩展参数
const defaultCustomize = {
    // 是否弹出错误提示
    isPopUpErrorMsg: true,
    // 是否输出控制台的请求日志
    isOutputLog: store.getters.isDev,
}

export const doGet = (url, data, customizeConfig = defaultCustomize) => {
    return instance.get(url, {
        __customizeConfig: customizeConfig,
        params: data,
    })
}

export const doPostJson = (url, data, customizeConfig = defaultCustomize) => {
    return instance.post(url, data, {
        __customizeConfig: customizeConfig,
        headers: {
            'Content-Type': REQUEST_JSON,
        },
    })
}

export const doPostFormURL = (url, data, customizeConfig = defaultCustomize) => {
    return instance.post(url, data, {
        __customizeConfig: customizeConfig,
        headers: {
            'Content-Type': REQUEST_FORM_URL,
        },
    })
}

export const doPostFormData = (url, data, customizeConfig = defaultCustomize) => {
    return instance.post(url, data, {
        __customizeConfig: customizeConfig,
        headers: {
            'Content-Type': REQUEST_FORM_DATA,
        },
    })
}
