<!--添加任务模板-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/mixins";

    #company-coursetask-addcoursetamplte {
        @extend %content-container;

        .course-search {
            margin-bottom: 12px;
            .el-input {
                width: 150px;
                ::-webkit-input-placeholder {
                    font-size: 13px
                }
            }
        }
    }
</style>

<template>
    <article id="company-coursetask-addcoursetamplte">
        <el-form :model="form" :rules="rules" label-position="right" ref="form" label-width="120px" style="width: 60%">
            
            <el-form-item prop="title" label="标题">
                <el-input v-model="form.title" auto-complete="off"></el-input>
                
            </el-form-item>

            <el-form-item prop="description" label="描述">
                <el-input v-model="form.description" auto-complete="off" :rows="6" type="textarea"></el-input>
            </el-form-item>
            <el-form-item prop="imgUrl" label="封面">
                <div class="img-wrap" v-if="form.image">
                    <img :src="form.image | fillImgPath" alt=""/>
                </div>
                <ImagEcropperInput :isRound="false" :aspectRatio="2.15" :confirmFn="cropperFn"
                                   class="upload-btn"></ImagEcropperInput>
            </el-form-item>
            <el-form-item prop="course" label="选择课程">
                <el-tag style="margin-right: 3px"
                        v-for="(c,index) in form.course" :key="index"
                        :closable="true"
                        @close="form.courses.splice(index,1)"
                        type="success">
                    {{c.name}}
                <!--c-->
                </el-tag>
                <el-button type="primary" @click="dialogCourse.isShow=true" size="small">添加课程</el-button>
            </el-form-item>
            <el-form-item prop="sort" label="排序">
                <el-input-number v-model="form.sort" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item label="时间">
                <DateRange :start="form.create_start" :end="form.create_end" @changeStart="val=> form.create_start=val "
                    @changeEnd="val=> form.create_end=val" >
                </DateRange>
            </el-form-item>
            <el-form-item label="发布对象" prop="type">
                <el-select clearable v-model="form.type" @change="choosePushType" placeholder="请选择指定人员或部门">
                    <el-option label="部门任务" value="1"></el-option>
                    <el-option label="个人任务" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                :label="pushTypeDialog.title" 
                v-if="form.type && form.type===pushTypeDialog.type">
                <div class="collection" @click="openPushTypeDialog">
                    <el-tag 
                        class="u-course-tag"
                        v-for="item in pushTypeDialog.selectedData[this.pushTypeDialog.type]" 
                        :key="item.id">
                        {{item.name}}
                    </el-tag>
                </div>
            </el-form-item>
            <!--<el-form-item prop="gov_ids" label="选择部门">
                
            </el-form-item>
            <el-form-item prop="user_ids" label="选择人员">
                
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="submit(0)">提交</el-button>
                <!--<el-button type="warning" @click="submit(1)">存草稿</el-button>-->
            </el-form-item>
        </el-form>

        <!-- 选择课程弹窗 -->
        <dialogSelectData ref="dialogSelect" v-model="dialogCourse.isShow" :getData="fetchCourse" title="选择课程"
                          :selectedList="form.course" @changeSelected="val=>form.course=val">
            <div slot="search" class="course-search">
                <el-input @keyup.enter.native="$refs.dialogSelect.fetchCourse(true)" v-model="dialogCourse.keyword"
                          icon="search"
                          placeholder="请输入关键字搜索"></el-input>
            </div>
        </dialogSelectData>
        <!-- 发布对象弹窗 -->
        <el-dialog 
            :title="pushTypeDialog.title" 
            :visible.sync="pushTypeDialog.showDialog" 
            v-if="pushTypeDialog.showDialog">
            <template v-if="pushTypeDialog.isSearch">
                <section class="search">
                    <section>
                        <i>111111111111</i>
                        <DepSelect v-model="pushTypeDialog.form.department_id" :change="getPushTypeData"></DepSelect>
                    </section>
                </section>
            </template>
            <Transfer placeholder="搜索"
                      @searchFn="(val)=>{pushTypeDialog.page=1;pushTypeDialog.form.keyword=val;fetchPushTypeData();}"
                      @moreFn="()=>{pushTypeDialog.page++;fetchPushTypeData('no-clear');}" 
                      :total="pushTypeDialog.total"
                      :data="pushTypeDialog.data"
                      v-model="pushTypeDialog.selectedData[pushTypeDialog.type]"></Transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushTypeDialog.showDialog = false">取 消</el-button>
                <el-button type="primary" @click="transferConfirmFn">确 定</el-button>
            </span>
        </el-dialog>

    </article>
</template>

