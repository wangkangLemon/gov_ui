import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/news'

class FinanceService {
    // 资讯管理
    // 资讯获取
    getProduct(id) {
        let url = `${urlPre}/get/${id}`         //传递的地址的id
        return api.get(url).then(ret => {
            return ret.data
        })
    }
    // 资讯列表
    fetchProductList(params) {
        let url = urlPre + '/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 资讯创建
    createProduct(fetchParam) {
        let url = urlPre + '/create'
        return api.post(url, fetchParam).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 资讯更新
    editProduct(fetchParam, id) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, fetchParam).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 资讯删除
    deleteProduct(id) {
        let url = `${urlPre}/delete/${id}`
        return api.post(url, {}).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
}

export default new FinanceService()
