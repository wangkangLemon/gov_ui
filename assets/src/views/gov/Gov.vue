<!--部门列表-->
<style lang="scss" rel='stylesheet/scss'>
    @import "../../utils/mixins/common";
    @import "../../utils/mixins/topSearch";
    @import "../../utils/mixins/showDetail";

    .gov-index {
        @extend %content-container;
        .add {
            @extend %right-top-btnContainer;
        }
        .search {
            @extend %top-search-container;
        }
        .block {
            text-align: right;
            margin-top: 15px;
        }
        .addForm {
            .tip {
                text-align: center;
                border-top: 1px solid #ddd;
                color: #ff0000;
                line-height: 50px;
            }
        }
    }
</style>
<template>
    <article class="gov-index">
        <!--详情-->
        <el-dialog size="small" v-if="details != null" class="show-detail" v-model="showDetail" title="部门信息">
            <div class="info">
                <h2>
                    {{details.name}}
                    <el-tag type="success">{{govType[details.category]}}</el-tag>
                </h2>
                <p><i class="title">联系人：</i><span class="value">{{details.concact || '无'}}</span></p>
                <p><i class="title">联系人手机：</i><span class="value">{{details.mobile || '无'}}</span></p>
                <p><i class="title">联系人邮箱：</i><span class="value">{{details.email || '无'}}</span></p>
                <p><i class="title">部门电话：</i><span class="value">{{details.tel || '无'}}</span></p>
                <p><i class="title">传真：</i><span class="value">{{details.fax || '无'}}</span></p>
                <p><i class="title">上级部门：</i><span class="value">{{details.parent_name || '无'}}</span></p>
                <p><i class="title">地址：</i><span class="value">{{details.address || '无'}}</span></p>
                <p><i class="title">邮编：</i><span class="value">{{details.zip || '无'}}</span></p>
                <!--<p><i class="title">部门网址：</i><span class="value">{{details.url || '无'}}</span></p>
                <p><i class="title">部门介绍：</i><span class="value">{{details.description || '无'}}</span></p>-->
            </div>
            <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="showDetail = false">关 闭</el-button>-->
            <!--</div>-->
        </el-dialog>
        <div class="add">
            <el-button type="primary" icon="plus" class="recharge" @click="add">添加</el-button>
        </div>
        <section class="search">
            <!--<section>
                <i>部门类型</i>
                <el-select @change="getData" clearable v-model="fetchParam.typeSelect" placeholder="未选择">
                    <el-option v-for="(item, index) in types" :label="item.name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </section>-->
            <!--<Region :province="fetchParam.provinceSelect" :city="fetchParam.citySelect" :area="fetchParam.areaSelect" title="部门" v-on:provinceChange="val => {alert(111);fetchParam.provinceSelect = val}"
                v-on:cityChange="cityChange" v-on:areaChange="val => fetchParam.areaSelect = val" :change="getData">
            </Region>
            <section >
                <i>上级部门</i>
                <el-select :disabled="disabled"  placeholder="全部" clearable :change="getData" v-model="fetchParam.pid">
                    <el-option v-for="(item, index) in parentNames"  :label="item.name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </section>-->

            <section>
                <i>部门名称：</i>
                <el-input @keyup.enter.native="getData" v-model="fetchParam.name" auto-complete="off"></el-input>
            </section>
  
            <!--<DateRange title="创建时间" :start="fetchParam.addate" :end="fetchParam.update" v-on:changeStart="val=> fetchParam.addate = val"
                v-on:changeEnd="val=> fetchParam.update = val" :change="getData">
            </DateRange>-->
        </section>
        <el-table v-loading="loading" border :data="govData" stripe style="width: 100%">
            <el-table-column prop="name" label="部门名称" min-width="180">
                <template scope="scope">
                    <el-tag type="gray">{{govType[scope.row.category]}}</el-tag>
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column width="120" prop="concact" label="联系人">
            </el-table-column>
            <el-table-column width="170" prop="mobile" label="手机">
            </el-table-column>
            <el-table-column width="180" prop="addate" label="创建时间">
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="190">
                <template scope="scope">
                    <!--<router-link :to="{path: '/medical/user/'+ scope.row.id }">-->
                    <el-button type="text" size="small" @click="adminPage(scope.$index, scope.row)">
                        管理员 
                    </el-button>
                    <!--</router-link>-->
                    <el-button type="text" size="small" @click="showFn(scope.$index, scope.row)">
                        详情
                    </el-button>
                    <el-button type="text" size="small" @click="editGov(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-button type="text" size="small" @click="deleteGov(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 60, 100]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </article>
</template>
<script>
    import govService from '../../services/gov/govService.js'
    import DateRange from '../component/form/DateRangePicker.vue'
    import Region from '../component/select/Region.vue'

    function clearFn() {
        return {
            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            name: ''
        }
    }
    export default {
        components: {
            DateRange,
            Region
        },
        data() {
            return {
                isInit: false,
                govType: ['', '系统', '政府'],
                types: [ // 部门类型
                    {
                        name: '政府',
                        id: 2
                    },
                    {
                        name: '系统',
                        id: 1
                    }
                ],
                editloading: false,
                details: null,
                showDetail: false, // 显示详情弹窗
                loading: false,
                currentPage: 1,
                pageSize: 15,
                govData: [],
                fetchParam: {
                    addate: this.$route.query.yesterday == undefined ? '' : this.$route.query.yesterday,
                    update: this.$route.query.yesterday == undefined ? '' : this.$route.query.yesterday,
                    typeSelect: '',
                    provinceSelect: '',
                    citySelect: '',
                    areaSelect: '',
                    name: '',
                    pid: void 0,
                },
                total: 0,
                parentNames:[]
            }
        },
        activated() {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            cityChange(val) {
                this.fetchParam.citySelect = val
            },
            initFetchParam() {
                this.currentPage = 1
                this.fetchParam = clearFn()
            },
            // 修改部门信息
            editGov(index, row) {
                this.$router.push({
                    name: 'gov-edit',
                    params: {
                        id: row.id
                    }
                })
            },
            // 显示详情
            showFn(index, row) {
                govService.getGovInfo(row.id).then((ret) => {
                    this.details = ret
                    this.showDetail = true
                })
            },
            // 删除 GOV部门
            deleteGov(index, row) {
                 xmview.showDialog(`你将要删除部门 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                    govService.deleteGov(row.id).then(() => {
                        this.govData.splice(index, 1)//删除选中项
                        row.deleted = 1
                    })
                })
            },
            adminPage(index, item) {
                this.$router.push({
                    name: 'gov-admin',
                    params: {
                        gov_id: item.id || 1,
                        area_id: item.area_id,
                    },
                    query: {
                        // category: item.category

                    }
                })
            },
            // 添加
            add() {
                this.$router.push({
                    name: 'gov-add',
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                if (!this.isInit) {
                    this.isInit = true
                    return
                }
                this.currentPage = val
                this.getData()
            },
            getData() {

                this.loading = true
                return govService.getSelectList({
                    pagesize: this.pageSize,
                    page: this.currentPage,
                    pid: this.fetchParam.pid,
                    category: this.fetchParam.typeSelect,
                    name: this.fetchParam.name,
                    time_start: this.fetchParam.createTime,
                    time_end: this.fetchParam.endTime,
                    province_id: this.fetchParam.provinceSelect,
                    city_id: this.fetchParam.citySelect,
                    area_id: this.fetchParam.areaSelect
                }).then((ret) => {
                    this.govData = ret.data
                    this.total = ret.total

                }).then(() => {
                    this.loading = false
                })
            }
        }
    }
</script>