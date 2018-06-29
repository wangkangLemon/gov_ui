<!--课程任务 模板推荐-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    @import "../../../utils/mixins/topSearch";
    @import "../../../utils/mixins/common";

    .course-task-template-index {
        @extend %content-container;
        .search {
            @extend %top-search-container;
        }

        .manage-container {
            @extend %right-top-btnContainer;
        }

         .block {
            text-align: right;
            margin-top: 10px;
        }
        .temp-container{
            width:100%;
            .temp-item {
                width:310px;
                margin-bottom: 10px;
                margin-right: 3%;
                position: relative;
                vertical-align: top;
                display: inline-block;
                border: 1px solid #ededed;
                flex-basis: 30%;
                height: 310px;
                font-size: 14px;
                .corner{
                    position: absolute;
                    right: 0;
                    width: 0; 
                    height: 0; 
                    border-left: 70px solid transparent; 
                }
                .exam{
                    border-top: 70px solid #FF7042; 
                }
                .course{
                    border-top: 70px solid #4677D1; 
                }
                .mark{
                        position: absolute;
                        top:11px;
                        right:6px;
                        color:#fff;
                        font: normal bold 16px "Microsoft YaHei";
                        transform:rotate(45deg)
                        }
                .content {
                    height: 210px;
                    padding: 10px 15px;
                    h2 {
                        font-size: 16px;
                        padding-bottom: 10px;
                    }
                    img {
                        width: 100%;
                    }
                    .des {
                        line-height: 25px;
                        @include lineCount(2);
                    }
                }
                .bottom {
                    position: absolute;
                    bottom: 0;
                    background: #eee;
                    left: 0;
                    width: 100%;
                    display: flex;
                    > div {
                        margin-top: 5px;
                        margin-bottom: 5px;
                        text-align-last: center;
                        text-align: center;
                        /*line-height: 50px;*/
                        width: 50%;
                        &:first-of-type {
                            border-right: 1px solid #ddd;
                        }
                    }
                }
            }
        }
        .el-dialog__body{
            padding:0 20px 20px;
        }
        .course-section{
            .list-item{

            }
            h3{
                padding: 18px 20px;
                border-bottom: 1px solid #ebeef5;
                box-sizing: border-box;
            }
            ol{
                padding: 18px 35px;
            }
        }
    }
</style>
<template>
    <article class="course-task-template-index">
        <!--添加/编辑表单-->
        <!--点击添加 form数据取邮箱/手机号 密码-->
        <!--<article class="manage-container">
            <el-button icon="plus" type="primary" @click="()=> $router.push({name:'server-manage-add'}) ">添加
            </el-button>
        </article>-->
        <!--<el-tab-pane label="任务列表" name="list">-->
                <section class="search">
                    <section>
                        <i>栏目类型</i>
                        <el-select clearable v-model="temp.fetchParam.task_type" placeholder="未选择" @change="selectCate">
                            <el-option label="课程任务" value="1"></el-option>
                            <el-option label="试题任务" value="2"></el-option>
                        </el-select>
                    </section>
                    <section>
                        <i>类别</i>
                        <el-select clearable class="select" v-model="temp.fetchParam.category_id" placeholder="请选择类别" 
                                    :fetch-suggestions="querySearch" @change="getTempData">
                            <el-option  v-for="item in  category_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </section>
                    <section>
                        <i>标题搜索</i>
                        <el-input v-model="temp.fetchParam.title" @keyup.enter.native="getTempData"></el-input>
                    </section>
                </section>
                <article class="temp-container" v-loading="temp.loading">
                    <section class="temp-item" v-for="item in temp.dataList" :key="item.id">
                        <div class="corner course" v-if="item.task_type==1"></div>
                        <div class="corner exam" v-else-if="item.task_type==2"></div>
                        <div class="mark">{{item.task_type==1?'课程':'考试'}}</div>
                        <div class="content">
                            <h2>{{item.title}}</h2>
                            <!--<img :src="item.image" alt="">-->
                            <img :src="item.image | fillImgPath" :alt="item.image">
                            <div class="des">{{item.description}}</div>
                        </div>
                        <div class="bottom">
                            <div><el-button type="text" @click="templateViewFn(item)">{{item.task_type==1?'课程':'考试'}}列表</el-button></div>
                            <!-- <div><el-button type="text" @click="()=>{$router.push({name: 'server-manage-add', params:{coursetaskInfo:item,type:'template',add:1},query: {id: item.id}})}">使用</el-button></div> -->
                            <div><el-button type="text" @click="use(item)">使用</el-button></div>
                        </div>
                        <br/>
                    </section>
                </article>
        <section class="block">
             <el-pagination 
                    class="block"
                    @size-change="val=> {temp.fetchParam.pagesize=val; getTempData()}"
                    @current-change="val=> {temp.fetchParam.page=val; getTempData()}"
                    :current-page="temp.fetchParam.page"
                    :page-size="temp.fetchParam.pagesize"
                    :page-sizes="[6, 15, 30, 60, 100]"
                    layout="sizes,total, prev, pager, next" 
                    :total="temp.total">
                </el-pagination>
        </section>
        <el-dialog class="course-list" custom-class="custom-el-dialog" :title="temp.name + '列表'" :visible.sync="temp.listDialog">
            <section v-if="temp.courseList !== null" class="course-section">
                <div class="list-item">
                    <template v-if="temp.count">
                        <h3 class="list-title">此任务共包含{{temp.count}}项{{temp.name}}：</h3>
                        <ol v-if="temp.name=='课程'">
                            <li v-for="(item,index) in temp.courseList" :key="index" v-if="temp.type === item.type || !item.type">{{item.course_name}}</li>
                        </ol>
                        <ol v-if="temp.name=='考试'">
                            <li v-for="(item,index) in temp.courseList" :key="index" v-if="temp.type === item.type || !item.type">{{item.name}}</li>
                        </ol>
                    </template>
                </div>
            </section>
        </el-dialog>
    </article>
