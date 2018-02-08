// 我是代理
import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/gov/announce'

class CompanyService {
    // 搜索
    getAnnounceListsData ({
        name = '',  // 关键词：匹配公告名称
        // area = '',     // 负责区域：传 省份名称
        category_id = '', // 类型：
        // status ,   // 状态：-1 全部，0 关联中，1 待确认，2 已拒绝，3 已解除，4 已放弃
        pushabled, 
        page = 1,
        pagesize = 10,
    }) {
        let finalUrl = `${urlPre}/lists`
        return api.get(finalUrl, {
            name,
            // area,
            category_id,
            // status,
            pushabled,
            page,
            pagesize,
        }, false).then((ret) => {
            return ret
        })
    }

    // 获取
    fetchAllCheckData ({
        name,
    }) {
        let finalUrl = `${urlPre}/contacts`
        return api.get(finalUrl,{name}).then((ret) => {
            return ret
        })
    }
    // 获取详情接口
    getAnnounceDetail(val) {
        let finalUrl = `${urlPre}/get/${val}`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    getUploadCategoryImgUrl() { 
        return `${config.apiHost}/common/upload/file`
    }
    
    announceSend({ category_id, name, content, images, sendtime, pushabled, range }) {
        let reqParam = { category_id, name, content, images, sendtime, pushabled, range }
        let url = urlPre + '/send'
        return api.post(url, reqParam).then(ret => {
            if (ret.code == 0) {
                 xmview.showTip('success',ret.message)
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 确认关联
    confirm (company_id) {
        let finalUrl = `${urlPre}/${company_id}/confirm`
        return api.put(finalUrl, {}).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 拒绝关联
    deny (company_id) {
        let finalUrl = `${urlPre}/${company_id}/deny`
        return api.put(finalUrl, {}).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 解除关联，代理商操作解除，要判断是否有计划在投放中
    cancel (company_id) {
        let finalUrl = `${urlPre}/${company_id}/cancel`
        return api.put(finalUrl, {}).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }



     // 获取课程任务模板分列表
    getCategoryTree({ id = '', type, filter = true, pid =-1 , level=-1, pagesize=-1, disabled=-1}) {
        let finalUrl = urlPre + '/category/lists'
        // alert('进入getData')
        return api.get(finalUrl, { id, name, pagesize,disabled}).then((ret) => {
            // console.log(ret)
            return ret
        })
    }

}

export default new CompanyService()
