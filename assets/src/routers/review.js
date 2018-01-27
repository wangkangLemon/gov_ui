// 医政管理模块
const pathPre = '/review'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/review/Main.vue'))
        })
    },
    children: [
        // // 部门人员查询
        {
            path: 'course',
            name: 'review-video',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/review/ReviewCourse.vue'))
                })
            },
            meta: {
                title: '课程审核',
                noback: true
            }
        },

        {
            path: 'manage/add-course', // 添加和编辑课程
            name: 'review-manage-addCourse',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/AddCourse.vue'))
                })
            },
            meta: {
                title: '添加课程-培训',
            }
        },
        // {
        //     path: 'send',
        //     name: 'review-send',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/review/announceSend.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '公告发送',
        //         noback: false
        //     }
        // },
        // {
        //     path: 'contacts',
        //     name: 'review-contacts',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/review/announceContacts.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '公告发送',
        //         noback: false
        //     }
        // },
        // {
        //     path: 'edit/:sys_id',
        //     name: 'review-edit',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/review/Form.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '设置更新',
        //         noback: false
        //     }
        // },
       
    ]
}
