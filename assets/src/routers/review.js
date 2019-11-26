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
            path: 'manage/add-course-show', // 添加和编辑课程
            name: 'review-manage-addCourseShow',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/AddCourseShow.vue'))
                })
            },
            meta: {
                title: '查看课程',
            }
        },
        {
            path: 'manage/add-course/herbal', // 添加和编辑中草药课程
            name: 'review-manage-addCourse-herbal',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/AddHerbal.vue'))
                })
            },
            meta: {
                title: '添加课程-中草药',
            }
        },
        {
            path: 'manage/add-course/imgtxt', // 添加和编辑中草药课程
            name: 'review-manage-addCourse-imgtxt',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/AddImgtxt.vue'))
                })
            },
            meta: {
                title: '添加课程-图文系列',
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
