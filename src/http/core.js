import axios from 'axios'
import { REQUEST_JSON } from './constant'
import { resetMessage } from '@/tool/useElementUI'
import {
    handleRequestConfig,
    handleLog,
    convertPostFormData,
    convertPostFormURL,
} from './interceptors/request'
import log from '@/tool/log'

const instance = axios.create({
    baseURL: process.env.VUE_APP_REQUEST_URL,
    timeout: 30 * 1000,
    headers: { 'Content-Type': REQUEST_JSON },
})

// 请求拦截器
instance.interceptors.request.use(handleRequestConfig)
instance.interceptors.request.use(convertPostFormData)
instance.interceptors.request.use(convertPostFormURL)
instance.interceptors.request.use(handleLog)

instance.interceptors.response.use(
    result => {
        const { isPopUpErrorMsg, isOutputLog, requestId } = result.config.__customizeConfig

        if (isOutputLog) {
            log.printf(requestId, result)
        }

        // 处理成功的code
        if (['000000'].includes(result.data.errorCode)) {
            return Promise.resolve(result.data.data)
        }

        // todo: 处理 token 失效/无效的 code， 需判断 isPopUpErrorMsg 参数

        if (isPopUpErrorMsg) {
            resetMessage.error(result.data.errorMsg)
        }
        return Promise.reject(result.data)
    },
    error => {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            if (error.response.status === 404) {
                resetMessage.error('请求地址不存在， 请检查地址是否正确')
                return Promise.reject(error)
            }

            resetMessage.error('服务器出错， 请稍后重试')
            return Promise.reject(error)
        }

        if (error.request) {
            // 请求已经成功发起，但没有收到响应
            resetMessage.error('服务器未响应， 请稍后重试')
            return Promise.reject(error)
        }

        resetMessage.error(error.message)
        return Promise.reject(error)
    },
)

export default instance
