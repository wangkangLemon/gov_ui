<style lang="scss">
    @import "../../../utils/mixins/topSearch";
    .search {
        @extend %top-search-container;
    }
    .choose-course {
        .block {
            text-align: center !important;
            width: 50%;
            margin: 0 auto;
            margin-top: 10px;
        }
    }
</style>
<template>
    <article>
        <el-dialog class="choose-course main-container" title="选择课程" :visible.sync="curValue">
            <section class="search">
                <section>
                    <i>标题</i>
                    <el-input @change="getCourse" v-model="search.keyword"></el-input>
                </section>
            </section>
            <el-table v-loading="loading" border :data="data" :highlight-current-row="true">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="150"></el-table-column>
                <el-table-column prop="operate" label="类型" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="courseConfirm(scope.row)">选取</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="val => {pagesize = val; getCourse()}"
                        @current-change="val => {page = val; getCourse()}"
                        :total="total"
                        :current-page="page"
                        :pagesize="pagesize"
                        :page-sizes="[15, 30, 60, 100]"
                        layout="total, sizes, prev, pager, next">
                </el-pagination>
            </div>
        </el-dialog>
    </article>
</template>
<script>
    // import speakingService from '../../../services/speaking/contentService'
    let ret = {
        'data': [
            {
                'id': 59,
                'title': '大幅度',
                'image': '/upload/speaking/images/1504688851937906.jpg',
                'content': '你好',
                'end_time': '2017-09-22 17:07:32',
                'create_time': '2017-09-06',
                'price_enabled': 1,
                'status': 0,
                'limit': 0
            },
            {
                'id': 60,
                'title': '小幅度',
                'image': '/upload/speaking/images/1504688851937906.jpg',
                'content': '你好',
                'end_time': '2017-09-22 17:07:32',
                'create_time': '2017-09-06',
                'price_enabled': 1,
                'status': 0,
                'limit': 0
            }
        ],
        'total': 28
    }
    export default {
        props: ['value'],
        data () {
            return {
                curValue: this.value,
                loading: false,
                search: {
                    keyword: ''
                },
                data: [],
                page: 1,
                pagesize: 10,
                total: 0
            }
        },
        watch: {
            value (val) {
                this.curValue = val
            },
            curValue (val) {
                this.curValue = val
                this.$emit('input', val)
            }
        },
        created () {
            this.getCourse()
        },
        methods: {
            courseConfirm (item) {
                this.$emit('courseResult', item)
            },
            getCourse () {
                this.loading = true
                // 获取课程数据
                // return speakingService.search({
                //     keyword: this.search.keyword,
                //     sender_type: 'system',
                //     status: 0,
                //     page: this.page,
                //     pagesize: this.pagesize
                // }).then((ret) => {
                //     this.data = ret.data
                //     this.total = ret.total
                //     this.loading = false
                // }).catch((ret) => {
                //     xmview.showTip('error', ret.message)
                // })
                this.data = ret.data
                this.total = ret._exts.total
                this.loading = false
            },
        }
    }
</script>
