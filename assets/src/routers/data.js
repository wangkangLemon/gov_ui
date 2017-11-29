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
                title: '数据分析',
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
    ]
}
