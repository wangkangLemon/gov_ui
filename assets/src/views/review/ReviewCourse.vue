<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../utils/mixins/common";
    @import "../../utils/mixins/topSearch";

    #course-manage-public-container {
        @extend %content-container;
        border: none;
        .manage-container {
            @extend %right-top-btnContainer;
            >* {
                color: #fff;
                border-radius: 5px;
            } // 添加课程
            .add {
                background: rgb(0, 204, 255);
            } // 管理栏目
            .catmange {
                background: rgb(153, 102, 204);
            }
        }

        .search {
            @extend %top-search-container;
        } // 底部的管理按钮
        .bottom-manage {
            margin-top: 15px;
        }

        .el-dialog__wrapper {
            padding-top: 15px;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
        }
    }
</style>

<template>
    <article id="course-manage-public-container">
        <el-dialog v-model="addForm" :title="formTitle">
            <el-form :model="auditedParam" :rules="rules" ref="form">
                <el-form-item  label="审核结果" :label-width="formLabelWidth">
                    <el-radio-group v-model="auditedParam.audited">
                        <el-radio :label="3">审核不通过</el-radio>
                        <el-radio :label="2">已审核</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="description" label="审核意见" :label-width="formLabelWidth">
                    <el-input v-model="auditedParam.description" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submitAudit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!--<section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({ name:'review-manage-addCourse'})"><i>添加课程</i>
            </el-button>
            <el-button type="warning" icon="menu" @click="$router.push({name:'course-manage-course-category-manage'})">
                <i>管理栏目</i>
            </el-button>
        </section>-->

        <article class="search">
            <section>
                <i>课程名称</i>
                <el-input v-model="fetchParam.course_name" @keyup.enter.native="fetchData"></el-input>
            </section>

            <section>
                <i>状态</i>
                <el-select v-model="fetchParam.audited" placeholder="未选择" @change="fetchData" :clearable="true">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="已审核" value="2"></el-option>
                    <el-option label="审核不通过 " value="3"></el-option>
                    <el-option label="未审核 " value="1"></el-option>
                </el-select>
            </section>

            <section><i>栏目</i>
                <CourseCategorySelect :onchange="fetchData" v-model="fetchParam.category_id"></CourseCategorySelect>
            </section>

            <DateRange title="创建时间" :start="fetchParam.time_start" :end="fetchParam.time_end" @changeStart="val=> fetchParam.time_start=val "
                @changeEnd="val=> fetchParam.time_end=val" :change="fetchData">
            </DateRange>

            <!--<section>
                <i>课后考试</i>
                <el-select v-model="fetchParam.need_testing" placeholder="未选择" @change="fetchData" :clearable="true">
                    <el-option label="不需要" value="0"></el-option>
                    <el-option label="需要" value="1"></el-option>
                </el-select>
            </section>-->
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" @select="selectRow" @select-all="selectRow"
            border>
            <!--<el-table-column type="selection"></el-table-column>-->
            <el-table-column min-width="200" prop="course_name" label="课程">
            </el-table-column>
            <el-table-column min-width="200" prop="category_name" label="所属栏目">
            </el-table-column>
            <el-table-column width="80" label="题目数">
                <template scope="scope">
                    <el-button style="width: 100%" @click="$router.push({name: 'review-manage-addCourse', params: {courseInfo: scope.row, tab:'second'}})"
                        type="text" size="small">{{scope.row.subject_num}}
                        <!--a-->
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column width="80" prop="total_score" label="总分数">
            </el-table-column>
            <el-table-column width="80" prop="limit_time" label="限时">
            </el-table-column>
            <el-table-column width="100" label="状态">
                <!--<template scope="scope">
                    <el-tag v-if="scope.row.audited == 0" type="success">正常</el-tag>
                    <el-tag v-else-if="scope.row.audited == 2" type="primary">转码中</el-tag>
                    <el-tag v-else>已禁用 </el-tag>
                </template>-->
                <template scope="scope">
                    <el-tag v-if="scope.row.audited == 2" type="success">已审核</el-tag>
                    <el-tag v-else-if="scope.row.audited == 1" type="primary">未审核</el-tag>
                    <el-tag v-else>审核未通过 </el-tag>
                </template>
            </el-table-column>
            <el-table-column width="190" prop="addate" label="创建时间">
            </el-table-column>
            <!--<el-table-column width="100" prop="description" label="审核意见">
            </el-table-column>-->
            <el-table-column fixed="right" width="227" label="操作">
                <template scope="scope">
                    <el-button @click="$router.push({name: 'review-manage-addCourse', params: {courseInfo: scope.row}, query: {id: scope.row.contentid}})"
                        type="text" size="small">查看
                    </el-button>
                    <!--<el-button @click="audit(scope.$index, scope.row)" type="text" size="small">
                        <i>{{ scope.row.audited == 1 ? '审核通过 ' : '审核不通过 ' }}</i>
                    </el-button>-->

                    <el-button v-if="scope.row.audited == 1" @click="showDialog(scope.$index, scope.row)" type="text" size="small">
                        <i>{{ '审核' }}</i>
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>

                    <!--<el-button v-if="scope.row.subject_num > 0" @click="$router.push({name:'course-manage-course-answer-analysis', params:{id:scope.row.id}})"
                        type="text" size="small">答案分析
                    </el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page"
            :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100, 130, 160, 200]" layout="sizes,total, prev, pager, next"
            :total="total">
        </el-pagination>

        <!--底部的批量删除和移动两个按钮-->
        <!--<div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>-->

        <!--移动子栏目的弹出框-->
        <div class="el-dialog__wrapper" v-show="dialogTree.isShow">
            <article class="el-dialog el-dialog--tiny">
                <section class="el-dialog__header">
                    <i>移动课程到</i>
                </section>
                <section class="el-dialog__body">
                    <CourseCategoryTree node-key="id" :onNodeClick="(data) => dialogTree.selectedId=data.value"></CourseCategoryTree>
                </section>
                <section class="el-dialog__footer">
                    <span class="dialog-footer">
                          <el-button @click="dialogTree.isShow = false">取 消</el-button>
                        <el-button type="primary" @click="moveToCat">确 定</el-button>
                    </span>
                </section>
            </article>
        </div>
    </article>
