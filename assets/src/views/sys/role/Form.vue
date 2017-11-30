<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-form {
            max-width: 700px;
        }
    }
</style>
<template>
    <main id="sys-form">
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam">
            <!--<el-form-item label="角色" prop="role_id">
                <CourseCategorySelect type="newcourse" :placeholder="fetchParam.category_name" :autoClear="true" :showNotCat="false" v-model="fetchParam.role_id"></CourseCategorySelect>
            </el-form-item>-->
            
            <!--地址栏有参数的时候获取的表单有19-23 行<-->
            <template v-if="$route.params.role_id">
                <el-form-item label="ID" prop="role_id">
                    <el-input v-model.name="fetchParam.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="role_name">
                    <el-input v-model.name="fetchParam.role_name"></el-input>
                </el-form-item> 
                <el-form-item label="添加时间" prop="role_addtime">
                    <el-input v-model.name="fetchParam.addtime" disabled></el-input>
                </el-form-item>
                <el-form-item label="更新时间" prop="role_uptime">
                    <el-input v-model.name="fetchParam.uptime" disabled></el-input>
                </el-form-item>
             </template>

            <!--  没有参数的时候 也就是新增 只加一个名字    -->
            <el-form-item label="姓名" prop="role_name" v-else>
                <el-input v-model.name="fetchParam.role_name"></el-input>
            </el-form-item>

            <el-form-item label="">
                <el-button @click="$router.push({ name:'role-index'})">取消</el-button>
                <el-button type="primary" @click="btnNextClick">确认</el-button>
            </el-form-item>
            </el-form>
    </main>
</template>

<script>
    import sysService from '../../../services/sys/roleService.js'
    import role_mService from '../../../services/sys/role_mService.js'
    import vTags from '../../component/form/Tags.vue'
    import config from '../../../utils/config.js'
    import clone from 'clone'
    export default {
        name: 'sys-form',
        components: {
            vTags,
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
                rules: {
                    // role_id: { required: true, message: '请输入角色'},
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                role_list:[],
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.role_id!=undefined) {    //路由id传递
                    sysService.getAdminInfo(this.$route.params.role_id).then((ret) => {
                        this.fetchParam = ret
                        console.log(ret)
                        // this.fetchParam.role_id = ret.course.role_id
                    })
                }    
            this.getrole()
            this.loadingData=false;
        },
        methods: {
            getrole(val){
                role_mService.fetchData().then((ret)=>{
                 this.role_list=ret.data;
                })
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = sysService.create
                    if (this.$route.params.role_id) req = sysService.update
                    req(this.fetchParam).then((ret) => {
                        // console.log(ret)
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({'name': 'role-index'})
                    })
                })
            },
            //拿到角色组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
 

            saveItemChapter(pitem, pindex) {
                this.resultData[pindex].status = 0
                this.$forceUpdate()
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

        }
    }

</script>