import * as api from '../api'
import config from '../../utils/config'
import authUtils from '../../utils/authUtils'
const urlPre = config.apiHost + '/auth'

export function login (username, password) {
    let url = urlPre + '/login'
    return api.post(url, {username, password}, true).then(ret => {
        if (ret.code == 0) {
            return ret
        } else {
            xmview.showTip('error', ret.message)
            return Promise.reject(ret)
        }
    })
}

// 刷新token
export function refreshToken (userid) {
    let url = urlPre + '/refresh'
    return api.get(url, {id: userid}).catch((e) => {
        e.tipCom && e.tipCom.close()
    })
}

// 登出
export function loginout () {
    authUtils.setAuthToken(null)
}
