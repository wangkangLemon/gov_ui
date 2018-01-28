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
                title: '课程任务',
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
       
       
    ]
}
