<style lang="scss">
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";
    #task-statistics-container {
        @extend %content-container;
        .search {
            @extend %top-search-container;
        }
        .top-btn {
            @extend %right-top-btnContainer;
        }

        .block {
            float: right;
            margin-top: 15px;
        }
    }
</style>
<template>
    <article id="task-statistics-container">
       
        <article class="search">
            <!--<section>
                <i>完成状态</i>
                <el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData" clearable>
                    <el-option label="完成" :value="1"></el-option>
                    <el-option label="未完成" :value="2"></el-option>
                </el-select>
            </section>-->
            <section>
                <i>人员姓名</i>
                <el-input v-model="fetchParam.name" @keyup.enter.native="fetchData"></el-input>
            </section>
            <div style="float:right;">
            <el-button icon="el-icon-document" type='warning' :loading="exportLoading" @click.native="exportExcel">导出 excel</el-button>
            </div>
        </article>
        <el-table class="data-table" v-loading="loading" :data="dataList" :fit="true" border>
            <!--<el-table-column prop="name" width="130" label="人员姓名"></el-table-column>-->
            <el-table-column prop="user_name"label="人员姓名"></el-table-column>
             <el-table-column prop="town_name"label="卫生院"></el-table-column>
              <el-table-column prop="village_name"label="卫生室"></el-table-column>
            <el-table-column prop="course_count" label="任务数"></el-table-column>
            <el-table-column prop="course_done_cnt" label="完成数"></el-table-column>
            <el-table-column :formatter="status" label="完成状态"></el-table-column>
            <!--<el-table-column prop="" label="完成进度">
                <template scope="scope">
                    <el-button type='text' @click="openCourseDetail(scope.row)">{{scope.row.course_done}}/{{scope.row.course_count}}</el-button>
                </template>
            </el-table-column>-->
        </el-table>
        <el-pagination class="block"
            @size-change="val=> {fetchParam.pagesize=val; fetchData()}"
            @current-change="val=> {fetchParam.page=val; fetchData()}"
            :current-page="fetchParam.page"
            :page-size="fetchParam.pagesize"
            :page-sizes="[15, 30, 60, 100]"
            layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

        <el-dialog 
            title="完成进度" 
            :visible.sync="courseDetail.showDialog">
            <!-- 自适应width：字段长度不固定的设置min-width,字段长度固定的设置width -->
            <!-- 格式化字段通过:formatter或者通过slot-scope在插值中使用过滤器，推荐用后者 -->
            <!-- 固定列通过配置fixed="right || left"-->
            <el-table class="data-table" v-loading="loading" :data="courseDetail.data" :fit="true" border>
                <el-table-column 
                    label="内容名称" 
                    prop="object_name" 
                    min-width="140">
                </el-table-column>
                <el-table-column prop="object_type" label="类型" width="100">
                    <template scope="scope">
                        <el-tag type="success" v-if="scope.row.object_type === 'course'">课程</el-tag>
                        <el-tag type="danger" v-if="scope.row.object_type === 'exam'">试卷</el-tag>
                    </template>
                </el-table-column>
                <el-table-column 
                    label="进度" 
                    prop="completed" 
                    width="80">
                </el-table-column>
            </el-table>
            <el-pagination class="block"
                @size-change="val=> {courseDetail.fetchParam.pagesize=val; fetchCourseData()}"
                @current-change="val=> {courseDetail.fetchParam.page=val; fetchCourseData()}"
                :current-page="courseDetail.fetchParam.page"
                :page-size="courseDetail.fetchParam.pagesize"
                :page-sizes="[15, 30, 60, 100]"
                layout="sizes, total, prev, pager, next" 
                :total="courseDetail.total">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </article>
</template>

<script>
    import courseTaskService from '../../../services/server/courseTaskService.js'
    import config from '../../../utils/config'
    import authUtils from '../../../utils/authUtils'
    export default {
        data () {
            return {
                type: {company: '企业任务', department: '门店任务', user: '指定人员', user_group: '指定用户组'},
                dataList: [],
                tableHeader: [],
                total: 0,
                loading: false,
                fetchParam: {
                    status: '',
                    department_id: '',
                    role_type: '',
                    name: '',
                    page: 1,
                    pagesize: 15,
                    _export:''
                },
                token:'',
                exportLoading: false,
                courseDetail: {
                    showDialog: false,
                    data: [],
                    object: [],
                    total: 0,
                    fetchParam: {
                        page: 1,
                        pagesize: 15,
                        id:void 0,
                    }
                },
            }
        },
        computed: {
            statid () {
                return this.$route.params.id
            },
        },
        created(){
              this.token = authUtils.getAuthToken()
            console.log(this.token)
        },
        activated () {
            this.token = authUtils.getAuthToken()
            console.log(this.token)
            this.fetchParam.name= ''
            xmview.setContentTile && xmview.setContentTile(`详细统计-${this.$route.query.title}`)
            this.fetchData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            status (row, column, cellValue) {
                return this.statusFilter(row.course_count, row.course_done_cnt)
            },
            statusFilter(all,done){
                let stated
                if (all > done){
                    stated ='未完成'
                }else{
                    stated ='已完成'
                }
                return stated
            },
            fetchData () {
                this.fetchParam.id=this.statid
                // return courseTaskService.getTaskStatDetail({...this.fetchParam, id: this.statid}).then((ret) => {
                return courseTaskService.getTaskStatDetail(this.fetchParam).then((ret) => {
                    this.dataList = ret.data
                    this.total = ret._exts.total
                })
            },
            openCourseDetail (row) {
                this.courseDetail.showDialog = true
                this.courseDetail.object = row.object
                this.courseDetail.total = row.object.length
                this.fetchCourseData()
            },
            fetchCourseData () {
                let offset = this.courseDetail.fetchParam.pagesize
                let start = (this.courseDetail.fetchParam.page - 1) * offset
                let end = start + offset
                this.courseDetail.data = this.courseDetail.object.slice(start, end)
            },
            exportExcel(){
                // this.fetchData(Object.assign(this.fetchParam,{_export:1}))
                let urlPre = config.apiHost
				let newurl=urlPre+'/course/task/stat/'+this.statid+'/user?_export=1&token='+this.token+'&page=1'+'&pagesize=15'+'&status='+'&name='
				window.location.href =newurl
              
            },
            // exportTask () {
            //     this.exportLoading = true
            //     return courseTaskService.exportUserTask({
            //         id: this.statid,
            //         // ...this.fetchParam
            //     }).then((ret) => {
            //         xmview.showTip('success', ret.message || '导出成功')
            //     }).catch((ret) => {
            //         xmview.showTip('error', ret.message || '导出失败')
            //     }).then(() => {
            //         this.exportLoading = false
            //     })
            // }
        }
    }
</script>
