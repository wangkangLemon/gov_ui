/**
 * Created by zhaoyicheng on 2017/11/20
 */
import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/sys/department'

class DepartmentService {
    // 获取部门列表
    getDepartment ({
        page = '',
        page_size = '',
        company_id = '',
        province = '',
        city = '',
        area = '',
        keyword = '',
        concact = '',
        time_start = '',
        time_end = ''}) {
        let finalUrl = `${urlPre}/lists`
        return api.get(finalUrl, {page, page_size, company_id, province, city, area, keyword, concact, time_start, time_end}, false).then((ret) => {
            return ret.data
        })
    }
    
    //   // 课程搜索
    // search_cate({ id, name, category_type, pid, level, ended, disabled, page, pagesize}) {
    //     let url = urlPre + '/category/lists'
    //     return api.get(url, { id, name, category_type, pid, level, ended, disabled, page, pagesize }, false).then(ret => {
    //         if (ret.code == 0) {
    //             // console.log(ret)
    //             return ret.data
    //         } else {
    //             return Promise.reject(ret)
    //         }
    //     })
    // }

    // 获取详情接口
    getDepInfo (val) {
        let finalUrl = `${urlPre}/${val}`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 删除部门
    depDelete(userID) {
        let finalUrl = `${urlPre}/${userID}`
        return api.get(finalUrl, {}).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    exportDepartment (reqObj) {
        let finalUrl = `${urlPre}/search`
        api.downLoad(finalUrl, Object.assign(reqObj, {export: 1}), 'department.xls')
    }
}
export default new DepartmentService()
