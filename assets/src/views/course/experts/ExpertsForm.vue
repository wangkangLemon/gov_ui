<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
  
        /*.upload-avatar{
            width:30%;
            text-align: center;
            .img-container {
            margin: 20px auto;
            width: 170px;
            height: 170px;
            border: none;
            >img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #ededed;
            }
        }
        }*/
        .submit-form {
        width: 45%;
        padding: 20px;
            .select{
                width: 100%;
            }
            .subButton {
                text-align: center;
            }
            span{
                width:200px;
            }
            div{
                text-align: center
            }
    }
    }
</style>
<template>
    <main id="medical-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="imgUrl" />
            </div>
            <!--<ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput>-->
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam">
                
                <el-form-item label="姓名" prop="name">
                    <el-input v-model.name="fetchParam.name"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="price">
                    <el-input v-model.address="fetchParam.nickname"></el-input>
                </el-form-item>
                <!--<el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="fetchParam.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model.mobile="fetchParam.mobile"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-if="this.$route.params.id">
                    <el-input v-model.password="fetchParam.password" auto-complete="off" type="password" key=""  placeholder="密码、不修改请留空"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-else>
                    <el-input v-model.password="fetchParam.password" auto-complete="off" type="password" key=""  ></el-input>
                </el-form-item>

                <!--<el-form-item label="部门" prop="gov_id" :fetch-suggestions="querySearch">
                    <el-select class="select" v-model="fetchParam.gov_id" placeholder="请选择部门">
                        <el-option  v-for="item in  gov_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="角色" prop="role_id" :fetch-suggestions="querySearch">
                    <el-select class="select" v-model="fetchParam.role_id" placeholder="请输入角色">
                        <el-option  v-for="item in  role_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
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
    import userService from '../../../services/gov/userService.js'
    import mineService from '../../../services/base/mineService'
    import govService from '../../../services/gov/govService.js'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import clone from 'clone'

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
        name: 'person-edit',
        components: {
            ImagEcropperInput
        },
        data() {
            return {
                imgUrl: '',
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
                    role_id: { required: true, message: '请输入角色'},
                    gov_id:{ required: true },
                    name: { required: true, message: '请输入姓名'},
                    sex: { required: true },
                    mobile: { pattern: /^1[34578]\d{9}$/, required: true, type: 'string', message: '请输入正确的手机号', trigger: 'blur' },
                    email: { pattern: /^\w+([-+.]\w+)*@\w+([-+.]\w+)*.\w+([-+.]\w+)*$/, required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    // password: {  pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,required: true, message: '请输入6-12位包含数字与字母的密码', trigger: 'blur' },
                    password: { required: !this.$route.params.id, message:  !this.$route.params.id?'请输入密码':'密码、不修改请留空', trigger: 'blur' },
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                gov_list:[],
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.id != undefined) {    //路由id传递
                    // this.passValue = false
                    userService.getAdminInfo(this.$route.params.id).then((ret) => {
                        this.fetchParam = ret
                        console.log(ret)
                        // this.fetchParam.role_id = ret.course.role_id
                    })
                } 
            //暂时不获取角色列表       
             this.getrole()
            this.loadingData=false;
        },
        activated () {
            this.getrole()
        },
        methods: {
            // passFn(){
            //     return this.$route.params.id != undefined?false:true
            // },
            // 裁切后的回调
            cropperFn(data, ext) {
                mineService.uploadAvatar({
                    avatar: data,
                    alias: `${Date.now()}${ext}`
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.imgUrl = data
                    authUtils.setAvatar(ret.data.url)
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            
            //获取角色组下拉列表
            getrole(val){
                govService.getSelectList({pagesize:-1}).then((ret)=>{
                 this.gov_list=ret.data;
                })
            },

            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = userService.create
                    if (this.fetchParam.id) req = userService.update
                    console.log(this.fetchParam.id)
                    req(this.fetchParam).then((ret) => {
                        console.log(111111111111)
                        console.log(ret)
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
            },
            //拿到角色组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
      
            saveResult() {
                let result = [{
                    id: 0,
                    name: '',
                    sort: 0,
                    deleted: false,
                    lessons: []
                }]
            },
        }
    }

    function getOriginData() {
        return {
            role_id: '',
            role:'',
            role_name:'',
            category_name: '请选择栏目',
            name: '',
            mobile: '',
            email: '',
            password: '',
            address: '',
            id: 0,
            sex: 1,
            gov_id: void 0,

            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
            pid: void -1,

        }
    }

</script>