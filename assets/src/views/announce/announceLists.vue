<!--部门人员管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../utils/mixins/common";
@import "../../utils/mixins/topSearch";
@import "../../utils/mixins/showDetail";

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
    #show-detail {
        width:100%;
        .info{
            h2{
               word-wrap: break-word; 
            }
            p{
                .value{
                    word-wrap: break-word;
                }
            }
        }
        .avatar{
            width: 30%;
            border:none;
            
            // h2{
            //     display: inline-block;
            //     word-wrap: break-word;
            // };
            // p{
            //     .value{
            //     word-break:break-all
                    
            //     }
            //     display: inline-block;
            // }
             img{
                width: 33.33%;
                height: 60%;
            }
           
        }
        .info{
            width: 60%;
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
        <el-dialog class="show-detail" id="show-detail" title="查看公告" v-model="showDetail">
            <div class="avatar">
                <img  v-for="item in imagesList" :src="item" />
            </div>
            <div class="info" >
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">内容：</i><span class="value">{{clerkDetail.content}}</span></p>
                <br>
                <p><i class="title">所属部门：</i><span class="value">{{clerkDetail.gov_name}}</span></p>
                <p><i class="title">发布人员：</i> <span class="value">{{clerkDetail.user_name}}</span></p>
                <p><i class="title">发送时间：</i><span class="value">{{clerkDetail.send_datetime}}</span></p>
            </div>
        </el-dialog>
        <!--<section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">
                <i>添加公告</i>
            </el-button>
        </section>-->

        <article class="search">
            <section>
                <i>类别</i>
                <!--<CourseTaskTemplateCategorySelect :onchange="getData"
                                                  v-model="fetchParam.category_id"></CourseTaskTemplateCategorySelect>-->
                <el-form  prop="category_id" :fetch-suggestions="querySearch" >
                    <el-select clearable class="select" v-model="fetchParam.category_id" placeholder="请选择类别"  @change="fetchData">
                        <el-option  v-for="item in  category_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form>
            </section>
            <section>
                <i>标题</i>
                <el-input v-model="fetchParam.name" placeholder="请输入公告标题"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <DateRange title="发送时间" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val "
                @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
            </DateRange>
            <!--<section>
                <i>角色</i>
                <el-select clearable v-model="fetchParam.role_id" @change="fetchData">
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="部门人员" value="0"></el-option>
                </el-select>
            </section>-->
            <!--<section>
                <i>手机号</i>
                <el-input v-model="fetchParam.mobile" placeholder="请输入手机号"   @keyup.enter.native="fetchData" ></el-input>
            </section>-->
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="tableData" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <!--<el-table-column type="selection"></el-table-column> 左侧选择按钮-->

            <el-table-column min-width="250" prop="name" label="标题" v-if="data">
            </el-table-column>
            <el-table-column min-width="250" prop="content" label="内容" v-if="data">
            </el-table-column>
            <el-table-column min-width="150" prop="user_name" label="发布人员" v-if="data">
            </el-table-column>
            <el-table-column min-width="150" :formatter="Time" label="创建时间">
            </el-table-column>
            <!--<el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.pushabled == 1" type="success">推送</el-tag>
                    <el-tag v-else-if="scope.row.pushabled == 0&&scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else type="warning">不推送</el-tag>
                </template>
            </el-table-column>-->
            <el-table-column fixed="right" width="150" label="操作">
                <template scope="scope">
                    <!--<el-button @click="showFn(scope.$index, scope.row)" type="text" size="small">详情
                    </el-button>-->
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           查看公告
                    </el-button>
                    <!--<el-button type="text" size="small" @click="editUser(scope.$index, scope.row)">
                            修改
                    </el-button>-->
                    <!--<el-button v-if="scope.row.pushabled == 1" @click="offline(scope.$index, scope.row)" type="text" size="small">
                        <i>不推送</i>
                    </el-button>
                    <el-button v-else @click="online(scope.$index, scope.row)" type="text" size="small">
                        <i>推送</i>
                    </el-button>-->
                    <!--<el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>-->
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
import announceService from '../../services/announce/announceService.js'
import DateRange from '../component/form/DateRangePicker.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        disabled:0,
        name,
        mobile: void 0,
        role_id: void -1,
        category_id: void 0, 
        pushabled: -1, 
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
            imagesList:[],
            category_list:[]
        }
    },
    activated () {
        this.fetchData()
        this.getCategory()
    },
    methods: {
          // 禁用
        offline(index, row) {
            // if(row.deleted == 0){
                xmview.showDialog(`你将要取消推送 <span style="color:red">${row.name}</span>这条公告 确认吗?`, () => {
                    row.pushabled = 1
                    announceService.offline(row).then((ret) => {
                    })
                })
            // }else{
            //      xmview.showDialog(`管理员 <span style="color:red">${row.name}</span> 已删除，无法禁用！`)
            // }
        },
        // 启用
        online(index, row) {
            // if(row.deleted == 0){
                xmview.showDialog(`你将要推送<span style="color:red">${row.name}</span>这条公告 确认吗?`, () => {
                    row.pushabled = 0
                    announceService.online(row).then((ret) => {
                    })
                })
            // }else{
            //      xmview.showDialog(`管理员 <span style="color:red">${row.name}</span> 已删除，无法启用！`)
            // }
            
        },
         //获取部门组下拉列表
            getCategory(val){
                announceService.getCategoryTree({pagesize:-1, disabled:-1}).then((ret)=>{
                 this.category_list = ret.data;
                })
            },
            //拿到部门组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            announceService.getAnnounceDetail(row.id).then((ret) => {
                this.clerkDetail = ret
                this.imagesList=ret.images.split(',')
                
            })
                // this.clerkDetail.image
                console.log( this.clerkDetail.images)
            console.log(this.imagesList)
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
            this.loadingData = true
            return announceService.getAnnounceListsData(this.fetchParam).then((ret) => {
                this.dataCache = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        search(val){
               return announceService.search(this.fetchParam).then((ret) => {
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
       
        
        Time(row, column, cellValue){
              return  this.timeFilter(row.addate) 
        },
        timeFilter( addate){
            let time
            this.dataCache.forEach(v=> {
                    // time = addate.split(" ")[0]
                    // console.log(addate)
                    // console.log(typeof(addate))
                    time = addate.substring(0,addate.length-3)
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
