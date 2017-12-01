<!--授权节点管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/topSearch";

#sys-index-container {
    @extend %content-container;
     .manage-container {
        @extend %right-top-btnContainer;
    }
}
</style>

<template>
    <article id="sys-index-container">
        <section class="manage-container">
            <el-button type="primary" >
                <i>{{$route.params.role_name}}角色组</i>
            </el-button>
        </section>

        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedMenus" @change="handleCheckedMenusChange">
            <el-checkbox v-for="item in dataCache" :label="item.id" :key="item.id" :value="item.id">{{item.menu_name}}</el-checkbox>
        </el-checkbox-group>

        <!--底部的批量删除和移动两个按钮-->
        <div class="bottom-manage">
            <el-button @click="createM">提交</el-button>
            <!--<el-button @click="deleteImp">删除</el-button>-->
        </div>
    </article>
</template>

<script>
import sysService from '../../../services/sys/menuService.js'
import roleService from '../../../services/sys/roleService.js'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        pagesize: -1,
        level:-1,
        pid:-1
    }
}

export default {

    data() {
        return {
            init:false,
            loadingData: false,
            dataCache:[],     // 总的数据
            dataImp:[],       // 已授权列表的数据
            selectedIds: [],  // 被选中的数据id集合
            checkAll: false,
            checkedMenus: [],
            fetchParam: getFetchParam(),
            // fetchParam: getFetchParam(),

            }
    },
    activated () {
        this.fetchData()
        this.fetchDataM()
    },
    methods: {
        //全选反选按钮
        handleCheckAllChange(event) {
            var arr = this.dataCache.map(v=>{
                return v.id
            })
            this.checkedMenus = event.target.checked ? arr : [];
        },
        handleCheckedMenusChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.dataCache.length;
        },
        //总的数据     
        fetchData(val) {
            return sysService.fetchData(this.fetchParam).then((ret) => {
                // console.log('全部的菜单======')
                // console.log(ret.data)
                this.dataCache = ret.data 
                this.loadingData = false
                this.checkAll = this.checkedMenus.length === this.dataCache.length;
                xmview.setContentLoading(false)     
            })
        },
        //此角色已授权的菜单 - 授权部分开始
        fetchDataM(){
            console.log(this.$route.params.role_id)
            return roleService.fetchDataM({id:this.$route.params.role_id, pagesize :-1}).then((ret) => {
                this.dataImp = ret.data
                var arr = []
                ret.data.forEach(v=>{
                    arr.push(v.menu_id)
                })
                this.checkedMenus = arr    
                // console.log('此角色已授权的菜单有======')
                // console.log(ret.data)
                this.checkAll = this.checkedMenus.length === this.dataCache.length;
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        createM(){
            let ids=this.checkedMenus.join(',')
            roleService.createM(this.$route.params.role_id,ids).then((ret) => {
                this.fetchParamImp = ret
                console.log(ret)
            })
            this.loadingData=false;
        },

    },
 
}
</script>
