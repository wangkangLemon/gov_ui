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
                <el-form-item label="
                " prop="title">
                    <el-input v-model="fetchParam.title"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="fetchParam.author"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="info">
                    <el-input v-model="fetchParam.info" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item prop="imgUrl" label="封面" :label-width="formLabelWidth">
                    <div class="img-wrap" v-if="fetchParam.image">
                        <img :src="fetchParam.image | fillImgPath" width="200" height="112" alt=""/>
                    </div>
                    <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                                       class="upload-btn"></ImagEcropperInput>
                </el-form-item>
                <el-form-item prop="html" label="资讯内容" id="editor" :label-width="formLabelWidth">
                    <vue-editor v-model="fetchParam.html" @ready="ueReady"></vue-editor>
                    
                </el-form-item>
                <el-form-item label="" >
                    <!--<el-button @click="$router.push({ name:'medical-index'})">取消</el-button>-->
                    <div>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import newsService from '../../../services/gov/newsService.js'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import VueEditor from '../../component/form/UEditor.vue'
    import commonService from '../../../services/commonService.js'
    import authUtils from '../../../utils/authUtils' 


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
        name: 'gov-news-edit',
        components: {
            ImagEcropperInput,VueEditor
        },
        data() {
            return {
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                // passValue: true,
                role_list:[
                    {
                        name: '管理员',
                        id: 1
                    },
                    {
                        name: '部门人员',
                        id: 0
                    },
                ],
                rules: {
                    title:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    author: { required: true, message: '请输入作者姓名',trigger: 'blur'},
                    info: { required: true, message: '请输入简介内容',trigger: 'blur'},
                    html: { required: true, message: '请输入资讯内容',trigger: 'blur'},
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                hospital_list:[],
                formLabelWidth: '120px', // 表单label的宽度
                changelist:{},
                govid:'',
            }
        },
        watch:{
            'fetchParam.price'(){
                this.fetchParam.price=Number(this.fetchParam.price)
                console.log('typeof(this.fetchParam.price)===='+typeof(this.fetchParam.price));
            }
        },
        created() {
            xmview.setContentLoading(false)
            if (this.$route.params.id != undefined) {    //路由id传递
                // this.passValue = false
                newsService.getProduct(this.$route.params.id).then((ret) => {
                    console.log(ret)
                    this.fetchParam = ret
                    this.fillImgPath = ret.image
                    // this.fetchParam.html = ret.html

                    // this.fetchParam.role_id = ret.course.role_id
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
                this.govid=authUtils.getUserInfo().gov_id 
                commonService.commonUploadImageBaseSection({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                    biz: 'gov',
                    extpath: this.govid,
                }).then((ret) => {
                    this.fetchParam.image = ret.url 
                    // xmview.showTip('success', '上传成功')
                    // authUtils.setAvatar(ret.data.url)
                })
            },
            getExpertsList (val, length) {
                return newsService.fetchProductList({
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
                    let req = newsService.createProduct
                    if (this.fetchParam.id) req = newsService.editProduct
                    req(this.fetchParam,this.fetchParam.id).then((ret) => {
                        // 重置当前数据
                        //this.$refs[fetchParam].resetFields();//自己加的方法
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.go(-1)
                    })
                })
            }
        }
    }

    function getOriginData() {
        return {
            title: '',
            author: '',
            info:'',
            image:'',
            html:''
        }
    }

</script>