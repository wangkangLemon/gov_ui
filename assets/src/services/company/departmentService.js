import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/company/department'

class DepartmentService {
    // 搜索
    search ({
        id = 0,
        company_id = 0,
        keyword = '',
        province = 0,
        city = 0,
        area = 0,
        page = 1,
        pagesize = 10,
    }) {
        let finalUrl = `${urlPre}/search/`
        return api.get(finalUrl, {
            id,
            company_id,
            keyword,
            province,
            city,
            area,
            page,
            pagesize,
        }, false).then((ret) => {
            return ret.data
        })
    }

    // 获取
    get (id) {
        let finalUrl = `${urlPre}/${id}/`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
}

export default new DepartmentService()
