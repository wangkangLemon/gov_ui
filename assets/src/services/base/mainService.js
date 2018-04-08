import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost 

class MainService {
    // 主页接口
    getMain () {
        // let finalUrl = `${config.apiHost}/course/category/${id}/move`
        let finalUrl = `${config.apiHost}/report/dashboard/area`
        return api.get(finalUrl).then((ret) => {
            return ret
        })
    }
    getUserlearn(){
        let finalUrl = `${config.apiHost}/report/userlearn/lists`
        return api.get(finalUrl).then((ret) => {
            return ret
        })
    }
    getUsertesting() {
        let finalUrl = `${config.apiHost}/report/usertesting/lists`
        return api.get(finalUrl).then((ret) => {
            return ret
        })
    }
}
export default new MainService()
