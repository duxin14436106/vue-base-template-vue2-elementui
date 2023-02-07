import { isEmptyOrNullOrUndefined } from './helper'

/**
 * 正则： 校验身份证号
 * @param {*} message element 表单提示的文字
 * @param {*} isAllowEmpty 是否允许空值
 * @returns
 */
export const idCardRegExp = (message = '请输入正确的身份证号', isAllowEmpty = false) => {
    const reg =
        /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    return {
        rule: (rule, value, callback) => {
            if (isAllowEmpty && isEmptyOrNullOrUndefined(value)) {
                return callback()
            }

            if (!reg.test(value)) {
                return callback(new Error(message))
            }
            callback()
        },
        reg,
    }
}

/**
 * 正则： 校验手机号
 * @param {*} message element 表单提示的文字
 * @param {*} isAllowEmpty 是否允许空值
 * @returns
 * @returns
 */
export const phoneRegExp = (message = '请输入正确的手机号', isAllowEmpty = false) => {
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    return {
        rule: (rule, value, callback) => {
            if (isAllowEmpty && isEmptyOrNullOrUndefined(value)) {
                return callback()
            }

            if (!reg.test(value)) {
                return callback(new Error(message))
            }
            callback()
        },
        reg,
    }
}

/**
 * 正则： 校验姓名
 * @param {*} message element 表单提示的文字
 * @param {*} isAllowEmpty 是否允许空值
 * @returns
 * @returns
 */
export const nameRegExp = (
    message = '仅支持中文、英文、数字格式,且字数限制为2-50个',
    isAllowEmpty = false,
) => {
    const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,50}$/
    return {
        rule: (rule, value, callback) => {
            if (isAllowEmpty && isEmptyOrNullOrUndefined(value)) {
                return callback()
            }

            if (!reg.test(value)) {
                return callback(new Error(message))
            }
            callback()
        },
        reg,
    }
}

/**
 * 正则： 校验密码
 * @param {*} message element 表单提示的文字
 * @param {*} isAllowEmpty 是否允许空值
 * @returns
 * @returns
 */
export const passwordRegExp = (
    message = '密码由8-16位数字加大小写字母组成',
    isAllowEmpty = false,
) => {
    const reg =
        /^(?=[a-zA-Z\d]*[0-9][a-zA-Z\d]*)(?=[a-zA-Z\d]*[A-Z][a-zA-Z\d]*)(?=[a-zA-Z\d]*[a-z][a-zA-Z\d]*)[a-zA-Z\d]{8,16}$/
    return {
        rule: (rule, value, callback) => {
            if (isAllowEmpty && isEmptyOrNullOrUndefined(value)) {
                return callback()
            }

            if (!reg.test(value)) {
                return callback(new Error(message))
            }
            callback()
        },
        reg,
    }
}
