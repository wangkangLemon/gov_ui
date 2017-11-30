import * as types from './mutations'

const actions = {
    // 设置首页网站路径
    setIndexWebpath (store, {main, sub}) {
        store.commit(types.INDEX_SETWEBPATH, {main, sub})
    },
    // 设置导航菜单
    setIndexNavMenu (store, {menu}) {
        store.commit(types.INDEX_SET_NAVMENU, {menu})
    },
    //  设置选中的导航
    setIndexMenuActive (store, url) {
        store.commit(types.INDEX_SET__MENU_ACTIVE, url)
    },
    // 清空列表的筛选条件
    clearFetchParam (store, need) {
        store.commit(types.INDEX_SET__CLEARFETCHPARAM, need)
    },
    // 修改区块列表
    setSecMenu (store, need) {
        store.commit(types.INDEX_SET__SETSECMENU, need)
    },
    //区块列表存储Pid
    savePid(store, need){
        store.commit(types.INDEX_SET__SETSECPID, need)
    },
    //管理员列表存储
    saveUserList(store, need){
        store.commit(types.INDEX_SET__SETUSERLIST, need)
    },
    //课程分类存储id name
    // saveCourseCate(store, need){
    //     store.commit(types.INDEX_SET__SETSAVECOURSECATE, need)
    // }
    
}

export default actions
