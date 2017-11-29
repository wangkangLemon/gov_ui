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
        <!--选取组件-->
        <el-dialog class="choose-course main-container" title="选取内容" :visible.sync="curValue">
            <section class="search">
                <section>
                    <i>名称</i>
                    <el-input @keyup.enter.native="changeList" v-model="search.keyword"></el-input>
                </section>

                <section>
                    <i>栏目分类</i>
                    <Course-category-select :onchange="fetchData" v-model="fetchParam.category_id"></Course-category-select>
                </section>

            </section>
            <el-table v-loading="loadingData" border :data="data" :highlight-current-row="true">
                <el-table-column prop="course_name" label="课程"></el-table-column>
                <el-table-column prop="gov_name" label="企业" width="200"></el-table-column>
                <el-table-column prop="material_type" label="类型" width="150">
                    <template scope="scope">
                        {{material_type[scope.row.material_type]}}
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="类型" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="courseConfirm(scope.row)">选取</el-button>
                    </template>
                </el-table-column>
            </el-table>

 
            <div class="block">
                <el-pagination
                        @size-change="courseSizeChange"
                        @current-change="coursePageChange"
                        :total="total"
                        :current-page="fetchParam.page"
                        :page-size="fetchParam.pagesize"
                        :page-sizes="[10, 20, 40, 100]"
                        layout="total, sizes, prev, pager, next">
                </el-pagination>
            </div>
        </el-dialog>
    </article>
</template>
<script>
    import courseService from '../../../services/course/courseService.js'
    import speakingService from '../../../services/course/courseService.js'
    import ArticleService from '../../../services/course/courseService.js'
    import CourseCategorySelect from '../../component/select/SecCourseCategory.vue'
    function getFetchParam() {
        return {
            gov_id: void 0, // 部门id
            category_id: void 0, // 栏目id
            course_name:'',
            type:'',
            page:  1,
            pagesize: 15,
            level: void 0,
            time_start: void 0,
            time_end: void 0,
            need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
            status: -1, // 2- 视屏转码中 1-下线 0-正常
        }
    }
    export default {
        props: ['value'],
        components: {
            CourseCategorySelect
        },
        data () {
            return {
                curValue: this.value,
                loadingData: false,
                search: {
                    keyword: '',
                },
                category: 'course',
                data: [],
                page: 1,
                pagesize: 10,
                total: 0,
                category_id: void 0,
                fetchParam: getFetchParam(),
                category_name:'',
                gov_name:'',
                material_type: {
                    video: '视频',
                    doc: 'word文档',
                    ppt: '幻灯片',
                    pdf: 'PDF文件'
                }
            }
        },
        watch: {
            // category () {
            //     this.page = 1
            //     this.search.keyword = ''
            // },
            value (val) {
                this.curValue = val
            },
            curValue (val) {
                this.curValue = val
                this.$emit('input', val)
            }
        },
        created () {
            this.fetchData()
        },
        methods: {
            // 课程当前页
            coursePageChange (val) {
                this.fetchParam.page = val
                this.fetchData()
            },
            // 课程分页
            courseSizeChange (val) {
                this.fetchParam.pagesize = val
                this.fetchData()
            },
            // confirm (item) {
            //     this.$emit('result', {data: item, category: this.category})
            // },
            courseConfirm (item) {
                this.$emit('result', item)
            },
            fetchData () {
                this.loadingData = true
                // 获取课程数据
                return courseService.getPublicCourselist({
                    category_id: this.fetchParam.category_id,
                    page: this.fetchParam.page,
                    pagesize: this.fetchParam.pagesize
                }).then((ret) => {
                    this.data = ret
                    this.total = ret.total
                    this.loadingData = false
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            getArticle () {
                this.loadingData = true
                return ArticleService.getArticleList({
                    title: this.search.keyword,
                    page: this.page,
                    pagesize: this.pagesize
                }).then((ret) => {
                    this.data = ret.data
                    this.total = ret.total
                    this.loadingData = false
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            getSpeaking () {
                this.loadingData = true
                // 获取课程数据
                return speakingService.search({
                    keyword: this.search.keyword,
                    page: this.page,
                    pagesize: this.pagesize
                }).then((ret) => {
                    this.data = ret.data
                    this.total = ret.total
                    this.loadingData = false
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            changeList () {
                let typeArr = {course: 'fetchData', article: 'getArticle', speaking: 'getSpeaking'}
                this[typeArr[this.category]]()
            }
        }
    }
</script>
