// 文档管理
import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/course/doc'

class DocService {
    getDocList({ page, pagesize, keyword, file_type, time_start, time_end }) {
        let url = `${urlPre}/search`
        return api.get(url, { page, pagesize, keyword, file_type, time_start, time_end }).then((ret) => {
            return ret.data
        })
    }

    deleteDoc(id) {
        let url = `${urlPre}/${id}`
        return api.del(url)
    }

    // 批量删除
    deleteDocMulty({ ids }) {
        let url = `${urlPre}/batchdel`
        return api.del(url, { ids: ids.join(',') })
    }

    // 查看文档
    readDoc(id) {
        let url = `${urlPre}/${id}/view`
        return api.get(url)
    }

    // 下载文档
    downloadDoc({ id, name }) {
        let url = `${urlPre}/${id}/download`
        return api.downLoad(url, {}, name)
    }

    // 查询状态
    refreshDoc(id) {
        let url = `${urlPre}/${id}/refresh`
        return api.get(url)
    }

    // 重试转码
    retryDoc(id) {
        let url = `${urlPre}/${id}/retry`
        return api.get(url)
    }

    // 获取文档上传url
    getDocUploadUrl({ companyid } = {}) {
        return `${urlPre}/upload`
    }

    // 获取文档替换的上传url
    getReplaceDocUploadUrl(id) {
        return `${urlPre}/${id}/replace`
    }
}

export default new DocService()
