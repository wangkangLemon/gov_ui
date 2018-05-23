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
            path: 'edit/:id',
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
        //权限管理
        {
            path: 'authority',
            name: 'gov-authority',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/Authority.vue'))
                })
            },
            meta: {
                title: '权限管理',
                noback: true
            }
        },
        //资讯管理
        {
            path: 'news',
            name: 'gov-news',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/news/News.vue'))
                })
            },
            meta: {
                title: '资讯管理',
                noback: true
            }
        },
        {
            path: 'news/add', //专家管理表单 -修改
            name: 'gov-news-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/news/NewsForm.vue'))
                })
            },
            meta: {
                title: '资讯新建',
                noback: false
            }
        },
        {
            path: 'news/edit/:id', //专家管理表单 -修改
            name: 'gov-news-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/news/NewsForm.vue'))
                })
            },
            meta: {
                title: '资讯修改',
                noback: false
            }
        },

    ]
}
