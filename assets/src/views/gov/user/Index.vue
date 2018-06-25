<!--部门人员管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/topSearch";
@import "../../../utils/mixins/showDetail";

#medical-index-container {
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
    <article id="medical-index-container">
        <!--详情-->
        <el-dialog class="show-detail" title="查看管理员" v-model="showDetail">
            <div class="avatar">
                <img :src="{url:clerkDetail.avatar, sex: clerkDetail.sex} | defaultAvatar" />
            </div>
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">所属部门：</i><span class="value">{{clerkDetail.gov_name}}</span></p>
                <p><i class="title">手机号：</i> <span class="value">{{clerkDetail.mobile}}</span></p>
                <p>
                    <i class="title">状态：</i>
                    <span class="value">
                        <el-tag type="success" v-if="!clerkDetail.disabled">正常</el-tag>
                        <el-tag type="danger" v-else="clerkDetail.disabled">异常</el-tag>
                    </span>
                </p>
                <!--<p><i class="title">性别：</i> <span class="value">{{clerkDetail.sex ? '男' : '女'}}</span></p>-->
                <!-- <p><i class="title">生日：</i> <span class="value">{{clerkDetail.birthday}}</span></p> -->
                <p><i class="title">地址：</i> <span class="value">{{clerkDetail.address}}</span></p>
                <p><i class="title">注册时间：</i><span class="value">{{clerkDetail.addate}}</span></p>
            </div>
        </el-dialog>
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">
                <i>添加人员</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>姓名</i>
                <el-input v-model="fetchParam.name" placeholder="请输入姓名"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <section>
                <i>角色</i>
                <el-select  v-model="fetchParam.role_id" placeholder="请选择" @change="fetchData">
                    <el-option label="全部" :value="-1"></el-option>
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="部门人员" value="0"></el-option>
                </el-select>
            </section>
            <section>
                <i>手机号</i>
                <el-input v-model="fetchParam.mobile" placeholder="请输入手机号"   @keyup.enter.native="fetchData" ></el-input>
            </section>
             <section>
                <i>是否激活</i>
                <el-select v-model="fetchParam.active" @change="fetchData">
                    <el-option label="全部" :value="-1"></el-option>
                    <el-option label="已激活" value="1"></el-option>
                    <el-option label="未激活" value="0"></el-option>
                </el-select>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="tableData" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <!--<el-table-column type="selection"></el-table-column> 左侧选择按钮-->

            <el-table-column min-width="150" prop="name" label="姓名" v-if="data">
            </el-table-column>
            <el-table-column min-width="200" prop="gov_name" label="部门">
            </el-table-column>
            <el-table-column min-width="170" prop="mobile" label="手机">
            </el-table-column>
            <el-table-column min-width="170" :formatter="Time" label="创建时间">
            </el-table-column>
            <el-table-column width="80" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.deleted == 1">已删除</el-tag>
                    <el-tag v-else-if="scope.row.deleted == 0&&scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
                <!-- <template scope="scope">
                    <el-tag v-if="scope.row.deleted == 1">已删除</el-tag>
                    <el-tag v-else-if="scope.row.deleted == 0&&scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template> -->
            </el-table-column>
            <el-table-column fixed="right" width="207" label="操作">
                <template scope="scope">
                    <!--<el-button @click="showFn(scope.$index, scope.row)" type="text" size="small">详情
                    </el-button>-->
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button>
                    <el-button type="text" size="small" @click="editUser(scope.$index, scope.row)">
                            修改
                    </el-button>
                    <el-button v-if="scope.row.disabled == 0" @click="offline(scope.$index, scope.row)" type="text" size="small">
                        <i>禁用</i>
                    </el-button>
                    <el-button v-else @click="online(scope.$index, scope.row)" type="text" size="small">
                        <i>启用</i>
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

        <!--底部的批量删除和移动两个按钮-->
        <!--<div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>-->

    </article>
</template>

<script>
import userService from '../../../services/gov/userService.js'
import DateRange from '../../component/form/DateRangePicker.vue'
import companyUserService from '../../../services/gov/companyUserService.js'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        disabled:0,
        name,
        mobile: void 0,
        role_id: null,
        active: -1,
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
            name:'',
            dialogVisible: false,
            selectedIds: [], // 被选中的数据id集合
            fetchParam: getFetchParam(),
            dialogTree: {
                isShow: false,
                selectedId: void 0,
            },
            showDetail: false,     // 是否显示详情对话框
            // 查看管理员详情
            clerkDetail: {
                name: '',          // 姓名
                mobile: '',        // 手机
                pass: '',          // 密码
                address: '',       // 地址
                sex: 0,            // 性别
                birthday: '',          // 生日
                addate: ''
            },
            

        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
     // 修改人员信息
        editUser(index, row) {
            this.$router.push({
                name: 'person-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            companyUserService.userDetail(row.id).then((ret) => {
                this.clerkDetail = ret
            })
        },
        userInfo () {
            return authUtils.getUserInfo()
        },
        initFetchParam() {
            this.fetchParam = getFetchParam()
        },
        handleCurrentChange(val) {
            
            // if(this.init){                 //init是true进来 限制fetchData初始化不请求
                this.fetchParam.page = val
                this.fetchData()
            // }else{
            //     this.init = true
            // }
        },
        handleSizeChange( val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            if(this.fetchParam.role_id == null){
                    this.fetchParam.role_id = -1
                }
            this.loadingData = true
            return userService.fetchData(this.fetchParam).then((ret) => {
                this.dataCache = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        search(val){
               return userService.search(this.fetchParam).then((ret) => {
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
            if(row.deleted == 0){
                xmview.showDialog(`你将要禁用管理员 <span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 1
                    userService.offline(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`管理员 <span style="color:red">${row.name}</span> 已删除，无法禁用！`)
            }
        },
        // 启用
        online(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要启用管理员<span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 0
                    userService.online(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`管理员 <span style="color:red">${row.name}</span> 已删除，无法启用！`)
            }
            
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除用户 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                userService.delete(row.id).then(() => {
                    this.dataCache.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        // 批量删除
        delMulti() {
            xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                userService.deleteMulty(this.selectedIds.join(',')).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData()  // 重新刷新数据
                    }, 300)
                })
            })
        },
        
        Time(row, column, cellValue){
              return  this.timeFilter(row.addate) 
        },
        timeFilter( addate){
            let time
            this.dataCache.forEach(v=> {
                    time = addate.split(" ")[0]
                }, this);
            return time
        },

    },
    computed: {
        // timeFilter(row, column, cellValue){
        //      let arr = this.dataCache.map(e=>{
        //          console.log(e)
        //        e.addate = e.addate.split(" ")[0]
        //     //    return v
        //     })
        //    return arr
        // },

        
        tableData(){
            let arr = this.dataCache.filter(v=>{
                return v.name.indexOf(this.name)>=0
            })
            return arr
        }
    }
}
</script>
