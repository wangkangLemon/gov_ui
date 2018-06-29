import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/course/task'

class sysService {
    // 课程任务
    getCourseTaskList (param) {
        let finalUrl = urlPre + '/lists'
        return api.get(finalUrl, param).then((ret) => {
            return ret
        })
    }
    // submitTask (taskData) {
    //     // taskData.object = JSON.stringify(taskData.object)
    //     let finalUrl = `${urlPre}`+'/create'
    //     return api.post(finalUrl, taskData).then(ret => {
    //         if (ret.code) {
    //             return Promise.reject(ret)
    //         }
    //     })
    // }
    submitTask({
        title= void 0,          // 标题
        image= void 0,        // 图片地址
        description= void 0,  // 简介
        // sort= void 0,         // 排序
        course_ids= void 0,     // 课程
        gov_ids= void 0,     // 部门
        user_ids= void 0,     // 用户
        score= 0,     // 可获得学分
        type=void 0,       // 任务类型
        stime='',
        etime='',
        task_type,
        exam_id

    }) {
        let finalUrl =`${urlPre}`+'/create'
        return api.post(finalUrl, {
            title,
            image,
            description,
            // sort,
            course_ids,
            gov_ids,
            user_ids,
            score,
            type,
            stime,
            etime,
            task_type,
            exam_id
            
        }, false).then((ret) => {
            return ret
        })
    }
     editTask({
        id,
        title= void 0,          // 标题
        image= void 0,        // 图片地址
        description= void 0,  // 简介
        // sort= void 0,         // 排序
        course_ids= void 0,     // 课程
        gov_ids= void 0,     // 部门
        user_ids= void 0,     // 用户
        score= 0,     // 可获得学分
        type=void 0,       // 任务类型
        stime='',
        etime='',
        task_type
    }) {
        let finalUrl = `${urlPre}/edit/${id}`
        return api.post(finalUrl, {
            title,
            image,
            description,
            // sort,
            course_ids,
            gov_ids,
            user_ids,
            score,
            type,
            stime,
            etime,
            task_type
            
        }, false).then((ret) => {
            return ret
        })
    }


    getTask (task_id) {
        // taskData.object = JSON.stringify(taskData.object)
        let finalUrl = `${urlPre}/get/${task_id}`
        return api.get(finalUrl, ).then((ret) => {
            return ret
        })
    }
    // 删除课程任务模板
    deleteCourseTask(task_id) {
        let finalUrl = `${urlPre}/delete/${task_id}`
        return api.post(finalUrl, {})
    }
    
    // 编辑时获取文章内容
    getCourseTaskTemplateEditDetail (id) {
        let finalUrl = urlPre + '/template/get/' + id
        return api.get(finalUrl, {}).then((ret) => {
            return ret
        })
    }

    // 课程任务模板管理
    getCourseTaskTemplateList (param) {
        let finalUrl = urlPre + '/template/lists'
        return api.get(finalUrl, param).then((ret) => {
            return ret
        })
    }

    // 获取课程任务模板上传图片url
    CourseTaskTemplateUploadUrl ({avatar, alias}) {
        let url = urlPre + `/template/cover`
        return api.post(url, {avatar, alias})
    }

    // 创建课程任务模板 /create
    addCourseTaskTemplate ({category_id, title, description, image, course_ids, sort, score}) {
        let finalUrl = urlPre + `/template/create`
        return api.post(finalUrl, {category_id, title, description, image, course_ids, sort, score}).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 更新课程任务模板
    updateCourseTaskTemplate ({id,category_id, title, description, image, course_ids, sort, score}) {
        let finalUrl = urlPre + `/template/edit/${id}`
        return api.post(finalUrl, {category_id, title, description, image, course_ids, sort, score }).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 删除课程任务模板
    deleteCourseTaskTemplate (task_id) {
        let finalUrl = urlPre + `/template/delete/${task_id}`
        return api.post(finalUrl, {})
    }

    // 上线课程任务模板
    publishCourseTaskTemplate (task_id) {
        let finalUrl = urlPre + `/template/${task_id}/publish`
        return api.post(finalUrl, {})
    }

    // 下线课程任务模板
    revokeCourseTaskTemplate (task_id) {
        let finalUrl = urlPre + `/template/${task_id}/revoke`
        return api.post(finalUrl, {})
    }

 // 获取课程任务模板分列表
    getCategoryTree({ id , type, task_type,pagesize=-1}) {
        let finalUrl = urlPre + '/template/category/lists'
        // alert('进入getData')
        return api.get(finalUrl, { id, type, task_type,pagesize}).then((ret) => {
            // console.log(ret)
            return ret
        })
    }

    // 创建分类
    // createCategory ({parent_id, name, image, sort}) {
    //     let finalUrl = urlPre + `/template/category`
    //     let reqParam = {parent_id, name, image, sort}
    //     if (parent_id === 0) delete reqParam['parent_id']
    //     return api.post(finalUrl, reqParam)
    // }
    
    create_cate ({parent_id, name, image, sort}) {
        let finalUrl = urlPre + `/template/category/create`
        let reqParam = { name, sort}
        // if (parent_id === 0) delete reqParam['parent_id']
        return api.post(finalUrl, reqParam)
    }

    // 修改分类
    update_cate ({name, image, sort, id}) {
        let finalUrl = urlPre + `/template/category/edit/${id}`
        return api.post(finalUrl, {name, sort})
    }

    // 删除分类
    delCategory ({id}) {
        let finalUrl = urlPre + `/template/category/delete/${id}`
        return api.post(finalUrl).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // 获取分类上传图片地址
    getCategoryImageUrl () {
        let finalUrl = urlPre + `/template/category/image`
        return finalUrl
    }

    // 移动分类
    moveCategory ({id, to}) {
        let finalUrl = urlPre + `/template/category/${id}/move`
        return api.post(finalUrl, {to})
    }

    // 移动分类内容
    moveCategoryContent ({id, to}) {
        let finalUrl = urlPre + `/template/category/${id}/move/content`
        return api.post(finalUrl, {to})
    }

    // 禁用管理员
    offline({id, disabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { disabled})
    }

    // 启用管理员
    online({id, disabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { disabled })
    }

    // 获取添加编辑课程上传图片的url
    getUploadUrl({image, alias}) {
        let url = `${urlPre}/upload`
        return api.post(url, {image, alias}).then((ret) => {
            return ret.data
        })
    }
    //课程任务数据报表
    getTaskStat({type,title,page,pagesize}){
         let finalUrl = urlPre + '/stat/lists' 
        return api.get(finalUrl, {type,title,page,pagesize}).then((ret) => {
            return ret
        })
    }
    //单条课程任务明细数据报表
    getTaskStatDetail({id, page, pagesize, name, status}){
        let finalUrl = `${urlPre}/stat/${id}/user`
        return api.get(finalUrl, {page, pagesize, name, status}).then((ret) => {
            return ret
        })
    }

}
export default new sysService()
