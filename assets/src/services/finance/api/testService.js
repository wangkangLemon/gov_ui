import * as api from '../api'
import config from '../../utils/config'
const host = config.apiHost

export function getCitys () {
    let url = host + '/api/city'
    return api.get(url, {code: 110000})
}
