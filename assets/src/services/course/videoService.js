// 视频管理
import * as api from '../api'
import config from '../../utils/config'
import authUtils from '../../utils/authUtils'
const urlPre = config.apiHost + '/video'

class VideoService {
    // // 搜索
    search({ status, keyword,  time_start, time_end }) {
        let url = `${urlPre}/lists`
        if (status == null || status === '') {
            status = -1
        }
        return api.get(url, { status, keyword, time_start, time_end }).then((ret) => {
            return ret.data
        })
    }

    // 修改
    update({ id, name, tags, cover, duration }) {
        let url = `${urlPre}/${id}/`
        return api.post(url, { name, tags, cover, duration })
    }

    // 删除
    delete({ id }) {
        let url = `${urlPre}/${id}`
        return api.del(url)
    }

    // 批量删除
    deleteMulty({ id }) {
        let url = `${urlPre}/batchdel`
        return api.post(url, { id })
    }

    // 获取oss的上传token
    getOssToken() {
        let url = `${urlPre}/video/upload`
        return api.get(url, {}).then((ret) => {
            return ret.data
        })
    }

    // 刷新视频状态
    refreshStatus({ id } = {}) {
        let url = `${urlPre}/refresh/aliyun/status`
        return api.post(url, { id })
    }

    // 获取视频预览信息
    getPreviewInfo(id) {
        let url = `${urlPre}/${id}/preview`
        return api.get(url).then((ret) => {
            return ret.data
        })
    }









    //------------------------
    // 获取视频
    //{ gov_id, material_id, title, page, pagesize, create_start, create_end, status }
    getVideo( gov_id, material_id, title, page, pagesize, create_start, create_end, status ) {
        let url = `${urlPre}/lists`
        return api.get(url, gov_id, material_id, title, page, pagesize, create_start, create_end, status ).then((ret) => {
            console.log(ret)
            return ret.data
        })
    }

    // 添加视频
    create({ file_name,  size, gov_id, tags, source_type, source_url }) {
        let url = `${urlPre}/create`
        return api.post(url, { file_name,  size, gov_id, tags, source_type, source_url })
    }

    // 修改视频
    updateVideo({ file_name, gov_id, tags, cover, duration, material_id }) {
        gov_id = gov_id || authUtils.getUserInfo().gov_id
        let url = `${urlPre}/edit/${material_id}`
        return api.post(url, { file_name, gov_id: gov_id, tags, cover, duration })
    }

    // 获取oss的上传token
    getOssToken() {
        let finalUrl = `${config.apiHost}/video/upload`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }

    // 刷新视频状态
    refreshVideoStatus({ companyid, id } = {}) {
        companyid = companyid || authUtils.getUserInfo().company_id
        let finalUrl = `${urlPre}/refresh/${id}`
        return api.post(finalUrl, { id })
    }

    // 获取上传封面的url
    getUploadCoverUrl() {
        return `${urlPre}/cover`
    }

    deleteVideo({ id }) {
        let url = `${urlPre}/video/${id}`
        return api.del(url)
    }

    // 获取视频预览地址
    getVideoPreviewUrl(id) {
        let url = `${urlPre}/get/${id}`
        return api.get(url).then((ret) => {
            return ret.data
        })
    }
    // 审核状态
    auditVideo(form) {
        let finalUrl = `${urlPre}/video/${form.id}/audit`
        return api.post(finalUrl, form)
    }




    
}

export default new VideoService()
