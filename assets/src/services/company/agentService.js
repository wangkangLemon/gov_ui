// 我是代理
import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/company/agent'
const url = config.apiHost + '/company'

class CompanyService {
    // 搜索
    search ({
        keyword = '',  // 关键词：匹配企业名称
        area = '',     // 负责区域：传 省份名称
        category = 'agent', // 类型： self 我是工业，agent 我是代理
        status = -1,   // 状态：-1 全部，0 关联中，1 待确认，2 已拒绝，3 已解除，4 已放弃
        page = 1,
        pagesize = 10,
    }) {
        let finalUrl = `${urlPre}/search/`
        return api.get(finalUrl, {
            keyword,
            area,
            category,
            status,
            page,
            pagesize,
        }, false).then((ret) => {
            return ret.data
        })
    }

    // 获取
    get (id) {
        let finalUrl = `${url}/${id}`
        return api.get(finalUrl).then((ret) => {
            return ret.data
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
