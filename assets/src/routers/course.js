// 培训模块
const pathPre = '/course'
//  培训管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/course/Main.vue'))
        })
    },
    children: [{
            path: 'category',//栏目主页此栏目已废 -更新为manage/course-category-manage
            name: 'course-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/category/Index.vue'))
                })
            },
            meta: {
                title: '课程种类',
                noback: true
            }
        },
        {
            path: 'cate-add',  //栏目添加
            name: 'cate-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/category/Form.vue'))
                })
            },
            meta: {
                title: '课程种类添加',
                noback: false
            }
        },
        {
            path: 'cate-edit/:course_id',  //栏目编辑
            name: 'cate-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/category/Form.vue'))
                })
            },
            meta: {
                title: '课程种类更新',
                noback: false
            }
        },
        {
            path: 'video', // 视频管理
            name: 'course-video',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/Video.vue'))
                })
            },
            meta: {
                title: '视频管理 - 培训',
                noback: true
            }
        },
        {
            path: 'video/add',//视频添加
            name: 'course-video-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/video/Add.vue'))
                })
            },
            meta: {
                title: '添加视频 - 培训',
            }
        },
        {
            path: 'manage/public', // 公开课管理
            name: 'course-manage-public',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/Public.vue'))
                })
            },
            meta: {
                title: '公开课 - 课程管理',
                noback: true
            }
        },
        {
            path: 'manage/add-course', // 添加和编辑课程
            name: 'course-manage-addCourse',
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
            path: 'manage/course-category-manage', // 栏目管理
            name: 'course-manage-course-category-manage',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/CategoryManage.vue'))
                })
            },
            meta: {
                title: '栏目管理-培训',
            }
        },
        {
            path: 'manage/course-answer-analysis/:id', // 答案分析
            name: 'course-manage-course-answer-analysis',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/course/manage/AnswerAnalysis.vue'))
                })
            },
            meta: {
                title: '课程题目分析',
            }
        },
      
    ]
}