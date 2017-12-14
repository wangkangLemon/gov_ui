import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost
const urlPre1 = config.apiHost

class govService {

    // category - 0-企业 1-工业 2-连锁 
    getSelectList({
        id = '',
        name = '',
        category = '',
        pagesize = '',
        page = '',
        pid = '',
        province_id = '',
        city_id = '',
        area_id = '',
        town_id = '',
        village_id = '',
        deleted = '',
    }) {
        let finalUrl = urlPre + '/gov/lists'
        return api.get(finalUrl, {
            id,
            name,
            category,
            page,
            pagesize,
            pid,
            province_id,
            city_id,
            area_id,
            town_id,
            village_id,
            deleted,
        }, false).then((ret) => {
            return ret.data
        })
    }
    // gov - list
    getGovSelectList({
        // id = '',
        // name = '',
        // category = '',
        // pagesize = '',
        // page = '',
        // pid = '',
        // province_id = '',
        // city_id = '',
        // area_id = '',
        // town_id = '',
        // village_id = '',
        // deleted = '',
    }) {
        let finalUrl = urlPre + '/gov/lists'
        return api.get(finalUrl, {
            // id,
            // name,
            // category,
            // page,
            // pagesize,
            // pid,
            // province_id,
            // city_id,
            // area_id,
            // town_id,
            // village_id,
            // deleted,
        }, false).then((ret) => {
            alert(22)
            return ret.data
        })
    }

    // category - 0-企业 1-工业 2-连锁 
    postSelectList({
        id = '',
        name = '',
        category = '',
        pagesize = '',
        page = '',
        pid = '',
        province_id = '',
        city_id = '',
        area_id = '',
        town_id = '',
        village_id = '',
        deleted = '',
    }) {
        let finalUrl = urlPre + '/gov/lists'
        return api.post(finalUrl, {
            id,
            name,
            category,
            page,
            pagesize,
            pid,
            province_id,
            city_id,
            area_id,
            town_id,
            village_id,
            deleted,
        }, false).then((ret) => {
            return ret.data
        })
    }

    // 获取详情接口
    getGovInfo(val) {
        let finalUrl = `${urlPre}/gov/get/${val}`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }

