<!--资讯管理-->
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
        .el-tag{
            margin-top: 5px;
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
        <el-dialog class="show-detail" title="查看资讯" v-model="showDetail">
            <div class="info">
                <h2>{{clerkDetail.title}}</h2>
                <p><i class="title">标题：</i><span class="value">{{clerkDetail.title }}</span></p>
                <p><i class="title">资讯简介：</i> <span class="value">{{clerkDetail.description}}</span></p>
            </div>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addProduct">
                <i>添加资讯</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>标题</i>
                <el-input v-model="fetchParam.title" placeholder="请输入标题"   @keyup.enter.native="fetchData" ></el-input>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="120" prop="title" label="标题" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="author" label="作者">
            </el-table-column>
            <el-table-column min-width="250" prop="info" label="简介">
            </el-table-column>
            <el-table-column min-width="120" prop="addate" label="创建时间">
            </el-table-column>
            <!--<el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.deleted == 1">已删除</el-tag>
                    <el-tag v-else-if="scope.row.deleted == 0&&scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>-->
            <el-table-column fixed="right" width="180" label="操作">
                <template scope="scope">
                    <!-- <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button> -->
                    <el-button type="text" size="small" @click="editProduct(scope.$index, scope.row)">
                            修改
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

    </article>
</template>

<script>
import newsService from '../../../services/gov/newsService.js'
import DateRange from '../../component/form/DateRangePicker.vue'
import Region from '../../component/select/Region.vue'

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        title:'',
    }
}

export default {
    components: {
        DateRange,
        Region
    },
    data() {

        return {
            loadingData: false,
            data: [], // 表格数据
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
                name: '',          // 名称
                professor: '',        // 职称
                pass: '',          // 科室
                address: '',       // 地址
                sex: 0,            // 性别
                birthday: '',          // 生日
                addate: ''
            },
                formLabelWidth: '120px', // 表单label的宽度

        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
       
        //添加
        addProduct () {
            this.$router.push({
                name: 'gov-news-add',
            })
        },

     // 修改信息
        editProduct(index, row) {
            console.log(row)
            this.$router.push({
                name: 'gov-news-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            newsService.getProduct(row.id).then((ret) => {
                this.clerkDetail = ret
            })
        },

        initFetchParam() {
            this.fetchParam = getFetchParam()
        },
        handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
        },
        handleSizeChange( val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            return newsService.fetchProductList(this.fetchParam).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            console.log(row)
            xmview.showDialog(`你将要删除资讯 <span style="color:red">${row.title}</span>  此操作不可恢复确认吗?`, () => {
                newsService.deleteProduct(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        Time(row, column, cellValue){
              return  this.timeFilter(row.addate) 
        },
        timeFilter( addate){
            let time
            this.data.forEach(v=> {
                    time = addate.split(" ")[0]
                }, this);
            return time
        },

    },
    computed: {
        // timeFilter(row, column, cellValue){
        //      let arr = this.data.map(e=>{
        //          console.log(e)
        //        e.addate = e.addate.split(" ")[0]
        //     //    return v
        //     })
        //    return arr
        // },
        // tableData(){
        //     let arr = this.data.filter(v=>{
        //         return v.name.indexOf(this.name)>=0
        //     })
        //     return arr
        // }
    }
}
</script>
