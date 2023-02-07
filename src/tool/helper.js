/**
 *  判断类型
 * @param {*} val 需要判断的值
 * @param {*} type 判断的类型， 如 Array, Object, String, Number
 * @returns
 */
export const isType = (val, type) => {
    return Object.prototype.toString.call(val) == `[object ${type}]`
}

/**
 * 判断是否空字符
 * @param {*} val
 * @returns
 */
export const isEmpty = val => {
    return isType(val, 'String') && val.length <= 0
}

/**
 * 判断是否为 Null
 * @param {*} val
 * @returns
 */
export const isNull = val => {
    return isType(val, 'Null')
}
/**
 * 判断是否为 Undefined
 * @param {*} val
 * @returns
 */
export const isUndefined = val => {
    return isType(val, 'Undefined')
}

/**
 * 判断是否为 null 或者 Undefined
 * @param {*} val
 * @returns
 */
export const isNullOrUndefined = val => {
    return isUndefined(val) || isNull(val)
}

/**
 * 判断是空字符 或 null 或 Undefined
 * @param {*} val
 * @returns
 */
export const isEmptyOrNullOrUndefined = val => {
    return isEmpty(val) || isNullOrUndefined(val)
}
