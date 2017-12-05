import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/user'

class sysService {
    //拿到数据 
    fetchData ({pagesize, page, name, mobile, role_id}) {
        let url = urlPre + '/lists'
        return api.get(url,{pagesize, page, name, mobile, role_id}).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    
    // 搜索
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
    create({ role_id, area_id, gov_id, name, mobile, email, password }) {
        let url = urlPre + '/create'
        return api.post(url, { role_id, area_id, gov_id, name, mobile, email, password }).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 更新
    update({ id, role_id, avatar, password, area_id, gov_id, name, nickname, mobile, email, sex, address }) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { role_id, avatar, password, area_id, gov_id, name, nickname, mobile, email, sex, address }).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 删除
    delete(id) {
        let url = `${urlPre}/delete/${id}`
        // console.log(url)
        return api.get(url, {}).then(ret => {
            if (ret.code) {
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

    // 设置管理员
    setLesson({ id, data }) {
        let url = `${urlPre}/${id}/setlesson`
        return api.put(url, data).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 禁用管理员
    offline({id, disabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { disabled})
    }

    // 启用管理员
    online({id, disabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { disabled })
    }

    // 获取添加编辑课程上传图片的url
    getUploadUrl({image, alias}) {
        let url = `${urlPre}/upload`
        return api.post(url, {image, alias}).then((ret) => {
            return ret.data
        })
    }

}
export default new sysService()
