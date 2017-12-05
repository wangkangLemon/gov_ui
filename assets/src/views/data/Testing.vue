<!--课程任务-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/mixins";
    @import "../../utils/mixins/topSearch";
    .analysis-gov-coursetask {
        .department-analytics {
            height: 120px;
            @extend %justify;
        }
        .search {
            @extend %top-search-container;
        }
        .box-card {
            margin-top: 20px;
            .el-card__header {
                padding: 10px 15px;
                background: #f0f3f5;
            }
            .block {
                text-align: right;
                margin-top: 15px;
            }
        }
    }
</style>
<template>
    <article class="analysis-gov-coursetask">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>成绩管理概览</span>
            </div>
            <section class="search">
                <section>
                    <i>部门</i>
                    <CompanySelect :change="getData" v-model="search.gov_id" v-on:change="val=>this.search.gov_id=val">
                    </CompanySelect>
                </section>
                <!--<section>
                    <i>课程</i>
                    <DepSelect v-model="search.department_id" :change="getData"></DepSelect>
                </section>-->
                <DateRange title="发送时间" :start="search.createTime" :end="search.endTime" v-on:changeStart="val=> search.createTime=val" v-on:changeEnd="val=> search.endTime=val"
                    :change="getData">
                </DateRange>
            </section>
            <el-dialog class="show-detail" title="企业公告信息" v-model="showCompany">
                <div class="info" v-if="courseTaskCompany">
                    <h2>{{courseTaskCompany.gov_name}}</h2>
                    <p><i class="title">第一次发布时间：</i><span class="value">{{courseTaskCompany.first_time}}</span></p>
                    <p><i class="title">上一次发布时间：</i><span class="value">{{courseTaskCompany.last_time}}</span></p>
                    <p><i class="title">发布个数：</i><span class="value">{{courseTaskCompany.course_task_count}}条（{{courseTaskCompany.gov_count}}条企业课程任务，{{courseTaskCompany.department_count}}条分店课程任务）</span></p>
                </div>
            </el-dialog>
            <el-dialog class="show-detail" title="分店公告信息" v-model="showDepartment">
                <div class="info" v-if="courseTaskDepartment">
                    <h2>{{courseTaskDepartment.department_name}}-使用概况</h2>
                    <p><i class="title">第一次发布时间：</i><span class="value">{{courseTaskDepartment.first_time}}</span></p>
                    <p><i class="title">上一次发布时间：</i><span class="value">{{courseTaskDepartment.last_time}}</span></p>
                    <p><i class="title">发布个数：</i><span class="value">{{courseTaskDepartment.department_count}}条</span></p>
                </div>
            </el-dialog>
            <el-table v-loading="loading" border :data="testingData" stripe style="width: 100%">
                <el-table-column prop="course_name" min-width="200" label="课程">
                </el-table-column>
                <el-table-column prop="grade" label="课程数量" min-width="100">
                </el-table-column>
                <el-table-column prop="user_id"  :formatter="User" label="管理员"  min-width="180">
                    

                </el-table-column>
                <el-table-column prop="score" label="分值"  min-width="180">
                </el-table-column>
                <el-table-column prop="passed" label="通过人数"  min-width="180">
                </el-table-column>
                <el-table-column prop="addate" min-width="180" label="创建时间">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 60, 100]"
                    :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </article>
</template>
<script>
    import DateRange from '../component/form/DateRangePicker.vue'
    import CompanySelect from '../component/select/IndustryCompany.vue'
    import DepSelect from '../component/select/Department.vue'
    import govService from '../../services/gov/govService.js'

    function clearFn() {
        return {
            gov_id: '',
            createTime: '',
            endTime: '',
            department_id: ''
        }
    }
    export default {
        components: {
            DepSelect,
            CompanySelect,
            DateRange
        },
        data() {
            return {
                loading: false,
                testingData: [],
                currentPage: 0,
                pageSize: 15,
                total: 0,
                showCompany: false,
                courseTaskCompany: null,
                showDepartment: false,
                courseTaskDepartment: null,
                search: clearFn(),
                userList:[]
                
            }
        },
        mounted() {


        },
        created() {
            xmview.setContentLoading(false)
        },
        activated() {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {

            // 处理用户名 
            User(row, column, cellValue){
               return  this.idFormat(row.user_id) 
            },
            idFormat(user_id){
                let name
                this.userList.forEach(v=> {
                    if(user_id == v.id){
                        name = v.name
                    }
                }, this);
                return name
            },
            getUserList () {
                this.loading = true
                return govService.govAdminList({
                    page: this.currentPage,
                    pagesize: this.pageSize,
                    keyword: this.search.name,
                    gov_id: this.govID
                }).then((ret) => {
                    this.userList = ret
                    //拿到数据后根据id 把name 对应给user_id
                    this.loading = false
                    // message.pid=this.$store.state.index.secPid    
                })
            },
            // getUserList(){              
            //     this.userList = this.$store.state.index.userList 
            //         console.log(this.$store.state) 
            // },
            initFetchParam() {
                this.currentPage = 0
                this.search = clearFn()
            },
            showCompanyFn(item) {
                govService.getCompanyAppCourseTaskDetail({
                    gov_id: item.gov_id,
                    department_id: item.department_id,
                    type: 'gov',
                }).then((ret) => {
                    this.courseTaskCompany = ret.data
                }).then(() => {
                    this.showCompany = true
                })
            },
            showDepartmentFn(item) {
                govService.getCompanyAppCourseTaskDetail({
                    gov_id: item.gov_id,
                    department_id: item.department_id,
                    type: 'department',
                }).then((ret) => {
                    this.courseTaskDepartment = ret.data
                }).then(() => {
                    this.showDepartment = true
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getData()
            },
            getData() {
                this.loading = true
                this.getUserList()
                return govService.getGovTestingData({
                    page: this.currentPage,
                    page_size: this.pageSize,
                    gov_id: this.search.gov_id,
                    department_id: this.search.department_id,
                    time_start: this.search.createTime,
                    time_end: this.search.endTime,
                }).then((ret) => {
                    this.total = ret.total
                    this.testingData = ret
                }).then(() => {
                    this.loading = false
                })
            }
        }
    }
</script>