</template>
<script>
    import DateRange from '../../component/form/DateRangePicker.vue'
    import courseTaskService from '../../../services/server/courseTaskService.js'
    // import CourseTaskTemplateCategorySelect from '../../component/select/CourseTaskTemplateCategory.vue'
    import {fillImgPath} from '../../../utils/filterUtils'
    import * as _ from '../../../utils/commonUtils'
    

    export default {
        filters: {
            fillImgPath
        },
        components: {
            DateRange,
            // CourseTaskTemplateCategorySelect,
        },
        data () {
            return {
                currCategoryName: '',
                loading: false,
                fetchParam: {
                    title: '',
                    category_id: '',
                    stime: '',
                    etime: '',
                    type :void 0,
                    status :void 0,
                    deleted :-1,
                },
                itemName: '',           // 要删除项名称
                coursetasktemplateData: [],
                total: 0,
                currentPage: 1, // 分页当前显示的页数
                pagesize: 15,
                task: {
                    loading: false,
                    dataList: [],
                    total: 0,
                    fetchParam: {
                        status: '',
                        type: '',
                        title: '',
                        page: 1,
                        pagesize: 15
                    }
                },
                temp: {
                    type: '',
                    count: 0,
                    name: '',
                    listDialog: false, // 课程列表弹窗
                    total: 0,
                    loading: false,
                    dataList: [],
                    fetchParam: {
                        category_id: '',
                        title: '',
                        deleted:-1,
                        status :-1,
                        page: 1,
                        pagesize: 6,
                        task_type:'',
                    },
                    courseList: null,
                },
                category_list:[]
            }
        },
        activated () {
            // this.getTaskData().then(() => {
            //     xmview.setContentLoading(false)
            // })
             this.getCategory()
             this.getTempData().then(() => {
                xmview.setContentLoading(false)
            })
             //暂无tab切换 在初始化页面请求
        },
        methods: {
            selectCate(){
                this.getTempData()
                this.getCategory(this.temp.fetchParam.task_type)
            },
            use(item){
                this.$router.push({name: 'server-manage-add', params:{taskInfo:item,type:'template',add:1,taskType:item.task_type},query: {id: item.id}})
            },
             //获取部门组下拉列表
            getCategory(val){
                if(!val)val=-1
                courseTaskService.getCategoryTree({ id : '', type:'', task_type :val, pagesize:-1}).then((ret)=>{
                 this.category_list = ret.data;
                })
            },
            //拿到部门组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            handleClick (e) {
                e.name === 'temp' && this.getTempData()
                e.name === 'list' && this.getTaskData()
            },
            getTaskData () {
                this.task.loading = true
                let fetchParam = _.clone(this.task.fetchParam)
                fetchParam.status = fetchParam.status === '' ? -1 : fetchParam.status
                return courseTaskService.getCourseTaskList(fetchParam).then((ret) => {
                    this.task.dataList = ret.data
                    this.task.total = ret.total
                    this.task.loading = false
                })
            },
            getTempData () {
                this.temp.loading = true
                return courseTaskService.getCourseTaskTemplateList(this.temp.fetchParam).then((ret) => {
                    this.temp.dataList = ret.data
                    this.temp.total = ret._exts.total
                    this.temp.loading = false
                })
            },
            // 获取课程 / 考试列表
            templateViewFn (row) {
                console.log(1111,row);
                this.temp.listDialog = true
                courseTaskService.getCourseTaskTemplateEditDetail( row.id ).then((ret) => {
                    console.log(2222,ret.data);
                    if(row.task_type==1){
                            this.temp.count = ret.data.courses.length
                            this.temp.name = '课程'
                            this.temp.courseList = ret.data.courses
                    }else{
                        this.temp.count = ret.data.exam.categorys.length
                        this.temp.name = '考试'
                        this.temp.courseList = ret.data.exam.categorys
                    }
                })
            },
            // 处理状态
            dealStatus (row) {
                // 如果status 0 则执行下线 否则执行上线
                let req
                let msg = ''
                if (row.status != 1) {
                    req = courseTaskService.revokeCourseTask
                    msg = '下线'
                } else {
                    req = courseTaskService.publishCourseTask
                    msg = '上线'
                }
                xmview.showDialog(`确定要执行${msg}吗`, () => {
                    req({id: row.id}).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.getTaskData()
                    })
                })
            },
            timingDialogFn (row) {
                this.timingDialog = true
                this.timingDialogSubmit = (start_time) => {
                    return courseTaskService.timingPublish({id: row.id, start_time: start_time}).then(() => {
                        row.status = 2
                        row.start_time = start_time
                        xmview.showTip('success', '操作成功')
                    })
                }
            },
            deleteTask (row) {
                xmview.showDialog(`确定要删除<span style="color:red;">${row.title}</span>`, () => {
                    courseTaskService.deleteCourseTask({id: row.id}).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.getTaskData()
                    })
                })
            }
        }
    }
</script>