</template>

<script>
    import courseService from '../../services/course/courseService.js'
    import DateRange from '../component/form/DateRangePicker.vue'
    import CourseCategorySelect from '../component/select/CourseCategory.vue'
    // import CourseCategoryTree from '../../component/tree/CourseCategory.vue'
    import CourseCategoryTree from '../component/tree/CourseCategory.vue'

    function getFetchParam() {
        return {
            gov_id: void 0, // 部门id
            category_id: void 0, // 栏目id
            course_name: '',
            type: '',
            page: 1,
            pagesize: 15,
            level: void 0,
            time_start: void 0,
            time_end: void 0,
            need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
            audited: '', // 全部：-1   1：未审核 2：已审核 3：审核不通过
            description: '',
            contentid: void 0,
        }
    }
    export default {
        data() {
            return {
                loadingData: false,
                data: [], // 表格数据
                total: 0,
                dialogVisible: false,
                selectedIds: [], // 被选中的数据id集合
                fetchParam: getFetchParam(),
                auditedParam: {
                    audited: null,
                    description: ''
                },
                dialogTree: {
                    isShow: false,
                    selectedId: void 0,
                },
                // audited: '',
                // 表单相关属性
                formTitle: '审核内容',
                addForm: false, // 表单弹窗是否显示
                rules: {
                    audited: [{
                        required: true,
                        message: '必须填写'
                    }],
                },
                formLabelWidth: '120px', // 表单label的宽度
                auditedRow: {}, // 列表和审核框绑定row
            }
        },
        activated() {
            this.fetchData()
            xmview.setContentLoading(false)
        },
        methods: {
            initFetchParam() {
                this.fetchParam = getFetchParam()
            },
            handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
            },
            handleSizeChange(val) {
                this.fetchParam.pagesize = val
                this.fetchData()
            },
            //获取列表数据
            fetchData(val) {
                this.loadingData = true
                let obj = Object.assign({}, this.fetchParam)
                if (obj.audited === '') {
                    obj.audited = -1
                }
                return courseService.getReviewCourselist(obj).then((ret) => {
                    this.data = ret.data
                    this.total = ret._exts.total
                    this.loadingData = false
                    xmview.setContentLoading(false)
                    // this.fetchParam.audited = '';
                })
            },
            // 单行被选中
            selectRow(selection) {
                let ret = []
                selection.forEach((item) => {
                    ret.push(item.id)
                })
                this.selectedIds = ret
            },
            // 	已审核 或者未审核课程 全部：-1 1：未审核 2：已审核 3：审核不通过
            showDialog(index, row) {
                this.addForm = true
                this.fetchParam.contentid = row.contentid
                this.auditedRow = row
            },
            //提交审核
            submitAudit(form, row) {
                this.$refs[form].validate((valid) => {
                    if (!valid) return
                    courseService.auditCourse({
                        course_id: this.fetchParam.contentid,
                        audited: this.auditedParam.audited,
                        description: this.auditedParam.description,
                    }).then((ret) => {
                        // 重置当前数据
                        this.addForm = false
                        this.$refs[form].resetFields();
                        console.log(this.auditedParam.audited)
                        this.auditedRow.audited = this.auditedParam.audited;
                    })
                })
            },
            // 单条删除
            del(index, row) {
                xmview.showDialog(`你将要删除课程 <span style="color:red">${row.course_name}</span> 操作不可恢复确认吗?`, () => {
                    courseService.deleteCourse({
                        course_id: row.contentid
                    }).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.data.splice(index, 1)
                    })
                })
            },
            moveToCat() {
                courseService.moveCourseToCategoryMulty({
                    id: this.selectedIds.join(','),
                    catid: this.dialogTree.selectedId
                }).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData() // 重新刷新数据
                    }, 300)
                })
            },
            // 批量删除
            delMulti() {
                xmview.showDialog(`你将要删除选中的课程，操作不可恢复确认吗?`, () => {
                    courseService.deleteCourseMulty({
                        id: this.selectedIds.join(',')
                    }).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.dialogTree.isShow = false
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
                })
            },
        },
        components: {
            DateRange,
            CourseCategorySelect,
            CourseCategoryTree
        }
    }
</script>