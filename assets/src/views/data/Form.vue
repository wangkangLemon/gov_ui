<!--区块表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-form {
            max-width: 700px;
        }
    
        .submit-form {
        width: 40%;
        padding: 20px;
            .subButton {
                text-align: center;
            }
    }
    }
</style>
<template>
    <main id="sys-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="imgUrl" />
            </div>
            <!--<ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput>-->
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :model="fetchParam">
                <el-form-item v-if="$route.params.sys_id" label="区块id" prop="id">
                    <el-input v-model.id="fetchParam.id" type="number" disabled></el-input>
                </el-form-item>
                <el-form-item v-else >
                </el-form-item>
                <el-form-item label="栏目菜单"  :fetch-suggestions="querySearch">
                <el-select v-model="fetchParam.category_id" placeholder="请输入栏目菜单">
                    <el-option  v-for="item in drop_list" :key="item.id" :label="item.id + item.name" :value="item.id"></el-option>
                </el-select>
                </el-form-item>
                <!--<el-form-item label="栏目菜单" prop="category_id"> //需改进待后台返ended数据后做联动列表
                        <CourseCategorySelect type="course" :placeholder="fetchParam.category_name" :autoClear="true" :showNotCat="false" v-model="fetchParam.category_id"></CourseCategorySelect>
                </el-form-item>-->
                <el-form-item label="引用类型">
                        <el-select v-model="fetchParam.ref_type" placeholder="请选择">
                            <el-option label="课程类型" value="course"></el-option>
                            <el-option label="引用类型" value="link"></el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="是否与引用同步" prop="ref_sync">
                        <el-radio-group v-model="fetchParam.ref_sync">
                            <el-radio :label="1">同步</el-radio>
                            <el-radio :label="0">不同步</el-radio>
                        </el-radio-group>
                </el-form-item>
                <!--<el-form-item label="引用id"  prop="ref_id">
                    <el-input v-model.email="fetchParam.ref_id" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="标题" prop="title">
                    <el-input v-model.title="fetchParam.title"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="image">
                    <UploadImg ref="uploadImg" :defaultImg="fetchParam.image" :url="uploadImgUrl"  :onSuccess="handleImgUploaded"></UploadImg>
                </el-form-item>
                <el-form-item label="链接" prop="url">
                    <el-input v-model.url="fetchParam.url"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model.desc="fetchParam.desc"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input v-model.date="fetchParam.date" type="date"></el-input>
                </el-form-item>
                <!--<el-form-item prop="date" label="日期">
                    <el-date-picker v-model="fetchParam.date" type="date"/>
                </el-form-item>-->
                <el-form-item label="标签">
                    <vTags v-model.tags="courseTags"></vTags>
                </el-form-item>
                <el-form-item label="颜色值" prop="tags_color">
                    <el-input v-model.color="fetchParam.tags_color"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.sort="fetchParam.sort" type="number"></el-input>
                </el-form-item>
                <el-form-item label="" v-if="this.$route.params.sys_type">
                    <el-button @click="$router.push({ name:'sys-index'})">取消</el-button>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import dataService from '../../services/section/dataService.js'
    import cateService from '../../services/section/cateService.js'
    import config from '../../utils/config'
    import vTags from '../component/form/Tags.vue'
    import UploadImg from '../component/upload/UploadImg.vue'
    import courseService from '../../services/course/courseService.js'
    export default {
        name: 'data-form',
        components: {
            vTags, UploadImg
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
                resultData: [],
                drop_list:[],
                courseTags: [],
                uploadImgUrl: '',
            }
        },
        created () {
            // this.getDropval()
        },
        activated () {
            xmview.setContentLoading(false);
             if (this.$route.params.sys_id != undefined) {    //路由id传递
                    console.log('进入了编辑')
                    dataService.getAdminInfo(this.$route.params.sys_id).then((ret) => {
                        this.fetchParam = ret
                        this.fetchParam.name=ret.category_name
                        this.courseTags = ret.tags.split(',')
                    })
                }else{
                    this.fetchParam = getOriginData()
                }    
            this.loadingData=false;
            setTimeout(v=>{
            this.getDropval()

        })
        this.uploadImgUrl = courseService.getUploadCategoryImgUrl()
            
        },
        methods: {
            // 图片上传完毕
            handleImgUploaded (response) {
                this.fetchParam.image = response.data.url
            },
            //获取栏目菜单下拉列表
            getDropval(){
                cateService.fetchData({pagesize:-1}).then((ret)=>{
                console.log(ret.data)
                 this.drop_list=ret.data;
                })
            },
            //拿到栏目菜单
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    this.fetchParam.tags = this.courseTags.join(',')
                    let req = dataService.create
                    if (this.$route.params.sys_id) req = dataService.edit
                    // alert(req)
                    // console.log(this.$route.params.sys_id)
                        console.log(this.fetchParam)
                    req(this.fetchParam).then((ret) => {
                        // console.log(111111111111)
                        // console.log(this.fetchParam)
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        this.courseTags=[]
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({'name': 'section-data'})
                    })
                })
            },
        }
    }

    function getOriginData() {
        return {
            id:0, 
            category_id:0, 
            ref_type:'', 
            ref_id: 0, 
            ref_sync:'', 
            title:'', 
            image:'', 
            url:'', 
            desc:'', 
            date:'', 
            tags:null, 
            tags_color:'', 
            sort:0,
            courseTags:[],
            name:void 0,
        }
    }

</script>;