    // 添加企业
    addGov({
        category,
        pid,
        province_id,
        city_id,
        area_id,
        town_id,
        village_id,
        name,
        concact,
        mobile,
        email,
        mobile_title,
        tel,
        zip,
        fax,
        url,
        address,
        description,
    }) {
        let finalUrl = urlPre + '/gov/create'
        return api.post(finalUrl, {
            category,
            pid,
            province_id,
            city_id,
            area_id,
            town_id,
            village_id,
            name,
            concact,
            mobile,
            email,
            mobile_title,
            tel,
            zip,
            fax,
            url,
            address,
            description,
        }).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 修改企业信息
    editGov(val) {
        let finalUrl = `${urlPre}/gov/edit/${val}`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }

    // 更新企业信息
    updateGov({
        gov_id,
        category,
        pid,
        province_id,
        city_id,
        area_id,
        town_id,
        village_id,
        name,
        concact,
        mobile,
        email,
        mobile_title,
        tel,
        zip,
        fax,
        url,
        address,
        description,
    }) {
        let finalUrl = `${urlPre}/gov/edit/${gov_id}`
        return api.post(finalUrl, {
            category,
            pid,
            province_id,
            city_id,
            area_id,
            town_id,
            village_id,
            name,
            concact,
            mobile,
            email,
            mobile_title,
            tel,
            zip,
            fax,
            url,
            address,
            description,
        }).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 企业管理员查询接口
    govAdminList({
        name,
        gov_id,
        page,
        pagesize,
        role_id
    }) {
        let finalUrl = `${urlPre1}/user/lists`
        return api.get(finalUrl, {
            name,
            gov_id,
            page,
            pagesize,
            role_id
        }).then((ret) => {
            return ret.data
        })
    }
    // 企业管理员查询接口
    govAdmin({
        name,
        gov_id,
        page,
        pagesize
    }) {
        let finalUrl = `${urlPre1}/user/get/${gov_id}`
        return api.get(finalUrl, {
            name,
            page,
            pagesize
        }).then((ret) => {
            return ret.data
        })
    }

    // 新增管理员
    addGovAdmin({
        name,
        sex,
        mobile,
        passwd,
        // birthday,
        // address,
        gov_id,
        role_id,
        area_id,
        nickname
    }) {
        let finalUrl = `${urlPre1}/user/create`
        return api.post(finalUrl, {
            name,
            sex,
            mobile,
            passwd,
            // birthday,
            // address,
            gov_id,
            role_id,
            area_id,
            nickname
        }).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 删除管理员接口
    delAdmin({
        id
    }) {
        let finalUrl = `${urlPre}/user/delete/${id}`
        return api.get(finalUrl)
    }


    // 获取成绩管理统计列表
    getGovTestingData({
        page,
        pagesize,
        gov_id,
        course_id,
        date_start = '',
        date_end = '',
    }) {
        let finalUrl = `${urlPre}/testing/lists`
        return api.get(finalUrl, {
            page,
            pagesize,
            gov_id,
            course_id,
            date_start,
            date_end
        }).then((ret) => {
            return ret.data
        })
    }

    // 获取课程任务统计数据
    getCompanyAppCourseTaskDetail({
        gov_id,
        department_id,
        type,
    }) {
        let finalUrl = `${urlPre}/app/coursetask/detail`
        return api.get(finalUrl, {
            gov_id,
            department_id,
            type
        }).then((ret) => {
            return ret.data
        })
    }

    //--------------------------------------------------logo----------------------------------------------------------

    // 上传企业logo
    CompanyLogoUpload({
        gov_id,
        image,
        alias
    }) {
        let finalUrl = `${config.apiHost}/app/setting`
        return api.post(finalUrl, {
            image,
            alias
        }).then((ret) => {
            return ret.data
        })
    }

    // 获取企业logo
    // getCompanyLogo ({gov_id}) {
    //     let finalUrl = `${config.apiHost}/com/${gov_id}/mobile/logo`
    //     return api.get(finalUrl).then((ret) => {
    //         return ret.data
    //     })
    // }

    getCompanyLogo({
        gov_id
    }) {
        let finalUrl = `${urlPre}/app/setting`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }

    // 设置企业logo
    setCompanyLogo({
        gov_id,
        logo
    }) {
        let finalUrl = `${config.apiHost}/app/setting`
        return api.post(finalUrl, {
            logo
        })
    }

    //----------------------------------------------gov登录日志---------------------------------------------------------------------------------

    // 管理员综合统计情况
    getCompanyManageStat() {
        let finalUrl = `${urlPre}/user/loginlog/lists`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 管理员活跃情况
    getCompanyManage({
        page,
        pagesize,
        name = '',
        user_name = '',
        gov_id,
        role_id = '',
        date_start = '',
        date_end = '',
    }) {
        let finalUrl = `${urlPre}/user/loginlog/lists`
        return api.get(finalUrl, {
            page,
            pagesize,
            name,
            user_name,
            gov_id,
            role_id,
            date_start,
            date_end
        }).then((ret) => {
            return ret.data
        })
    }
    //------------------------------------------------课程观看日志---------------------------------------------------------------------------
    // // 企业活跃情况
    // getCourseHistory ({
    //                   page,
    //                   pagesize,
    //                   gov_id,
    //                   stat_date,
    //               }) {
    //     let finalUrl = `${urlPre}/course/history/lists`
    //     alert(2222)
    //     return api.get(finalUrl, {page, pagesize, gov_id, stat_date}).then((ret) => {
    //         return ret.data
    //     })
    // }

    // 课程观看情况 详细内容
    getCourseHistory({
        page,
        pagesize,
        user_id,
        gov_id,
        category_id,
        course_id,
        date_start,
        date_end,
    }) {
        let finalUrl = `${urlPre}/course/history/lists`
        return api.get(finalUrl, {
            page,
            pagesize,
            user_id,
            gov_id,
            category_id,
            course_id,
            date_start,
            date_end,
        }).then((ret) => {
            return ret.data
        })
    }

    // 企业活跃情况 图表信息
    getCompanyStatChart({
        gov_id,
        date_start,
        date_end,
    }) {
        let finalUrl = `${urlPre}/stat/chart`
        return api.get(finalUrl, {
            gov_id,
            date_start,
            date_end
        }).then((ret) => {
            return ret.data
        })
    }

    //拿到数据 
    a({
        pagesize,
        page
    }) {
        let url = urlPre + '/lists'
        return api.get(url, {
            pagesize,
            page
        }).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }


    // 搜索
    getAdminInfo(id) {
        let url = `${urlPre}/view/${id}` //传递的地址的id
        return api.get(url, {}, false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建
    create({
        role_id,
        name,
        mobile,
        email,
        password
    }) {
        let url = urlPre + '/create'
        return api.post(url, {
            role_id,
            name,
            mobile,
            email,
            password
        }).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 更新
    update({
        id,
        role_id,
        name,
        mobile,
        email,
        password,
        sex,
        avatar,
        address
    }) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, {
            role_id,
            name,
            mobile,
            email,
            password,
            sex,
            avatar,
            address
        }).then(ret => {
            if (ret.code) {
                console.log('update()')
                return Promise.reject(ret)
            }
        })
    }

    // 删除 GOV部门
    deleteGov(id) {
        let url = `${urlPre}/gov/delete/${id}`
        // console.log(url)
        return api.get(url, {}).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 删除
    delete(id) {
        let url = `${urlPre}/delete/${id}`
        // console.log(url)
        return api.get(url, {}).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 批量删除管理员
    deleteMulty(ids) {
        let url = `${urlPre}/batchdel`
        return api.post(url, {
            ids
        })
    }

    // 批量移动管理员到指定分类
    moveToCategoryMulty({
        ids,
        category_id
    }) {
        let url = `${urlPre}/batchmove`
        return api.post(url, {
            ids,
            category_id
        })
    }

    // 设置管理员
    setLesson({
        id,
        data
    }) {
        let url = `${urlPre}/${id}/setlesson`
        return api.post(url, data).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 禁用管理员
    offline({
        id,
        role_id,
        name,
        mobile,
        email,
        password,
        sex,
        avatar,
        address,
        disabled
    }) {
        let url = `${urlPre}/update/${id}`
        console.log('进入offline(id)')
        return api.post(url, {
            id,
            role_id,
            name,
            mobile,
            email,
            password,
            sex,
            avatar,
            address,
            disabled
        })
    }

    // 启用管理员
    online(id) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, {
            disabled: 0
        })
    }

    // 获取添加编辑课程上传图片的url
    getUploadUrl({
        image,
        alias
    }) {
        let url = `${urlPre}/upload`
        return api.post(url, {
            image,
            alias
        }).then((ret) => {
            return ret.data
        })
    }
}
export default new govService()