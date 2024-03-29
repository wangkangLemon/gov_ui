/**
 * Created by huanghuixin on 2017/3/20.
 */

import message from '../utils/message'
import authUtils from '../utils/authUtils'
import config from '../utils/config'
import * as typeUtils from '../utils/typeUtils'
import ajax from '@fdaciuk/ajax'

let requestId = 0
function getTimeoutPromise (url) {
    return new Promise((resolve, reject) => {
        console.log(requestedUrls[url])
        setTimeout(() => {
            // 如果该url还未处理完毕
            if (!requestedUrls[url]) {
                xmview.setLoading(false)
                xmview.showTip('error', '请求超时! 请重试')
                reject(new Error({message: '请求超时', code: -9}))
            } else {
                config.debug && console.info('该url处理完毕', url)
            }

            // 删除这个url的引用
            delete requestedUrls[url]
        }, 50000)
    })
}

// 请求完毕的url
let requestedUrls = {}
export function get (url, params, needLoading = false) {
    return sendRequest('GET', url, params, needLoading)
}

export function post (url, params, needLoading = false) {
    return sendRequest('POST', url, params, needLoading)
}

export function put (url, params, needLoading) {
    console.log('put()')
    return sendRequest('PUT', url, params, needLoading)
}

export function del (url, params, needLoading) {
    console.log('del--------------------------------')
    return sendRequest('DELETE', url, params, needLoading)
}

export function upload(url, params, needLoading) {
    console.log('del--------------------------------')
    return sendRequest('UPLOAD', url, params, needLoading)
}
// 下载功能
export function downLoad (url, params, fileName) {
    return new Promise((resolve, reject) => {
        url = url + '?' + processParams(params)
        let xhr = new window.XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.setRequestHeader('Authorization', `Bearer ${authUtils.getAuthToken()}`)
        xhr.setRequestHeader('TwoStep', `Bearer ${authUtils.getTwiceToken()}`)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function () {
            if (xhr.status === 200) {
                let blob = new window.Blob([xhr.response])
                var aLink = document.createElement('a')
                let evt = new window.MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                })
                aLink.download = fileName
                aLink.href = window.URL.createObjectURL(blob)
                aLink.dispatchEvent(evt)
                setTimeout(() => {
                    aLink = null
                    evt = null
                }, 0)
                resolve(blob)
            } else {
                reject(xhr)
            }
        }
        xhr.send()
    })
}

// 共用的请求数据方法
function sendRequest (method, url, params, needLoding = false) {
    if (method === 'GET' && params)
        url = url + '?' + processParams(params)

    needLoding && xmview.setLoading(true)

    let pRequest = new Promise((resolve, reject) => {
        // 根据是否有token 添加header
        let headers = {}
        
        if (authUtils.getAuthToken()) headers['Authorization'] = 'Bearer ' + authUtils.getAuthToken() // 登录凭证
        // if (authUtils.getTwiceToken()) headers['TwoStep'] = `Bearer ` + authUtils.getTwiceToken() // 二次验证的token
        
        //直传图片写的假post 方法 
        if (method === 'UPLOAD') {
            headers = Object.assign({}, headers, {
                'Content-Type': 'multipart/form-data'
            })
            method = 'POST' 
        }//

        ajax({
            method: method,
            url: url,
            data: method === 'GET' ? {} : params,
            headers
        }).then((ret, xhr) => {
            resolve(ret, xhr)
        }).catch((err, xhr) => {
            reject({err, xhr})
        })
    })

    return pRequest

    // url += '|' + requestId++

    // return new Promise((resolve, reject) => {
    //     Promise.race([getTimeoutPromise(url), processResponse(pRequest, url)]).then((ret) => {
    //         if (typeof ret !== 'function') resolve(ret)
    //     }).catch(err => {
    //         reject(err)
    //     })
    // })
}

// 处理请求后的response数据
function processResponse (promise, url) {
    return promise.then(json => {
        // 表示跨域请求的第一次
        if (typeof json === 'function') return 'cross'

        let p = processCodeError(json, url)
        if (p)
            return p
        return json
    }, ({ex, xhr}) => {
        // 如果登录验证不通过
        if (xhr.status === 401) {
            processLoginOut(xhr)
            return true
        } else if (xhr.status === 404) {
            xmview.showTip('error', '未找到该请求地址')
            return Promise.reject(ex)
        } else {
            requestedUrls[url] = true
            xmview.setLoading(false)
            ex.tipCom = xmview.showTip('error', '服务器请求失败! 请重试')  // 提示框的实例
            return Promise.reject(ex)
        }
    })
}

// 处理正常返回后的结果的异常和一些预处理
function processCodeError (ret, url) {
    requestedUrls[url] = true

    // 如果过期
    if (ret.code === 10000 || ret.code === 10001 || ret.code === 10002 || ret.code === 10003) {
        if (ret.code === 10003) authUtils.setTwiceToken('')
        return processLoginOut(ret)
    } else if (ret.code >= 100) {
        ret.tipCom = xmview.showTip('error', ret.message)
        return Promise.reject(ret)
    } else if (ret.code != 0) {
        ret.tipCom = xmview.showTip('error', ret.message || '远程服务器出现问题!')
        return Promise.reject(ret)
    }
}

export function processParams (params) {
    // 如果是字符串直接返回
    if (typeUtils.isString(params))
        return params
    let data = []
    for (let k in params) {
        let val = params[k] == null ? '' : params[k]
        data.push(k + '=' + val)
    }

    return data.join('&')
}

// 处理登录超时
function processLoginOut (ret) {
    // 如果已经在登录页面 不做任何处理
    if (xmrouter.history.current.name === 'login') {
        return Promise.reject(ret)
    }
    setTimeout(() => {
        xmview.showTip('error', message.MESSAGE_AUTH_INVALID)
        // 记录当前的url
        let query = {}
        if (xmrouter.history.current.name !== 'login' && window.location.href.indexOf('/login') < 0) query = {returnUrl: window.location.href}
        xmrouter.push({name: 'login', query})
    }, 0)
}
