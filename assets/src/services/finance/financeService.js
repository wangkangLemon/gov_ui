import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/finance'

class FinanceService {
    // 搜索
    search ({
        id = 0,
        keyword = '',
        category = '',
        page = 1,
        pagesize = 10,
    }) {
        let finalUrl = `${urlPre}/search/`
        return api.get(finalUrl, {
            id,
            keyword,
            category,
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

export default new FinanceService()
