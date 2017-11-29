import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost

class AnalyticsService {
    // 导出查询
    getExportList ({
        page,
        pagesize,
        status = '',
        time_start = '',
        time_end = ''
    }) {
        let finalUrl = `${urlPre}/export/search`
        return api.get(finalUrl, {page, pagesize, status, time_start, time_end}).then((ret) => {
            return ret.data
        })
    }

    // 下载接口
    exportDownload ({job_id, name}) {
        let finalUrl = `${urlPre}/export/${job_id}/download`
        return api.downLoad(finalUrl, {}, `${name}.xls`)
    }
}

export default new AnalyticsService()
