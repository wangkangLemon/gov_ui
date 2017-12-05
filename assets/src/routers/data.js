// 区块模块
// 角色模块
const pathPre = '/data'
//  角色管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/data/Main.vue'))
        })
    },
    children: [
        {
            path: 'category',
            name: 'data-category',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/category.vue'))
                })
            },
            meta: {
                title: '区块',
                noback: true
            }
        },
        //数据管理
        {
            path: 'testing',
            name: 'data-testing',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/Testing.vue'))
                })
            },
            meta: {
                title: '数据分析 - 成绩管理 ',
                noback: true
            }
        },
        {
            path: 'add',
            name: 'data-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/Form.vue'))
                })
            },
            meta: {
                title: '数据添加',
                noback: false
            }
        },
        {
            path: 'edit/:sys_id',
            name: 'data-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/Form.vue'))
                })
            },
            meta: {
                title: '数据更新',
                noback: false
            }
        },
        //gov登录日志
         {
            path: 'user-loginlog',
            name: 'data-user-loginlog',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/Manage.vue'))
                })
            },
            meta: {
                title: '数据分析 - 登录日志 ',
                noback: true
            }
        },
        //课程观看日志
        {
            path: 'course-history',
            name: 'data-course-history',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/companyStat/Index.vue'))
                })
            },
            meta: {
                title: '数据分析 - 课程观看日志',
                noback: true
            }
        },
        {
            path: 'company/stat/view',
            name: 'data-company-stat-view',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/companyStat/View.vue'))
                })
            },
            meta: {
                title: '趋势',
                noback: true
            }
        },
        //课时记录
        {
            path: 'course-log',
            name: 'data-course-log',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/data/CourseLog.vue'))
                })
            },
            meta: {
                title: '数据分析 - 课时记录',
                noback: true
            }
        },
    ]
}
