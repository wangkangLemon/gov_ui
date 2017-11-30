/**
 * Created by huangrui on 2017/7/4.
 */
/*
 * 获取数组ID所在项的index
 * 数组 array
 * ID  id
 */
export function getArrayIdIndex(array, id) {
    return array.findIndex((value, index, arr) => {
        return value.id == id
    })
}

/**
 * 判断两个数组的值是否相等
 * arrB [{name: xx, code: xx},...]
 */
export function isArrayEqual(arrA, arrB, formatter) {
    formatter && (arrB = formatter(arrB))
    return arrA.filter(x => !arrB.includes(x)).length
}
