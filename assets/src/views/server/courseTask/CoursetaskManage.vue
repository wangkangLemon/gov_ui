<!--课程任务模板-->
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

        .edui-editor {
            width: 100% !important;
        }

        .avatar-uploader {
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &:hover {
                    border-color: #20a0ff;
                }
            }
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .img-wrap {
            margin-bottom: 10px;
            width: 150px !important;
            height: 150px !important;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .add {
            background: #ededed;
            padding: px2rem(10) px2rem(20);
            border-bottom: 1px solid #ededed;
        }

        .desc {
            width: 100%;
            height: 100px;
        }
    }
</style>
<template>
    <article class="course-task-template-index">
        <!--添加/编辑表单-->
        <!--点击添加 form数据取邮箱/手机号 密码-->
        <article class="manage-container">
            <el-button icon="plus" type="primary" @click="()=> $router.push({name:'server-manage-add',params: { type:'add',add:1,taskType:1,changeType:1} })">添加
                   <!-- this.$router.push({name: 'server-manage-edit' ,params: {coursetaskInfo:row, type:'task'}, query: {id: row.id},type:'look'}) -->
            <!--添加-->
            </el-button>
        </article>
        <!--<el-tab-pane label="任务列表" name="list">-->
        <section class="search">
            <!--<section>
                <i>类别</i>
                <CourseTaskTemplateCategorySelect :onchange="getData"
                                                  v-model="fetchParam.category_id"></CourseTaskTemplateCategorySelect>
            </section>-->
            <section>
                <i>任务名称</i>
                <el-input @keyup.enter.native="getData" class="name" v-model="fetchParam.title"/>
            </section>
            <section>
                <i>栏目类型</i>
                <el-select clearable v-model="fetchParam.task_type" placeholder="未选择" @change="getData">
                    <el-option label="课程任务" value="1"></el-option>
                    <el-option label="试题任务" value="2"></el-option>
                    <el-option label="学习任务" value="3"></el-option>
                </el-select>
            </section>
            <section>
                <i>任务类型</i>
                <el-select clearable v-model="fetchParam.type" placeholder="未选择" @change="getData">
                    <el-option label="部门任务" value="1"></el-option>
                    <el-option label="个人任务" value="2"></el-option>
                </el-select>
            </section>
            <!--<section>
                <i>状态</i>
                <el-select v-model="fetchParam.status" placeholder="未选择" @change="getData" :clearable="true">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="草稿  " value="2"></el-option>
                    <el-option label="已下线" value="3"></el-option>
                </el-select>
            </section>-->
            <DateRange title="创建时间" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val "
                @changeEnd="val=> fetchParam.etime=val" :change="getData">
            </DateRange>
        </section>
        <el-table border :data="coursetasktemplateData" v-loading="loading">
            <el-table-column
                    prop="title"
                    label="任务标题">
                    <template scope="scope">
                    <el-tag type="primary" v-if="scope.row.task_type=='1'">课程</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.task_type=='2'">考试</el-tag>
                    <el-tag type="success" v-else-if="scope.row.task_type=='3'">学习</el-tag>
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="study_duration"
                    label="课时(分)"
                    width="100">
                     <template scope="scope">
                        {{Math.floor(scope.row.study_duration/60)}}
                    </template>
            </el-table-column>
            <el-table-column
                    prop="addate"
                    label="创建时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="100">
                <template scope="scope">
                    <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
                    <el-tag type="gray" v-if="scope.row.status == 2">草稿</el-tag>
                    <el-tag type="gray" v-if="scope.row.status == 3">已下线</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="160">
                <template scope="scope">
                    <el-button type="text" size="small" @click="lookItm(scope.row)">
                        查看<!--点击详情 form数据变成当前管理员的信息-->
                    </el-button>
                    <!-- <el-button type="text" size="small" @click="editItm(scope.row)">
                        修改
                    </el-button> -->
                    <!--<el-button v-if="scope.row.status == 2 || scope.row.status == 1 " type="text" size="small"
                               @click="publishCourseTaskTemplate(scope.row)">
                        上线
                    </el-button>-->
                    <!-- <el-button v-if="scope.row.status == 1 " type="text" size="small"
                               @click="revokeCourseTaskTemplate(scope.row)">
                        <i>下线</i>
                    </el-button> -->
                    <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">
                        <i>删除</i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <section class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="fetchParam.page"
                    :page-size="fetchParam.pagesize"
                    :page-sizes="[15, 30, 60, 100]"
                    layout="sizes,total, ->, prev, pager, next"
                    :total="total">
            </el-pagination>
        </section>
         <!--</el-tab-pane>-->
           <!--<el-tab-pane label="模版推荐" name="temp">-->
                <!--<section class="search">
                    <section>
                        <i>类别</i>
                        <courseTaskTemplate 
                            :onchange="getTempData"
                            v-model="temp.fetchParam.category_id">
                        </courseTaskTemplate>
                    </section>
                    <section>
                        <i>标题搜索</i>
                        <el-input v-model="temp.fetchParam.keyword" @keyup.enter.native="getTempData"></el-input>
                    </section>
                </section>
                <article class="temp-container" v-loading="temp.loading">
                    <section class="temp-item" v-for="(item,index) in temp.dataList">
                        <div class="content">
                            <h2>{{item.title}}</h2>
                            <img :src="item.image | fillImgPath" :alt="item.image">
                            <div class="des">{{item.description}}</div>
                        </div>
                        <div class="bottom">
                            <div><el-button type="text" @click="templateViewFn(item)">课程列表</el-button></div>
                            <div><el-button type="text" @click="()=>{$router.push({name: 'server-manage-create', query: {item: item}})}">使用</el-button></div>
                        </div>
                        <br/>
                    </section>
                </article>
                <el-pagination 
                    class="block"
                    @size-change="val=> {temp.fetchParam.page_size=val; getTempData()}"
                    @current-change="val=> {temp.fetchParam.page=val; getTempData()}"
                    :current-page="temp.fetchParam.page"
                    :page-size="temp.fetchParam.page_size"
                    :page-sizes="[6, 15, 30, 60, 100]"
                    layout="sizes,total, prev, pager, next" 
                    :total="temp.total">
                </el-pagination>-->
            <!--</el-tab-pane>-->

    </article>
