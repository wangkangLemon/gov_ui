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
    getchart(chartParam){
        let finalUrl = `${config.apiHost}/report/dashboard/area/linechart`
        return api.get(finalUrl, chartParam).then((ret) => {
            console.log(JSON.stringify(ret));
            return ret
        })
    }
    getUserlearn(chartParam){
        console.log(chartParam)
        let finalUrl = `${config.apiHost}/report/userlearn/lists`
        return api.get(finalUrl, chartParam).then((ret) => {
            return ret
        })
    }
    getUsertesting(chartParam) {
        console.log(chartParam)
        let finalUrl = `${config.apiHost}/report/usertesting/lists`
        return api.get(finalUrl, chartParam).then((ret) => {
            return ret
        })
    }
}
export default new MainService()
