import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/section/data'

class dataService {
    //拿到区块列表
    fetchData ({pagesize, page}) {
        let url = urlPre + '/lists'
        return api.get(url,{pagesize, page}).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    
    // form拿到默认详情信息
    getAdminInfo(id) {
        let url = `${urlPre}/get/${id}`         //传递的地址的id
        return api.get(url,{},false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建
    create({ id, category_id, ref_type, ref_id, ref_sync, title, image, url, desc, addate, tags, tags_color, sort }) {
        let url1 = urlPre + '/create'
        return api.post(url1, { id, category_id, ref_type, ref_id, ref_sync, title, image, url, desc, addate, tags, tags_color, sort }).then(ret => {
            if (ret.code == 0) {
                 xmview.showTip('success',ret.message)
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 更新
    edit({ id, category_id, ref_type, ref_id, ref_sync, title, image, url, desc, addate, tags, tags_color, sort }) {
        let url1 = `${urlPre}/edit/${id}`
        return api.post(url1, { id, category_id, ref_type, ref_id, ref_sync, title, image, url, desc, addate, tags, tags_color, sort }).then(ret => {
            if (ret.code == 0) {
                 xmview.showTip('success',ret.message)
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

    // 删除
    delete(id) {
        let url = `${urlPre}/delete/${id}`
        return api.get(url, {}).then(ret => {
            if (ret.code == 0) {
                 xmview.showTip('success',ret.message)
                 
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

    // 批量删除管理员
    deleteMulty(ids) {
        let url = `${urlPre}/batchdel`
        return api.put(url, { ids })
    }

    // 批量移动管理员到指定分类
    moveToCategoryMulty({ ids, category_id }) {
        let url = `${urlPre}/batchmove`
        return api.put(url, { ids, category_id })
    }

}
export default new dataService()
