// 医政管理模块
const pathPre = '/announce'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/announce/Main.vue'))
        })
    },
    children: [
        // // 部门人员查询
        {
            path: 'lists',
            name: 'announce-lists',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/announce/announceLists.vue'))
                })
            },
            meta: {
                title: '公告列表',
                noback: true
            }
        },
        {
            path: 'send',
            name: 'announce-send',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/announce/announceSend.vue'))
                })
            },
            meta: {
                title: '公告发送',
                noback: true
            }
        },
        // {
        //     path: 'contacts',
        //     name: 'announce-contacts',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/announce/announceContacts.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '公告发送',
        //         noback: false
        //     }
        // },
        // {
        //     path: 'edit/:sys_id',
        //     name: 'announce-edit',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/announce/Form.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '设置更新',
        //         noback: false
        //     }
        // },
       
    ]
}