<script>
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import courseTaskService from '../../../services/server/courseTaskService.js'
    import courseService from '../../../services/course/courseService.js'
    import dialogSelectData from '../../component/dialog/SelectData4table.vue'
    import DateRange from '../../component/form/DateRangePicker.vue'


    export default{
        name: 'coursetask-template-add',
        data () {
            return {
                form: {                // 表单属性值
                    id: void 0,
                    title: void 0,          // 标题
                    category_id: void 0,       // 分类
                    image: void 0,        // 图片地址
                    description: void 0,  // 简介
                    sort: void 0,         // 排序
                    course_id: void 0,     // 课程
                    status: void 0,       // 状态
                    category_name: '', // 名字
                    course: [],
                    type:void 0,       //任务类型
                },
                rules: {
                    title: [
                        {required: true, message: '必须填写', trigger: 'blur'}
                    ],
                    category_id: {type: 'number', required: true, message: '请选择栏目', trigger: 'change'}
                },
                dialogCourse: {
                    loading: false,
                    isShow: false,
                    keyword: void 0,
                },
                pushTypeDialog: { //发布对象数据模型
                    fetchParam: {
                        department_id: '',
                        keyword: ''
                    },
                    title: '',
                    isSearch: '',
                    type: '',
                    showDialog: false,
                    selectedData: {
                        user: [],
                        user_group: [],
                        department: []
                    },
                    data: [],
                    page: 1,
                    page_size: 15,
                    total: 0,
                },
            }
        },
        created () {
            xmview.setContentLoading(false)
            if (this.$route.params.item) {
                this.form = this.$route.params.item
                xmview.setContentTile('编辑课程任务模板-企业')
                this.choosePushType()
            }
        },
        methods: {
            //打开发布对象弹出框
            openPushTypeDialog () {
                this.pushTypeDialog.showDialog = true
                this.pushTypeDialog.page = 1
                this.pushTypeDialog.fetchParam.department_id = ''
                this.pushTypeDialog.fetchParam.keyword = ''
                this.fetchPushTypeData()
            },
            //选择发布对象
            choosePushType(){
                let map = {
                    1: {
                        type: '1',
                        label: '选择部门',
                        isSearch: false,
                    },
                    2: {
                        type: '2',
                        label: '选择人员',
                        isSearch: true,
                    }
                }
                let param = map[this.form.type]
                // console.log(param)
                this.pushTypeDialog.title = param.label
                this.pushTypeDialog.isSearch = param.isSearch
                this.pushTypeDialog.type = param.type
            },
            getPushTypeData () {
                this.pushTypeDialog.page = 1
                this.fetchPushTypeData()
            },
            fetchPushTypeData (type) {
                type !== 'no-clear' && (this.pushTypeDialog.data = [])
                let map = {
                    2: depService.getDepartmentByName,
                    1: userNameList,
                    // user_group: userService.userGroupSearch
                }
                let param = {
                    keyword: this.pushTypeDialog.fetchParam.keyword,
                    page: this.pushTypeDialog.page,
                    page_size: this.pushTypeDialog.page_size
                }
                if (this.pushTypeDialog.isSearch) {
                    param.department_id = this.pushTypeDialog.fetchParam.department_id
                }
                map[this.pushTypeDialog.type](param).then(ret => {
                    this.pushTypeDialog.total = ret.total
                    if (this.pushTypeDialog.data.length > 0 && this.pushTypeDialog.data.length < ret.total) {
                        this.pushTypeDialog.data.splice(-1, 1)
                    }
                    this.pushTypeDialog.data.push(...ret.data, {id: -1})
                })
            },
            cropperFn(data, ext) {
                courseTaskService.CourseTaskTemplateUploadUrl({
                    avatar: data,
                    alias: `${Date.now()}${ext}`
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.form.image = ret.data.url // 显示图片
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            fetchCourse (params) {
                return courseService.getPublicCourselist(Object.assign({}, this.dialogCourse, params))
            },
            submit(s) {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    // 处理课程id
                    this.form.course_id = []
                    this.form.course.forEach((c) => {
                        this.form.course_id.push(c.id)
                    })
                    this.form.course_id = this.form.course_id.join(',')
                    if (s > 0) {
                        this.form.status = s
                    }
                    let reqFn = courseTaskService.addCourseTaskTemplate
                    if (this.form.id) {
                        reqFn = courseTaskService.updateCourseTaskTemplate
                    }
                    reqFn(this.form).then((ret) => {
                        xmview.showTip('success', '保存成功')
                        this.$router.back()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            }
        },
        components: {DateRange,ImagEcropperInput, dialogSelectData}
    }
</script>
