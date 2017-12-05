// 医政管理模块
const pathPre = '/medical'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/gov/Main.vue'))
        })
    },
    children: [
        //
        {
            path: 'gov',
            name: 'gov-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/Gov.vue'))
                })
            },
            meta: {
                title: '医政 - 部门',
                noback: true
            }
        },
        {
            path: 'gov/add',
            name: 'gov-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/GovOperate.vue'))
                })
            },
            meta: {
                title: '医政添加',
                noback: false
            }
        },
        {
            path: 'edit/:gov_id',
            name: 'gov-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/GovOperate.vue'))
                })
            },
            meta: {
                title: '医政更新',
                noback: false
            }
        },
        // 管理员
        {
            path: 'user/:gov_id',
            name: 'gov-admin',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/Admin.vue'))
                })
            },
            meta: {
                title: '管理员',
            }
        },

        //  // 人员
        // {
        //     path: 'user/:gov_id',
        //     name: 'gov-person',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/gov/Person.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '管理员',
        //     }
        // },
        
        // // 部门人员查询
        {
            path: 'user',
            name: 'user-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/Index.vue'))
                })
            },
            meta: {
                title: '医政 - 人员',
                noback: true
            }
        },
        // {
        //     path: 'user/add',
        //     name: 'user-add',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/gov/user/Form.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '角色组添加',
        //         noback: false
        //     }
        // },
        
        //编辑管理员
        {
            path: 'user/edit/:user_id',
            name: 'user-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/Form.vue'))
                })
            },
            meta: {
                title: '管理员修改',
                noback: false
            }
        },
         //新建人员
        {
            path: 'person/edit/:user_id',
            name: 'person-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/personForm.vue'))
                })
            },
            meta: {
                title: '人员新建',
                noback: false
            }
        },
        //编辑人员
        {
            path: 'person/edit/:user_id',
            name: 'person-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/personForm.vue'))
                })
            },
            meta: {
                title: '人员修改',
                noback: false
            }
        },
    ]
}
