<template>
    <div id="app" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中">
        <transition name="fade">
            <router-view></router-view>
        </transition>

        <el-dialog :title="dialog.title" v-model="dialog.isShow" size="tiny">
            <span v-html="dialog.content"></span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.isShow = false">取 消</el-button>
            <el-button type="primary" @click="dialog.confirmFn">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from './store/index'
    import * as filters from './utils/filterUtils'

    export default {
        filters,
        data () {
            return {
                dialog: {
                    isShow: false,
                    content: '',
                    confirmFn: {},
                    title: '提示'
                },
                fullscreenLoading: false,
            }
        },
        created () {
            xmview.setLoading = this.setLoading.bind(this)
            xmview.showDialog = this.showDialog.bind(this)
        },
        methods: {
            // 全屏的loading
            setLoading (isloading) {
                this.fullscreenLoading = isloading
            },
            // 显示dialog
            showDialog (content, confirmFn, title = '操作提示', isShow = true) {
                this.dialog.isShow = isShow
                this.dialog.title = title
                this.dialog.content = content
                this.dialog.confirmFn = () => {
                    this.dialog.isShow = false
                    confirmFn && confirmFn()
                }
            }
        },
        store
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "./utils/mixins/common";
    @import "./utils/mixins/mixins";

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    body {
        font-size: 14px;
        color: #333;
        line-height: 1.4;
    }

    em, i {
        font-style: normal;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: normal;
    }

    .el-message {
        z-index: 99999 !important;
    }

    @import "./utils/mixins/font/iconfont";
    @import "./utils/mixins/font-awesome/scss/font-awesome";
</style>
