// 我是代理
import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/gov/announce'

class CompanyService {
    // 搜索
    getAnnounceListsData ({
        name = '',  // 关键词：匹配公告名称
        // area = '',     // 负责区域：传 省份名称
        // category = 'agent', // 类型： self 我是工业，agent 我是代理
        // status ,   // 状态：-1 全部，0 关联中，1 待确认，2 已拒绝，3 已解除，4 已放弃
        page = 1,
        pagesize = 10,
    }) {
        let finalUrl = `${urlPre}/lists`
        return api.get(finalUrl, {
            name,
            // area,
            // category,
            // status,
            page,
            pagesize,
        }, false).then((ret) => {
            return ret
        })
    }

    // 获取
    fetchAllCheckData () {
        let finalUrl = `${urlPre}/contacts`
        return api.get(finalUrl).then((ret) => {
            return ret.data
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
    
    announceSend({ title, content, images, sendtime, range }) {
        let reqParam = { title, content, images, sendtime, range }
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
}

export default new CompanyService()
