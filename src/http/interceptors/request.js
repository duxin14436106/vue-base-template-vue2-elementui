import { REQUEST_FORM_DATA, REQUEST_FORM_URL } from '../constant'
import qs from 'qs'
import { serialize } from 'object-to-formdata'
import log from '@/tool/log'

/**
 * 处理公共参数，公共 header
 * @param {*} config
 * @returns
 */
export const handleRequestConfig = config => {
    // todo: 请求设置公共参数， 公共 header

    return config
}

/**
 * 记录请求日志
 * @param {*} config
 * @returns
 */
export const handleLog = config => {
    const requestId = Math.random().toString(32).substring(2)
    config.__customizeConfig['requestId'] = requestId
    log.add(requestId, config)
    return config
}

/**
 * 转换 form-url 的数据
 * @param {*} config
 * @returns
 */
export const convertPostFormURL = config => {
    if (
        config.method.toLocaleLowerCase() == 'post' &&
        config.headers['Content-Type'] === REQUEST_FORM_URL
    ) {
        config.data = qs.stringify(config.data || {})
    }

    return config
}
/**
 * 转换请求 formdata 数据
 * @param {*} config
 * @returns
 */

export const convertPostFormData = config => {
    if (
        config.method.toLocaleLowerCase() == 'post' &&
        config.headers['Content-Type'] === REQUEST_FORM_DATA
    ) {
        config.data = serialize(config.data || {}, {
            indices: true,
        })
    }

    return config
}
