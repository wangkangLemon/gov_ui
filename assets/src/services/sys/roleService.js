import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/role'
const urlPre_menu = config.apiHost + '/role_menus'
const urlPre_node = config.apiHost + '/role_nodes'

class sysService {
    //拿到数据 
    fetchData () {
        let url = urlPre + '/lists'
        return api.get(url,{
        }).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    
    // 根据ID显示
    getAdminInfo(id) {
        let url = `${urlPre}/view/${id}`         //传递的地址的id
        return api.get(url,{},false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建
    create({ role_name}) {
        let url = urlPre + '/create'
        return api.post(url, {role_name}).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success',ret.message)
                return ret.data
            } else {
                console.log(url)
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

    // 更新
    update({ role_name,id }) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, { role_name }).then(ret => {
            if (!ret.code) {
                 xmview.showTip('success',ret.message)  
            }else {
                console.log(url)
                xmview.showTip('error',ret.message)
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
        return api.put(url, { ids })
    }

    // 批量移动管理员到指定分类
    moveToCategoryMulty({ ids, category_id }) {
        let url = `${urlPre}/batchmove`
        return api.put(url, { ids, category_id })
    }

    // 设置管理员
    setLesson({ id, data }) {
        let url = `${urlPre}/${id}/setlesson`
        return api.put(url, data).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

    // // 禁用管理员
    // offline(id) {
    //     let url = `${urlPre}/update/${id}`
    //     console.log('进入offline(id)')
    //     return api.post(url, {})
    // }

    // // 启用管理员
    // online(id) {
    //     let url = `${urlPre}/update/${id}`
    //     return api.post(url, {})
    // }

     // 禁用管理员
    offline(role_name, id, disabled) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, {role_name, disabled})
    }

    // 启用管理员
    online(role_name, id, disabled) {
        let url = `${urlPre}/update/${id}`
        return api.post(url, {role_name, disabled})
    }


    //分配权限---------------------------

    //菜单
    //拿到数据 
    fetchDataM ( {id, pagesize}) {
        let url = urlPre_menu + '/lists'
        return api.get(url,{ role_id : id, pagesize
        }).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 创建
    createM(id, ids) {
        let url = urlPre_menu + '/create_multi'
        return api.post(url, { role_id:id , menu_ids:ids }).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success',ret.message)
                return ret.data
            } else {
                console.log(url)
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

    //节点
    //拿到数据 
    fetchDataN ( id ) {
        let url = urlPre_node + '/lists'
        console.log(url)
        return api.get(url,{ role_id : id
        }).then(ret => {
            if (ret.code == 0) {
                console.log( ret)
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 创建
    createN(id, ids) {
        let url = urlPre_node + '/create_multi'
        return api.post(url, { role_id:id , menu_ids:ids }).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success',ret.message)
                return ret.data
            } else {
                console.log(url)
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }



     // 删除 - 根据添加授权 请求role_id 和 menu_id 产生的 id来删除
    deleteImp(id) {
        let url = `${urlPre_menu}/delete/${id}`
        // console.log(url)
        return api.get(url, {}).then(ret => {
            if (ret.code==0) {
                xmview.showTip('success',ret.message)
                return ret.data
            }else {
                console.log(url)
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }


}
export default new sysService()
