import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/gov'

class sysService {
    //拿到数据 
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

    
    // 搜索
    getAdminInfo(id) {
        let url = `${urlPre}/view/${id}`         //传递的地址的id
        return api.get(url,{},false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建
    create({ role_id, name, mobile, email, password }) {
        let url = urlPre + '/create'
        return api.post(url, { role_id, name, mobile, email, password }).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 更新
    update({ id, role_id, name, mobile, email, password, sex, avatar, address }) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, { role_id, name, mobile, email, password, sex, avatar, address }).then(ret => {
            if (ret.code) {
                console.log('update()')
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
    offline({id, role_id, name, mobile, email, password, sex, avatar, address ,disabled}) {
        let url = `${urlPre}/update/${id}`
        console.log('进入offline(id)')
        return api.post(url, { id, role_id, name, mobile, email, password, sex, avatar, address ,disabled})
    }

    // 启用管理员
    online(id) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, { disabled: 0 })
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