</template>
<script>
    import DateRange from '../../component/form/DateRangePicker.vue'
    import courseTaskService from '../../../services/server/courseTaskService.js'
    // import CourseTaskTemplateCategorySelect from '../../component/select/CourseTaskTemplateCategory.vue'
    import {fillImgPath} from '../../../utils/filterUtils'
    

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
                TYPE:['','课程','考试','学习'],
                currCategoryName: '',
                loading: false,
                fetchParam: {
                    title: '',
                    category_id: '',
                    stime: '',
                    etime: '',
                    type :'',
                    status :-1,
                    deleted :-1,
                    task_type:'',
                    page: 1, // 分页当前显示的页数
                    pagesize: 15
                },
                itemName: '',           // 要删除项名称
                coursetasktemplateData: [],
                total: 0,
            }
        },
        activated () {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            handleDelete (index, row) {
                let txt=this.TYPE[row.task_type]
                xmview.showDialog(`你将要删除${txt}任务【<i style="color:red">${row.title || ''}</i>】操作不可恢复确认吗？`, this.deleteItem(row.id))
            },
            deleteItem (id) {
                // 以下执行接口删除动作
                return () => {
                    courseTaskService.deleteCourseTask(id).then((ret) => {
                        xmview.showTip('success', '删除成功')
                        this.getData()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                }
            },
            lookItm (row) {
                row.course = row.course || []
                this.$router.push({name: 'server-manage-edit' ,params: {taskInfo:row, type:'look',taskType:row.task_type}, query: {id: row.id} })
            },
            publishCourseTaskTemplate (row) {
                xmview.showDialog(`你将要上线课程任务【<i style="color:red">${row.title || ''}</i>】吗？`, this.publishItem(row.id))
            },
            publishItem (id) {
                // 以下执行接口删除动作
                return () => {
                    courseTaskService.publishCourseTaskTemplate(id).then((ret) => {
                        xmview.showTip('success', '上线成功')
                        this.getData()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                }
            },
            revokeCourseTaskTemplate (row) {
                xmview.showDialog(`你将要下线课程任务【<i style="color:red">${row.title || ''}</i>】吗？`, this.revokeItem(row.id))
            },
            revokeItem (id) {
                // 以下执行接口删除动作
                return () => {
                    courseTaskService.revokeCourseTaskTemplate(id).then((ret) => {
                        xmview.showTip('success', '下线成功')
                        this.getData()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                }
            },
            handleSizeChange (val) {
                this.fetchParam.pagesize = val
                this.getData()
            },
            handleCurrentChange (val) {
                this.fetchParam.page = val
                this.getData()
            },
            getData () {
                this.loading = true
                return courseTaskService.getCourseTaskList(this.fetchParam).then((ret) => {
                    
                    this.coursetasktemplateData = ret.data
                    this.total = ret._exts.total
                }).then(() => {
                    this.loading = false
                })
            },
            handleImgUploaded(response) {
                this.form.cover = response.data.url
            },
            ueReady (ue) {
                this.editor = ue
            }
        }
    }
</script>
