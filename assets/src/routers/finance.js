// 财务模块

const pathPre = '/finance'

export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/finance/Main.vue'))
        })
    },
    children: [
        {
            path: 'order',
            name: 'finance-order',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/finance/Order.vue'))
                })
            },
            meta: {
                title: '订单查询 - 财务管理',
                noback: true
            }
        }
    ]
}
