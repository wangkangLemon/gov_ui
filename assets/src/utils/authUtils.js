/**
 * Created by huanghuixin on 2017/3/20.
 */

const KEY_AUTHTOKEN = 'KEY_AUTH_UTILS_TOKEN' // jwt的token
const KEY_AUTHUSERINFO = 'KEY_AUTH_UTILS_USERINFO' // 用户信息
const KEY_AUTHSETNAVMENU = 'KEY_AUTH_UTILS_SETNAVMENU' // 菜单
const KEY_AUTHSETOPERATION = 'KEY_AUTH_UTILS_OPERATION' // 操作权限
const KEY_TWICE_AUTH = 'KEY_AUTH_UTILS_TWICEAUTH' // 二次验证的key
const KEY_AUTHTOKEN_TTL = 3600 // jwt的token 有效期，过期作废，一个小时

import message from './message'
import * as authApi from '../services/base/authService'
// import config from '../utils/config'

let refreshIntervalId
let firstRefreshTimeoutId
let authUtils = {
    // 身份凭证操作
    getAuthToken () {
        let str = localStorage.getItem(KEY_AUTHTOKEN)
        if (str == '') {
            return null
        }
        // try是为了兼容旧代码
        try {
            str = JSON.parse(str)
            if (str && str.ttl > Date.now()) {
                return str.token
            }
            // alert('检测到token过期')
            // debugger
            return null
        } catch (e) {
            return null
        }
    },
    setAuthToken (token) {
        localStorage.setItem(KEY_AUTHTOKEN, JSON.stringify({token: token, ttl: Date.now() + KEY_AUTHTOKEN_TTL * 1000}))
    },
    getUserInfo () {
        let str = localStorage.getItem(KEY_AUTHUSERINFO)
        if (str)
            return JSON.parse(str)
        else
            return null
    },
    setUserInfo (userInfo) {
        localStorage.setItem(KEY_AUTHUSERINFO, JSON.stringify(userInfo))
        
        // localStorage.setItem(KEY_AUTHUSERINFO, `{"id":3,"company_id":2,"company":"演示用制药企业","organization_id":0,"company_category":1,"department_id":0,"dep_name":"","mobile":"","email":"gongye@vodjk.com","name":"工业","is_passwd":true,"avatar":"","birthday":"","sex":1,"job":"","id_number":"","education":"","province":"","address":"ssss","disabled":0,"last_login_ip":"0","last_login_time":"2017-10-16T13:56:23+08:00","last_login_time_name":"","last_active_time":"2017-01-18T15:26:57+08:00","last_active_time_name":"2017-01-18 15:26:57","last_appstart":"ios","join_time":"","create_day":"2016-01-08T00:00:00+08:00","addate":"2016-01-08 13:14:59","create_time_unix":1452230099,"update_time_name":"2017-10-02 05:45:55","update_time_unix":1506894355,"roles":[101],"organizations":[],"agent_id":0,"product_id":0}`)
    },
    setAvatar (avatar) {
        var userInfo = this.getUserInfo()
        if (userInfo) {
            userInfo.avatar = avatar
            this.setUserInfo(userInfo)
        }
    },
    // 保存获取菜单
    getNavMenu () {
        let str = localStorage.getItem(KEY_AUTHSETNAVMENU)
        if (str)
            return JSON.parse(str)
        else
            return null
    },
    setNavMenu (navData) {
        localStorage.setItem(KEY_AUTHSETNAVMENU, JSON.stringify(navData))
    },
    // 设置获取二次绑定的key
    getTwiceToken () {
        return localStorage.getItem(KEY_TWICE_AUTH)
    },
    setTwiceToken (val) {
        return localStorage.setItem(KEY_TWICE_AUTH, val)
    },
    // 设置用户操作权限信息
    setOperation (operationData) {
        localStorage.setItem(KEY_AUTHSETOPERATION, JSON.stringify(operationData))
    },
    getOperation () {
        let str = localStorage.getItem(KEY_AUTHSETOPERATION)
        if (str)
            return JSON.parse(str)
        else
            return null
    },
    // 判断操作是否被授权
    isPermission(op) {
        let ops = this.getOperation()
        if (ops === null) {
            return false
        }
        for (let i = 0; i < ops.length; i++) {
            if (ops[i] === op) {
                return true
            }
        }
        return false
    },
    // 自动更新用户的token
    authRefreshtoken () {
        authUtils.clearAuthRefreshToken()
        firstRefreshTimeoutId = setTimeout(() => {
            authUtils.refreshToken()
        }, 1000 * 10)
        refreshIntervalId = setInterval(() => {
            authUtils.refreshToken()
        }, 1000 * 60 * 20) // 30分钟一请求
    },
    refreshToken () {
        let userinfo = authUtils.getUserInfo()
        if (userinfo && userinfo.id) {
            authApi.refreshToken(userinfo.id).then((ret) => {
                authUtils.setAuthToken(ret.data.token)
            })
        } else {
            if (xmrouter.history.current.name === 'login') { 
                return 
            }
            xmview.showTip('error', message.MESSAGE_AUTH_INVALID)
            // 记录当前的url
            xmrouter.push({ name: 'login', query: { returnUrl: window.location.href } })
        }
    },
    clearAuthRefreshToken () {
        refreshIntervalId && clearInterval(refreshIntervalId)
        firstRefreshTimeoutId && clearTimeout(firstRefreshTimeoutId)
    },
    clearAuthInfo () {
        authUtils.setAuthToken('')
        authUtils.setNavMenu('')
        authUtils.setUserInfo('')
    }
}

export default authUtils
