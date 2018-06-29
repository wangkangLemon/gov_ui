<!--添加任务模板-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/mixins";

    .create-course-task {
        @extend %content-container;
        background: #fff;
        padding: 20px;
        .el-form {
            width: 60%;
            img {
                width: 35%;
                // height: 50%
            }
        }
        /*.search {
            @extend %top-search-container;
        }*/
        .collection {
            align-items: center;
            min-height: 36px;
            border-radius: 4px;
            padding: 3px 30px 3px 10px;
            border: 1px solid #bfcbd9;
        }

        .u-course-tag {
            margin-right: 10px;
            background-color: rgba(32,160,255,.1);
            display: inline-block;
            padding: 0 10px;
            height: 32px;
            line-height: 30px;
            font-size: 12px;
            color: #20a0ff;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid rgba(32,160,255,.2);
            white-space: nowrap;
            &:last-child {
                margin-right: 0;
            }
        }
        .el-tabs__content {
            position: relative;
            .dialog-select-item {
                h5 {
                    line-height: 40px;
                    font-size: 14px;
                    padding-left: 20px;
                    background: #fbfdff;
                    border: 1px solid #d1dbe5;
                    border-bottom: none;
                }
                position: absolute;
                top: 54px;
                right: 120px;
                height: 500px;
                width: 42%;
                display: inline-block;
                vertical-align: top;
            }
        }
        .row-class {
            border: 1px solid #d1dbe5;
        }

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
    <article class="create-course-task">
        <el-form :model="form" :rules="rules" label-position="right" ref="form" label-width="120px" style="width: 60%">

            <el-form-item prop="title" label="标题">
                <el-input v-model="form.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input v-model="form.description" auto-complete="off" :rows="6" type="textarea"></el-input>
            </el-form-item>
            <el-form-item prop="image" label="任务封面图">
                <div class="img-wrap" v-if="form.image">
                    <img :src="form.image | fillImgPath" alt=""/>
                </div>
                <!--<ImagEcropperInput :isRound="false" :aspectRatio="2.15" :confirmFn="cropperFn"-->
                <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                                   class="upload-btn"></ImagEcropperInput>
            </el-form-item>
            <!--  1课程  -->
            <el-form-item prop="course" label="选择课程" v-if="this.t==1||this.$route.params.type=='add'">
                <el-tag style="margin-right: 3px"
                        v-for="(c,index) in form.course" :key="index"
                        :closable="true"
                        @close="form.range.splice(index,1)"
                        type="success">
                    {{c.course_name}}
                </el-tag>
                <el-button type="primary" @click="dialogCourse.isShow=true" size="small">添加课程</el-button>
            </el-form-item>
             <!--  2考试  -->
             <el-form-item prop="categorys" label="选择范围" v-if="this.t==2">
                <el-tag style="margin-right: 3px"
                        v-for="(c,index) in form.categorys" :key="index"
                        @close="form.categorys.splice(index,1)"
                        type="success">
                    {{c.name}}
                </el-tag>
                <!-- <el-button type="primary" @click="dialogTree.isShow=true" size="small">选取范围</el-button> -->
            </el-form-item>
            <el-form-item prop="single_score" label="单选题" v-if="this.t==2">
                <el-input-number v-model="form.single_num" :disabled="true" class="shortInput"></el-input-number> 个，
                每题 <el-input-number class="shortInput" v-model="form.single_score" :disabled="true" ></el-input-number> 分
            </el-form-item>
            <el-form-item prop="multi_score" label="多选题" v-if="this.t==2">
                <el-input-number v-model="form.multi_num" :disabled="true" class="shortInput"></el-input-number> 个，
                每题 <el-input-number class="shortInput" v-model="form.multi_score" :disabled="true" ></el-input-number> 分
            </el-form-item>
            <el-form-item prop="judgment_score" label="判断题" v-if="this.t==2">
                <el-input-number v-model="form.judgment_num" :disabled="true" class="shortInput"></el-input-number> 个，
                每题 <el-input-number class="shortInput" v-model="form.judgment_score" :disabled="true"></el-input-number> 分
            </el-form-item> 
                <el-form-item label="试题总数" prop="total_subject" v-if="this.t==2">
                <p>{{form.single_num+form.multi_num+form.judgment_num}}个</p>
            </el-form-item>
            <el-form-item label="试卷总分" prop="total_score" v-if="this.t==2">
                <p>{{form.single_score*form.single_num+form.multi_score*form.multi_num+form.judgment_score*form.judgment_num}}分</p>
            </el-form-item>
            <el-form-item prop="pass_score" label="及格分数" v-if="this.t==2">
                <el-input-number v-model="form.pass_score" :disabled="true"
                                ></el-input-number>
            </el-form-item>  
           
            
            <!-- <el-form-item prop="sort" label="排序">
                <el-input-number v-model="form.sort" auto-complete="off"></el-input-number>
            </el-form-item> -->
            <el-form-item label="时间" prop="etime">
                <DateRange :start="form.stime" :end="form.etime" @changeStart="val=> form.stime=val"
                    @changeEnd="val=> form.etime=val" :defaultStart="form.stime" :defaultEnd="form.etime">
                </DateRange>
            </el-form-item>
            <el-form-item label="发布对象">
                <el-select clearable v-model="form.type" @change="choosePushType" placeholder="请选择指定人员或部门">
                    <el-option label="全部" :value="3"></el-option>
                    <el-option label="部门任务" :value="1"></el-option>
                    <el-option label="个人任务" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                :label="pushTypeDialog.title"
                v-if="form.type!=3 && form.type==pushTypeDialog.type">
                <div class="collection" @click="openPushTypeDialog">
                    <el-tag
                        class="u-course-tag"
                        v-for="item in pushTypeDialog.selectedData[this.pushTypeDialog.type]"
                        :key="item.id">
                        {{item.name}}
                    </el-tag>
                </div>
            </el-form-item>
            <el-form-item label="可得学分" prop="score">
                <el-input style="width: auto;" v-model="form.score" type="number" :min="0" placeholder="请输入可获得学分值"></el-input>
            </el-form-item>
            <el-form-item v-if="this.$route.params.add== 1">
                <el-button type="primary" @click="submit(0)">提交</el-button>
                <!--<el-button type="warning" @click="submit(1)">存草稿</el-button>-->
            </el-form-item>
        </el-form>

        <!-- 选择课程弹窗 -->
        <dialogSelectData ref="dialogSelect" v-model="dialogCourse.isShow" :getData="fetchCourse" title="选择课程"
                          :selectedList="form.course" @changeSelected="val=>form.course=val"  item-key="contentid">
            <div slot="search" class="course-search">
                <el-input @keyup.enter.native="$refs.dialogSelect.fetchCourse(true)" v-model="dialogCourse.course_name"
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
                        <i>部门</i>
                        <DepSelect v-model="pushTypeDialog.fetchParam.gov_id" :change="getPushTypeData"></DepSelect>
                    </section>
                </section>
            </template>
            <Transfer placeholder="搜索"
                      @searchFn="(val)=>{pushTypeDialog.page=1;pushTypeDialog.fetchParam.name=val;fetchPushTypeData();}"
                      @moreFn="()=>{pushTypeDialog.page++;fetchPushTypeData('no-clear');}"
                      :total="pushTypeDialog.total"
                      :data="pushTypeDialog.data"
                      :selectedValue='selectData'
                      v-model="pushTypeDialog.selectedData[pushTypeDialog.type]"></Transfer>
            <span slot="footer" class="dialog-footer" >
                <el-button @click="pushTypeDialog.showDialog = false">取 消</el-button>
                <el-button type="primary" @click="transferConfirmFn">确 定</el-button>
            </span>
        </el-dialog>

    </article>
</template>

<script>
    import Transfer from '../../component/dialog/Transfer.vue'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputTask.vue'
    import courseTaskService from '../../../services/server/courseTaskService.js'
    import courseService from '../../../services/course/courseService.js'
    import commonService from '../../../services/commonService.js'
    import govService from '../../../services/gov/govService.js'
    import userService from '../../../services/gov/userService.js'
    import dialogSelectData from '../../component/dialog/SelectData4table.vue'
    import DateRange from '../../component/form/DateRangePicker.vue'
    import DepSelect from '../../component/select/DepartmentNoself.vue'


    export default{
        name: 'server-manage-add',
        computed: {
            id () {
                return this.$route.query.id
            },
        },
        data () {
            return {
                selectData:[],
                form: {                // 表单属性值
                    id: void 0,
                    title: void 0,          // 标题
                    // category_id: void 0,       // 分类
                    image: void 0,        // 图片地址
                    description: void 0,  // 简介
                    // sort: void 0,         // 排序
                    course_ids: [],     // 课程
                    gov_ids: '',     // 部门
                    user_ids: '',     // 用户
                    // status: void 0, // 状态
                    course: [],
                    score:void 0,     // 可获得学分
                    type:void 0,       // 任务类型 1:部门 2:人员
                    stime:'',
                    etime:'',
                    task_type:void 0,
                    exam_id:'',

                },
                rules: {
                    title:  [
                        {required: true,  message: '请输入任务标题', trigger: 'blur'},
                        {
                            min: 1,
                            max: 40,
                            message: '长度不得大于 40 个字符'
                        },{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的标题'
                        }
                    ],
                    description: [{required: true, pattern:  /\S$/, min: 1,message: '请输入非空格或非特殊字符的描述', trigger: 'blur'}],
                    image: [{required: true, message: '必须填写', trigger: 'blur'}],
                    stime: [{required: true, message: '必须填写', trigger: 'change'}],
                    etime: [{required: true, message: '必须填写', trigger: 'change'}],
                    type: [{required: true, message: '必须填写', trigger: 'change'}],
                    // score: [{required: true, message: '必须填写', trigger: 'blur'}],
                    // sort: [{required: true, message: '必须填写'}],
                    course: [{ required: true, message: '必须填写'}],
                    // category_id: {type: 'number', required: true, message: '请选择栏目', trigger: 'change'}
                },
                dialogCourse: {
                    loading: false,
                    isShow: false,
                    course_name: void 0,
                },
                pushTypeDialog: { //发布对象数据模型
                    fetchParam: {
                        gov_id: '',
                        gov_ids: '',
                        name: '',
                        noself: 1
                    },
                    title: '',
                    isSearch: '',
                    type: '',
                    showDialog: false,
                    selectedData: {
                        2: [],
                        1: []
                    },
                    data: [],
                    page: 1,
                    pagesize: 15,
                    total: 0,
                },
                t:this.$route.params.taskType,
            }
        },
        watch:{
            // 'form.type'(){
                //     if(this.form.type==1){//政府
                //         this.form.user_ids= ''
                //     }else{ //政府
                //         this.form.gov_ids= ''
                //     }
                // },
        },
        created () {
            xmview.setContentLoading(false)
            let t=this.$route.params.taskInfo
            if (t) {
                let req = courseTaskService.getTask
                if (this.$route.params.type=="template") {req = courseTaskService.getCourseTaskTemplateEditDetail}
                req(this.$route.query.id).then((ret) => {
                    this.form = Object.assign(this.form, ret.data)
                    // this.form.course_ids=ret.data.courses
                    let txt=t.task_type==1?'课程':'考试'
                    // if(this.$route.params.type=="look"){
                    //     xmview.setContentTile( `查看${txt}任务`)
                    //     // xmview.setContentTile(`编辑课程-中草药 ${ this.category_name}`)
                    //     this.form.stime =  ret.data.start_date.split(' ')[0]
                    //     this.form.etime =  ret.data.end_date.split(' ')[0]
                    //     this.form.type =   ret.data.type
                    //     this.pushTypeDialog.type = ret.data.type
                    // }
                    // 选择课程
                    if(t.task_type==1){
                        xmview.setContentTile( '添加课程任务')
                        this.form.task_type=1
                        this.form.course = ret.data.courses.map(v=>{
                            v.contentid = v.course_id
                            return v
                        }) 
                        this.$refs.dialogSelect.setSelected()
                    }
                    // //选择栏目
                    if(t.task_type==2){
                        xmview.setContentTile( '添加考试任务')
                        
                        this.form.task_type=2
                        let e=ret.data.exam
                        this.form.exam_id=e.id
                        for(let i in e){  
                            this.form[i]=e[i]   
                        } 
                        this.form.categorys = e.categorys.map(v=>{
                            v.contentid = v.id
                            return v
                        }) 
                    }
                    if(this.$route.params.type=="look"){
                        xmview.setContentTile( `查看${txt}任务`)
                        // xmview.setContentTile(`编辑课程-中草药 ${ this.category_name}`)
                        this.form.stime =  ret.data.start_date.split(' ')[0]
                        this.form.etime =  ret.data.end_date.split(' ')[0]
                        this.form.type =   ret.data.type
                        this.pushTypeDialog.type = ret.data.type
                    }

                    this.choosePushType()
                    if(ret.data.govs.length!==0){
                        this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = this.generatorList(ret.data.govs || [])
                    }
                    else if(ret.data.users.length!==0){
                        this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = this.generatorList(ret.data.users || [])
                    }
                    xmview.setContentLoading(false)
                })
            }

            this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = []
        },
        methods: {
            transferConfirmFn () {
                this.pushTypeDialog.showDialog = false
            },
            //打开发布对象弹出框
            openPushTypeDialog () {
                this.pushTypeDialog.showDialog = true
                this.pushTypeDialog.page = 1
                this.pushTypeDialog.fetchParam.gov_id = ''
                this.pushTypeDialog.fetchParam.gov_ids = ''
                this.pushTypeDialog.fetchParam.name = ''
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
                if(param!=undefined){
                    this.pushTypeDialog.title = param.label
                    this.pushTypeDialog.isSearch = param.isSearch
                    this.pushTypeDialog.type = param.type
                }

            },
            getPushTypeData () {
                this.pushTypeDialog.page = 1
                this.fetchPushTypeData()
            },
            fetchPushTypeData (type) {
                type !== 'no-clear' && (this.pushTypeDialog.data = [])
                let map = {
                    1: govService.getSelectList,  //部门
                    2: userService.fetchData,  //人员
                    // user_group: userService.userGroupSearch
                }
                let param = {
                    name: this.pushTypeDialog.fetchParam.name,
                    page: this.pushTypeDialog.page,
                    pagesize: this.pushTypeDialog.pagesize,
                    noself:1  
                }

                if (this.pushTypeDialog.isSearch) {
                    param.gov_id = this.pushTypeDialog.fetchParam.gov_id
                    param.role_id = -1
                    param.noself = 1
                }
                map[this.pushTypeDialog.type](param).then(ret => {
                    // this.pushTypeDialog.total = ret._exts.total
                    this.pushTypeDialog.total = ret._exts.total
                    // if (this.pushTypeDialog.data.length > 0 && this.pushTypeDialog.data.length < ret._exts.total) {
                    if (this.pushTypeDialog.data.length > 0 ) {
                        this.pushTypeDialog.data.splice(-1, 1)
                    }
                    this.pushTypeDialog.data.push(...ret.data, {id: -1}) //暂无id:-1 字段
                    // this.pushTypeDialog.data.push(...ret.data) //暂无id:-1 字段
                    //  this.pushTypeDialog.data.forEach(item => { item.type = 'exam' })
                })
            },
            generatorList (arr) {
                return arr.map(item => {
                    return {
                        id: item['gov_id'] || item['user_id'] || item['group_id'],
                        name: item['gov_name'] || item['user_name'] || item['group_name']
                    }
                })
            },
            cropperFn(data, ext) {
                commonService.commonUploadImageBaseSection({
                    image: data,
                    alias: `${Date.now()}${ext}`
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.form.image = ret.url // 显示图片
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
                    // this.form.course_ids = []
                    // this.form.course.forEach((c) => {
                    //     this.form.course_ids.push(c.id)
                    // })
                      this.form.course.forEach((c) => {
                        this.form.course_ids.push(c.contentid||c.course_id) //开始出错
                    })
                    this.form.course_ids = this.form.course_ids.join(',')


                    if(this.form.type==1){
                        // 处理govids
                        this.form.gov_ids = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                        return item.id
                        }).join(',')
                    }else if(this.form.type==2){
                        // 处理userids
                        this.form.user_ids = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                        return item.id
                        }).join(',')
                    }


                    // this.fetchParam.end_time = this.timeFormatter(this.fetchParam.end_time, true)

                    if (s > 0) { //存草稿箱
                        this.form.status = s
                    }
                    let reqFn = courseTaskService.submitTask
                    if (this.form.id) {
                        if(this.$route.params.type=="template"){
                            reqFn = courseTaskService.submitTask
                        }else{
                            reqFn = courseTaskService.editTask
                        }
                    }
                    reqFn(this.form).then((ret) => {
                        xmview.showTip('success', '保存成功')
                        this.$router.push({name:'server-coursetask'})
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            }
        },
        components: {DateRange,ImagEcropperInput, dialogSelectData, Transfer, DepSelect }
    }
</script>
