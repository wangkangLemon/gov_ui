import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import action from './store/actions'
import medical from './routers/medical'        // 医政模块
import data from './routers/data'              // 数据分析模块
import base from './routers/base'              // 基础模块
import app from './routers/app'                // 设置模块
import announce from './routers/announce'      // 公告模块
import review from './routers/review'      // 审核模块

// import course from './routers/course'          // 培训模块
// import finance from './routers/finance'        // 财务模块
// import company from './routers/company'        // 企业模块
// import sys from './routers/sys'                // 系统模块


import authUtils from './utils/authUtils'
import * as typeUtils from './utils/typeUtils'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
    if (to.meta && to.meta.savePosition && savedPosition) {
        return savedPosition
    }

    const position = {}
    if (to.hash) {
        position.selector = to.hash
    } else {
        position.x = 0
        position.y = 0
    }

    return position
}

// 拿到左边的叶子节点
let item = authUtils.getNavMenu()
let firstLeafMenu
if (item) {
    item = item[0]
    while (item.children && item.children.length > 0)
        item = item.children[0]
    firstLeafMenu = item.item.menu_url
} else {
    firstLeafMenu = '/login'
}

const routes = [{
        path: '/',
        redirect: firstLeafMenu || '/main'
    },
    { // 首页
        path: '/',
        name: 'index',
        component: require('./views/Index.vue'),
        children: [
            // 首页
            {
                path: '/main',
                name: 'main',
                component: resolve => {
                    require.ensure([], () => {
                        resolve(require('./views/index/Main.vue'))
                    })
                },
                meta: {
                    title: '控制台',
                    noback: true
                },
            },
            // ============ 基础模块 ==================
            ...base,
            // ============ 培训模块 ==================
            // course,
            // ============ 财务模块 ==================
            // finance,
            // ============ 企业模块 ==================
            // ...company,
            // ============ 系统模块 ==================
            // sys,
            // ============ 数据分析模块 ==============
            data,
            // ============ 客户端模块 ==================
            app,
            // ============ 医政模块 ==================
            medical,
            // ============ 公告模块 ==================
            announce,
            // ============ 模块 ==================
            review,
        ]
    },
    { // 登录
        path: '/login',
        name: 'login',
        component: require('./views/base/login/Login.vue'),
        meta: {
            title: '登录',
            notAuth: true, //  不需要身份验证
        }
    },
    { // 二次认证 登录
        path: '/login/twice',
        name: 'login-twice',
        component: resolve => {
            require.ensure([], () => {
                resolve(require('./views/base/login/TwiceValid.vue'))
            })
        },
        meta: {
            title: '二次认证 - 微信登录',
            notAuth: true, //  不需要身份验证
        }
    },
    {
        path: '/test',
        name: 'test',
        component: resolve => {
            require.ensure([], () => {
                resolve(require('./views/Test.vue'))
            })
        },
        meta: {
            title: '测试页面',
            notAuth: true, //  不需要身份验证
        }
    },
]


const router = new VueRouter({
    base: '/view',
    mode: 'history',
    scrollBehavior,
    routes
})

let loginouted = false
router.afterEach((route) => {
    let title = route.meta.title
    if (title) {
        document.title = title + ' - 医线通'
    }

    // 设置选中的菜单
    if (route.matched.some(record => record.meta.noback)) store.dispatch('setIndexMenuActive', route.path)
})

router.beforeEach((to, from, next) => {
    // 如果需要登录
    if (!to.matched.some(record => record.meta.notAuth) && (!authUtils.getUserInfo() || !authUtils.getAuthToken())) {
        // 第一次进来不提示超时
        loginouted && xmview.showTip('error', '未登录或登录已超时, 请重新登录!')
        loginouted = true
        next({ name: 'login' })
        next()
        return
    }

    xmview.setContentLoading && xmview.setContentLoading(true)
    setTitle(to.meta.title)

    showBackContent(to, from, next)

    // 如果需要清空筛选条件
    if (store.state.index.clearFetchParam) {
        store.dispatch('clearFetchParam', false)
        let vm
        if (from.matched.length < 3) {
            return
        } else if (from.matched.length === 3) {
            vm = from.matched[2].instances.default
        } else if (from.matched.length === 4) {
            vm = from.matched[3].instances.default
        }
        if (vm) {
            vm.initFetchParam ? vm.initFetchParam() : clearObj([vm.fetchParam, vm.fetchParams])
        }
    }

    next()
})

function setTitle(title) {
    // 设置标题
    if (!title) {
        return
    }
    let titles = title.split('-')
    if (titles.length < 2) {
        titles[1] = ''
    }
    action.setIndexWebpath(store, {
            main: titles[0],
            sub: titles[1]
        })

        !xmview.setContentTile && (xmview.setContentTile = setTitle)
}

let backContentTimeoutid
// 设置是否显示返回按钮
function showBackContent(to, from, next) {
    clearTimeout(backContentTimeoutid)
    if (!xmview.setContentBack) {
        backContentTimeoutid = setTimeout(() => {
            showBackContent(to)
        }, 30)
        return
    }
    xmview.setContentBack(true)
    // 如果不需要back 则干掉返回按钮
    if (to.matched.some(record => record.meta.noback)) {
        xmview.setContentBack && xmview.setContentBack(false)
    }
}

function clearObj(obj) {
    if (!obj) return
    if (typeUtils.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) clearObj(obj[i])
    } else {
        for (let k in obj) {
            if (k !== 'page' && k !== 'pagesize') obj[k] = void 0
        }
    }
}

export default router