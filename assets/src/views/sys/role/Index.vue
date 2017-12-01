<!--角色组管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/topSearch";

#sys-index-container {
    @extend %content-container;

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
    <article id="sys-index-container">
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({ name:'role-add'})">
                <i>添加角色组</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>角色组名称</i>
                <el-input v-model="keyWord" placeholder="请输入角色组名称"></el-input>
            </section>

        </article>

        <el-table class="data-table" v-loading="loadingData" :data="tableData" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <el-table-column type="selection"></el-table-column>
            <el-table-column min-width="50" prop="id" label="ID" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="role_name" label="角色名">
            </el-table-column>
            <el-table-column min-width="100" prop="addtime" label="添加时间">
            </el-table-column>
            <el-table-column min-width="100" prop="uptime" label="更新时间">
            </el-table-column>
            <el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="305" label="操作">
                <template scope="scope">
                    <!--<el-button @click="$router.push({name: 'role-edit', params: {roleInfo: scope.row, role_id: scope.row.id}})" type="text" size="small">详情
                    </el-button>-->
                    <el-button @click="$router.push({name: 'role-edit', params: {roleInfo: scope.row, role_id: scope.row.id}})" type="text" size="small">编辑
                        <!--a-->
                    </el-button>
                    <el-button v-if="scope.row.disabled == 0" @click="offline(scope.$index, scope.row)" type="text" size="small">
                        <i>禁用</i>
                    </el-button>
                    <el-button v-else @click="online(scope.$index, scope.row)" type="text" size="small">
                        <i>启用</i>
                    </el-button>
                    <el-button @click="$router.push({name: 'role_menus', params: {roleInfo: scope.row, role_id: scope.row.id, role_name: scope.row.role_name }})" type="text" size="small">授权菜单
                        <!--a-->
                    </el-button>
                    <el-button @click="$router.push({name: 'role_nodes', params: {roleInfo: scope.row, role_id: scope.row.id, role_name: scope.row.role_name }})" type="text" size="small">授权节点
                        <!--a-->
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :pagesize="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

        <!--底部的批量删除和移动两个按钮-->
        <div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>
    </article>
</template>

<script>
import sysService from '../../../services/sys/roleService.js'
import DateRange from '../../component/form/DateRangePicker.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        disabled: void 0, //以下几行代码不给disablied传参的话可不写
    }
}

export default {
    components: {
        DateRange
    },
    data() {
        return {
            init:false,
            loadingData: false,
            data: [], // 表格数据
            dataCache:[],
            total: 0,
            keyWord:'',
            dialogVisible: false,
            selectedIds: [], // 被选中的数据id集合
            fetchParam: getFetchParam(),
            dialogTree: {
                isShow: false,
                selectedId: void 0,
            }
        }
    },
    activated () {
        this.fetchData()
        
    },
    methods: {
        userInfo () {
            return authUtils.getUserInfo()
        },
        initFetchParam() {
            this.fetchParam = getFetchParam()
        },
        handleCurrentChange(val) {
            if(this.init){                 //init是true进来 限制fetchData初始化不请求
                this.fetchParam.page = val
                this.fetchData()
            }else{
                this.init = true
                
            }
        },
        handleSizeChange(val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            // console.log(2)
            return sysService.fetchData(this.fetchParam).then((ret) => {
                // console.log(ret.data)
                this.dataCache = ret.data
                console.log(ret.data)
                this.loadingData = false
                // console.log(ret)
                xmview.setContentLoading(false)     
            })
        },
        search(val){
               return sysService.search(this.fetchParam).then((ret) => {
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
        // 禁用
        offline(index, row) {
            xmview.showDialog(`你将要禁用角色组 <span style="color:red">${row.role_name}</span> 确认吗?`, () => {
                row.disabled = 1
                sysService.offline(row.role_name,row.id,row.disabled).then((ret) => {
                })
            })
        },
        // 启用
        online(index, row) {
            row.disabled = 0
            xmview.showDialog(`你将要启用角色组<span style="color:red">${row.role_name}</span> 确认吗?`, () => {
                sysService.online(row.role_name,row.id,row.disabled).then((ret) => {
                })
            })
        },
        // 
        // // 启用
        // online(index, row) {
        //     xmview.showDialog(`你将要启用角色组<span style="color:red">${row.role_name}</span> 确认吗?`, () => {
        //         sysService.online(row.id).then((ret) => {
        //             row.disabled = 0
        //         })
        //     })
        // },
        // // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除角色组 <span style="color:red">${row.role_name}</span>  此操作不可恢复确认吗?`, () => {
                sysService.delete(row.id).then(() => {
                    this.dataCache.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        // 批量删除
        delMulti() {
            xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                sysService.deleteMulty(this.selectedIds.join(',')).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData() // 重新刷新数据
                    }, 300)
                })
            })
        },
        filterTag(value,row){
            console.log(value);
            console.log(row);
            return 
        }
    },
    computed: {
        tableData(){
            var arr = this.dataCache.filter(v=>{
                return v.role_name.indexOf(this.keyWord)>=0
            })
            return arr
        }
    }
}
</script>
