// 系统模块
// 管理员模块
const pathPre = '/sys'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/sys/Main.vue'))
        })
    },
    children: [
        {
            path: 'admin',
            name: 'sys-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/Index.vue'))
                })
            },
            meta: {
                title: '系统',
                noback: true
            }
        },
        {
            path: 'admin/add',
            name: 'sys-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/Form.vue'))
                })
            },
            meta: {
                title: '系统添加',
                noback: false
            }
        },
        {
            path: 'edit/:sys_id',
            name: 'sys-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/Form.vue'))
                })
            },
            meta: {
                title: '系统更新',
                noback: false
            }
        },
        //角色组路由导航
        {
            path: 'role',
            name: 'role-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/Index.vue'))
                })
            },
            meta: {
                title: '系统',
                noback: true
            }
        },
        {
            path: 'role/add',
            name: 'role-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/Form.vue'))
                })
            },
            meta: {
                title: '角色组添加',
                noback: false
            }
        },
        {
            path: 'role/edit/:role_id',
            name: 'role-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/Form.vue'))
                })
            },
            meta: {
                title: '角色组更新',
                noback: false
            }
        },
        {
            path: 'role/role_menus/:role_id',
            name: 'role_menus',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/roleMenus.vue'))
                })
            },
            meta: {
                title: '角色组授权菜单',
                noback: false
            }
        },
        {
            path: 'role/role_nodes/:role_id',
            name: 'role_nodes',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/roleNodes.vue'))
                })
            },
            meta: {
                title: '角色组授权节点',
                noback: false
            }
        },
         //菜单管理
        {
            path: 'menu',
            name: 'menu-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/menu/Index.vue'))
                })
            },
            meta: {
                title: '系统',
                noback: true
            }
        },
        {
            path: 'menu/add',
            name: 'menu-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/menu/Form.vue'))
                })
            },
            meta: {
                title: '菜单添加',
                noback: false
            }
        },
        {
            path: 'menu/edit/:sys_id',
            name: 'menu-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/menu/Form.vue'))
                })
            },
            meta: {
                title: '菜单更新',
                noback: false
            }
        }, 
         //节点管理
        {
            path: 'node',
            name: 'node-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/node/Index.vue'))
                })
            },
            meta: {
                title: '系统',
                noback: true
            }
        },
        {
            path: 'node/add',
            name: 'node-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/node/Form.vue'))
                })
            },
            meta: {
                title: '节点添加',
                noback: false
            }
        },
        {
            path: 'node/edit/:sys_id',
            name: 'node-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/node/Form.vue'))
                })
            },
            meta: {
                title: '节点更新',
                noback: false
            }
        }, 

    ]
}
