// 系统模块
// 角色模块
const pathPre = '/role'
//  角色管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/role/Main.vue'))
        })
    },
    children: [
        {
            path: 'admin',
            name: 'role-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/role/Index.vue'))
                })
            },
            meta: {
                title: '系统',
                noback: true
            }
        },
        {
            path: 'add',
            name: 'role-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/role/Form.vue'))
                })
            },
            meta: {
                title: '系统添加',
                noback: false
            }
        },
        {
            path: 'edit/:role_id',
            name: 'role-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/role/Form.vue'))
                })
            },
            meta: {
                title: '系统更新',
                noback: false
            }
        },
    ]
}
