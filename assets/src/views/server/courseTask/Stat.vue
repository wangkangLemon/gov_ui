<style lang="scss">
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";
    #task-statistics-container {
        @extend %content-container;
        .search {
            @extend %top-search-container;
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
            <section>
                <i>任务标题</i>
                <el-input v-model="fetchParam.title" @keyup.enter.native="fetchData"></el-input>
            </section>
            <section>
                <i>发布对象</i>
                <el-select v-model="fetchParam.type" placeholder="未选择" @change="fetchData" :clearable="true">
                    <el-option label="部门任务" value="1"></el-option>
                    <el-option label="个人任务" value="2"></el-option>
                </el-select>
            </section>
        </article>
        <el-table class="data-table" v-loading="loading" :data="dataList" :fit="true" border>
            <el-table-column prop="title" min-width="200" label="任务标题">
                <template scope="scope">
                    <el-button @click="()=>{$router.push({name: 'server-coursetask-user', params: {id: scope.row.task_id}, query: {title: scope.row.title}})}" type="text">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="发布对象" width="150">
                <template scope="scope">
                    <!--{{type[scope.row.type]}}-->
                    {{scope.row.type=='1'?'部门任务':'个人任务'}}
                </template>
            </el-table-column>
            <el-table-column prop="user_cnt" label="任务总人数" width="120"></el-table-column>
            <el-table-column prop="done_cnt" width="120" label="完成人数"></el-table-column>
            <el-table-column prop="task_start_date" label="创建日期" width="180"></el-table-column>
            <el-table-column prop="task_end_date" label="截止日期" width="180"></el-table-column>
        </el-table>
        <el-pagination class="block"
                       @size-change="val=> {fetchParam.pagesize=val; fetchData()}"
                       @current-change="val=> {fetchParam.page=val; fetchData()}"
                       :current-page="fetchParam.page"
                       :page-size="fetchParam.pagesize"
                       :page-sizes="[15, 30, 60, 100]"
                       layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
    import courseTaskService from '../../../services/server/courseTaskService.js'
    export default {
        data () {
            return {
                type: {company: '企业任务', department: '门店任务', user: '指定人员', user_group: '指定用户组'},
                dataList: [],
                total: 0,
                loading: false,
                fetchParam: {
                    type: '',
                    title: '',
                    page: 1,
                    pagesize: 15
                }
            }
        },
        activated () {
            this.fetchData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            fetchData () {
                return courseTaskService.getTaskStat(this.fetchParam).then((ret) => {
                    this.dataList = ret.data
                    this.total = ret._exts.total
                })
            },
        }
    }
</script>
