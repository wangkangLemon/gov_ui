import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/auth/menus'


export default function getMenutree () {
    let url = urlPre
    return api.get(url,{
    }).then(ret => {
        if (ret.code == 0) {
            return ret.data
        } else {
            return Promise.reject(ret)
        }
    })
}

