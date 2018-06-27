// 医政管理模块
const pathPre = '/server'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/server/Main.vue'))
        })
    },
    children: [
        // // 部门人员查询
        {
            path: 'coursetask/manage',
            name: 'server-coursetask',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/CoursetaskManage.vue'))
                })
            },
            meta: {
                title: '任务列表',
                noback: true
            }
        },
         // 添加修改课程任务
        {
            path: 'coursetask/template/add',
            name: 'server-manage-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/AddCoursetask.vue'))
                })
            },
            meta: {
                title: '添加课程任务',
            }
        },
        {
            // path: 'coursetask/template/edit/:id',
            path: 'coursetask/template/edit',
            name: 'server-manage-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/AddCoursetask.vue'))
                })
            },
            meta: {
                title: '查看课程任务',
            }
        },
        {
            path: 'coursetask/template/add',
            name: 'server-manage-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/AddCoursetask.vue'))
                })
            },
            meta: {
                title: '添加课程任务',
            }
        },
        {
            path: 'manage/add-course', // 添加和编辑课程
            name: 'server-manage-addCourse',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/AddCourse.vue'))
                })
            },
            meta: {
                title: '添加课程-培训',
            }
        },
       {
            path: 'coursetak/template',
            name: 'server-coursetask-template',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/CoursetaskTemplate.vue'))
                })
            },
            meta: {
                title: '模板推荐',
                noback: true
            }
        },
        {
            path: 'coursetak/stat',
            name: 'server-coursetask-stat',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/Stat.vue'))
                })
            },
            meta: {
                title: '任务统计',
                noback: true
            }
        },
        {
            path: 'coursetak/stat/:id/user',
            name: 'server-coursetask-user',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/server/courseTask/User.vue'))
                })
            },
            meta: {
                title: '详细统计-任务标题',
            }
        },
       
    ]
}
