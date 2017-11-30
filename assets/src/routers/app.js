// 区块模块
// 角色模块
const pathPre = '/app'
//  角色管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/app/Main.vue'))
        })
    },
    children: [
        //列表管理
        {
            path: 'setting',
            name: 'app-list',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/app/Index.vue'))
                })
            },
            meta: {
                title: '手机客户端-部门LOGO',
                noback: true
            }
        },
        {
            path: 'boot',
            name: 'app-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/app/Boot.vue'))
                })
            },
            meta: {
                title: '手机客户端-启动图',
                noback: true
            }
        },
       
    ]
}
