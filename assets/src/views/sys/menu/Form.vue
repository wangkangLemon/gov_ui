<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
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
            <el-form-item label="菜单名称" prop="menu_name">
                <el-input v-model.name="fetchParam.menu_name"></el-input>
            </el-form-item>
            <el-form-item label="菜单标识" prop="menu_node">
                <el-input v-model.mobile="fetchParam.menu_node"></el-input>
            </el-form-item>
            <el-form-item label="父级名称" prop="pid" :fetch-suggestions="querySearch">
                <el-select v-model="fetchParam.pid" placeholder="请输入父级名称">
                    <el-option  v-for="item in drop_list" :key="item.id" :label="item.id + item.menu_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="父级菜单" prop="pid">
                <MenuFatherCategory type="course" :placeholder="fetchParam.menu_name" :autoClear="true" :showNotCat="false" v-model="fetchParam.pid"></MenuFatherCategory>
            </el-form-item>-->
            <el-form-item label="菜单层级" prop="level">
                <el-input v-model.password="fetchParam.level" type="number"></el-input>
            </el-form-item>
            <el-form-item label="排序字段" prop="sort">
                <el-input v-model.address="fetchParam.sort"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.address="fetchParam.remark"></el-input>
            </el-form-item> 
            <el-form-item label=""  v-if="this.$route.params.sys_type">
                <el-button @click="$router.push({ name:'sys-index'})">取消</el-button>
                <el-button type="primary" @click="btnNextClick">确认</el-button>
            </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import menuService from '../../../services/sys/menuService.js'
    import config from '../../../utils/config'
    // import MenuFatherCategory from '../../component/select/MenuFatherCategory.vue'
    export default {
        name: 'sys-form',
        // components: { MenuFatherCategory },
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
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.sys_id != undefined) {    //路由id传递
                    menuService.getAdminInfo(this.$route.params.sys_id).then((ret) => {
                        this.fetchParam = ret
                    })
                }    
            this.loadingData=false;
            this.getDropval()
        },
        methods: {
            //获取父级菜下拉列表
            getDropval(){
                menuService.fetchData({pagesize:-1}).then((ret)=>{
                console.log(ret.data)
                 this.drop_list=ret.data;
                })
            },

            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = menuService.create
                    console.log(this.$route.params.sys_id)
                    if (this.$route.params.sys_id) req = menuService.update
                    req(this.fetchParam).then((ret) => {
                        console.log(ret)
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        //如果请求的是create创建成功 就push到角色组授权页面授权this.$router.push({name: 'section-edit')

                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({'name': 'menu-index'})
                    })
                })
            },
              //拿到父级菜单
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
        }
    }

    function getOriginData() {
        return {
            id:0,
            menu_name: '',
            menu_node:'',
            remark:'',
            sort: 0,
            pid: null,
            level: 0,
        }
    }

</script>