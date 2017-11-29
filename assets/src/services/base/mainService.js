import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/dashboard'

class MainService {
    // 主页接口
    getMain () {
        return api.get(urlPre).then((ret) => {
            return ret.data
        })
    }
}
export default new MainService()
