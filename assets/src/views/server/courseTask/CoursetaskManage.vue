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
            <el-button icon="plus" type="primary" @click="()=> $router.push({name:'server-manage-add'}) ">添加
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
                <i>课程名称</i>
                <el-input @keyup.enter.native="getData" class="name" v-model="fetchParam.title"/>
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
                    label="课程任务">
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
                    <el-button type="text" size="small" @click="editItm(scope.row)">
                        修改
                        <!--点击详情 form数据变成当前管理员的信息-->
                    </el-button>
                    <!--<el-button v-if="scope.row.status == 2 || scope.row.status == 1 " type="text" size="small"
                               @click="publishCourseTaskTemplate(scope.row)">
                        上线
                    </el-button>-->
                    <el-button v-if="scope.row.status == 0 " type="text" size="small"
                               @click="revokeCourseTaskTemplate(scope.row)">
                        <i>下线</i>
                    </el-button>
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
                    :current-page="currentPage"
                    :page-size="this.pagesize"
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
                pagesize: 15
            }
        },
        activated () {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            handleDelete (index, row) {
                xmview.showDialog(`你将要删除课程任务【<i style="color:red">${row.title || ''}</i>】操作不可恢复确认吗？`, this.deleteItem(row.id))
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
            editItm (row) {
                row.course = row.course || []
                this.$router.push({name: 'server-manage-edit' ,params: {coursetaskInfo:row, type:'task'}, query: {id: row.id}})
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
                this.pagesize = val
                this.getData()
            },
            handleCurrentChange (val) {
                this.currentPage = val
                this.getData()
            },
            getData () {
                this.loading = true
                return courseTaskService.getCourseTaskList({
                    // category_id: this.fetchParam.category_id,
                    title: this.fetchParam.title,
                    stime: this.fetchParam.stime,
                    etime: this.fetchParam.etime,
                    type: this.fetchParam.type,
                    deleted: this.fetchParam.deleted,
                    status: this.fetchParam.status,
                    page: this.currentPage,
                    pagesize: this.pagesize,

                }).then((ret) => {
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
