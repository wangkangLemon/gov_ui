<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
        .submit-form {
        width: 90%;
        padding: 20px;
            .select{
                width: 100%;
            }
            .subButton {
                text-align: center;
            }
        }
    }
</style>
<template>
    <main id="medical-form">
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam">
                <el-form-item label="课程名称" prop="course_name">
                    <el-input v-model="fetchParam.course_name"></el-input>
                </el-form-item>
                <el-form-item prop="image" label="封面" :label-width="formLabelWidth">
                    <div class="img-wrap" v-if="fetchParam.image">
                        <img :src="fetchParam.image | fillImgPath" width="200" height="112" alt=""/>
                    </div>
                    <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                                       class="upload-btn"></ImagEcropperInput>
                </el-form-item>
                <el-form-item label="课程标签">
                    <vTags v-model="courseTags"></vTags>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                    <el-input v-model="fetchParam.description" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item prop="content" label="课程内容" id="editor" :label-width="formLabelWidth">
                    <vue-editor v-model="fetchParam.content" @ready="ueReady"></vue-editor>
                </el-form-item>
                <el-form-item label="" >
                    <div>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import courseService from '../../../services/course/courseService.js'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import VueEditor from '../../component/form/UEditor.vue'
    import commonService from '../../../services/commonService.js'
    import vTags from '../../component/form/Tags.vue'


    function clearFn() {
        return {
            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
            name: ''
        }
    }
    export default {
        name: 'course-manage-addCourse-imgtxt',
        components: {
            ImagEcropperInput,VueEditor,vTags
        },
        data() {
            return {
                loadingData: false,
                courseTags: [],
                fetchParam: getOriginData(),
                rules: {
                    course_name:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    image: { required: true, message: '请上传封面图',trigger: 'change'},
                    description: { required: true, message: '请输入简介内容',trigger: 'blur'},
                    content: { required: true, message: '请输入课程内容',trigger: 'blur'},
            },
                formLabelWidth: '120px', // 表单label的宽度
                changelist:{},
            }
        },
        watch:{
            'fetchParam.price'(){
                this.fetchParam.price=Number(this.fetchParam.price)
                console.log('typeof(this.fetchParam.price)===='+typeof(this.fetchParam.price));
            }
        },
        created() {
            console.log(this.$route.params.imgtxtInfo);
            xmview.setContentLoading(false)
            if(this.$route.params.handle=='edit'){ //编辑
                courseService.getImgTxt({
                    contentid:this.$route.params.imgtxtInfo.contentid
                    }).then((ret) => {
                        xmview.setContentTile(`查看课程-图文系列`)
                        this.loadingData=false
                        this.fetchParam= this.imgtxtInfo=JSON.parse(ret)
                        this.courseTags = this.imgtxtInfo.tags ? this.imgtxtInfo.tags.split(',') : []
                    })
            }
            //暂时不获取角色列表       
            this.loadingData=false
        },
        methods: {
             ueReady (ue) {
                this.editor = ue
            },
             cropperFn (data, ext) {
                commonService.commonUploadImageBaseSection({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                    biz: 'course',
                    extpath: 'cover',
                }).then((ret) => {
                    this.fetchParam.image = ret.url 
                    // xmview.showTip('success', '上传成功')
                    // authUtils.setAvatar(ret.data.url)
                })
            },
            getExpertsList (val, length) {
                return courseService.fetchImgTxtList({
                    name: val,
                    // category: this.type,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret) => {
                    this.$emit('changelist', ret)
                    this.changelist = ret;
                    return ret
                })
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let f=Object.assign({},this.fetchParam)
                    f.tags = this.courseTags ? this.courseTags.join(',') : ''
                    let p,data,cid
                    data=JSON.stringify(f)
                    cid=this.$route.params.imgtxtInfo.category_id
                    this.isDisable = true
                    // if (this.fetchParam.contentid) {  // 如果是编辑
                    if (this.$route.params.handle=='edit') {  // 如果是编辑
                        p = courseService.editImgTxt({
                            category_id:cid,
                            id:this.$route.params.imgtxtInfo.contentid,
                            data:data,
                            noJson:0
                            }).then((ret) => {
                                this.isDisable = false
                            this.$router.push({'name':'course-manage-public'})
                        })
                    } else {  //新建
                        p = courseService.createImgTxt({
                            category_id:cid,
                            data:data,
                            noJson:0
                            }).then((ret) => {
                                this.isDisable = false
                            this.$router.push({'name':'course-manage-public'})
                            this.fetchParam.contentid = ret.contentid 
                        })
                    }
                    // let req = courseService.createImgTxt
                    // if (cid) req = courseService.editImgTxt
                    // req(this.fetchParam,this.fetchParam.id).then((ret) => {
                    //     // 重置当前数据
                    //     //this.$refs[fetchParam].resetFields();//自己加的方法
                    //     xmview.showTip('success', '数据提交成功')
                    //     // this.fetchParam=getOriginData(),
                    //     this.$refs['form'].resetFields();
                    //     this.currentData = {
                    //         data: [],
                    //         pindex: -1,
                    //         index: -1
                    //     }
                    //     if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                    //     this.$router.go(-1)
                    // })
                })
            }
      
        }
    }

    function getOriginData() {
         return {
            course_name: '',
            description:'',
            type:'public',
            material_type:'article',
            image:'',
            content:''
        }
    }

</script>