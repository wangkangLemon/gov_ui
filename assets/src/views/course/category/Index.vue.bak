<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";

    #course-index-container {
        @extend %content-container;

        .manage-container {
            @extend %right-top-btnContainer;
        }

        .search {
            @extend %top-search-container;
        } // 底部的管理按钮
        .bottom-manage {
            margin-top: 15px;
        }

    }
</style>

<template>
    <article id="course-index-container">
        <section class="manage-container">
            <button type="button" class="el-button el-button--primary" @click="$router.push({ name:'cate-add' })">
                <i class="el-icon-plus"></i><span><i>添加课程栏目</i></span>
            </button>            
            <!--<button type="button" class="el-button el-button--warning">
                <i class="el-icon-menu"></i><span><i>管理栏目</i></span>
            </button> -->
        </section>

        <article class="search">
            <section>
                <i>课程名称</i>
                <el-input v-model="fetchParam.name" @keyup.enter.native="fetchData"></el-input>
            </section>

            <section>
                <i>状态</i>
                <el-select v-model="fetchParam.disabled" placeholder="未选择" @change="fetchData" :clearable="true">
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </section>

            <DateRange title="创建时间" :start="fetchParam.time_start" :end="fetchParam.time_end" @changeStart="val=> fetchParam.time_start=val "
                @changeEnd="val=> fetchParam.time_end=val" :change="fetchData">
            </DateRange>

        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" @select="selectRow" @select-all="selectRow"
            border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column min-width="100" prop="id" label="ID">
            </el-table-column>
            <el-table-column min-width="100" prop="name" label="栏目名称">
            </el-table-column>
            <el-table-column min-width="100" prop="category_type" label="栏目分类">
            </el-table-column>
            <el-table-column min-width="100" prop="pid" label="父级id">
            </el-table-column>
            <el-table-column min-width="100" prop="level" label="栏目层级">
            </el-table-column>
            <el-table-column min-width="100" prop="sort" label="种类">

            </el-table-column>

            <el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>
           
            <el-table-column width="190" prop="addate" label="创建时间">
            </el-table-column>
              <el-table-column fixed="right" width="180" label="操作">
                <template scope="scope">
                    <!--<el-button @click="$router.push({name: 'cate-edit', params: {sysInfo: scope.row, course_id: scope.row.id}})" type="text" size="small">编辑
                    </el-button>-->
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

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page"
            :pagesize="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

        <!--底部的批量删除和移动两个按钮-->
        <div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>

    </article>
</template>

<script>
    import courseService from '../../../services/course/courseService.js'
    import DateRange from '../../component/form/DateRangePicker.vue'

    function getFetchParam() {
        return {
            status: void - 1, // 2- 视屏转码中 1-下线 0-正常
            category: void 0, // 3- 供应商
            page: 1,
            pagesize: 15,
            time_start: void 0,
            time_end: void 0,
            need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
            keyword: void 0,
        }
    }

    export default {
        components: {
            DateRange
        },
        data() {
            return {
                loadingData: false,
                data: [], // 表格数据
                total: 0,
                dialogVisible: false,
                selectedIds: [], // 被选中的数据id集合
                fetchParam: getFetchParam(),
                dialogTree: {
                    isShow: false,
                    selectedId: void 0,
                }
            }
        },
        activated() {
            this.fetchData()
        },
        methods: {
            initFetchParam() {
                this.fetchParam = getFetchParam()
            },
            handleCurrentChange(val) {
                console.log(`当前页= ${val}`);
                this.fetchParam.page = val
                this.fetchData()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.fetchParam.pagesize = val
                this.fetchData()
            },
            fetchData(val) {
                this.loadingData = true
                return courseService.search_cate(this.fetchParam).then((ret) => {
                    this.data = ret
                    this.total = ret.total
                    this.loadingData = false
                    xmview.setContentLoading(false)
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
            // 下线
            offline(index, row) {
                xmview.showDialog(`你将要禁用管理员 <span style="color:red">${row.name}</span> 确认吗?`, () => {
                    courseService.offline(row.id).then((ret) => {
                        row.status = 1
                    })
                })
            },
            // 上线
            online(index, row) {
                xmview.showDialog(`你将要启用管理员 <span style="color:red">${row.name}</span> 确认吗?`, () => {
                    courseService.online(row.id).then((ret) => {
                        row.status = 0
                    })
                })
            },
            // 单条删除
            del(index, row) {
                xmview.showDialog(`你将要删除项目 <span style="color:red">${row.name}</span> 操作不可恢复确认吗?`, () => {
                    courseService.delete_cate(row.id).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.data.splice(index, 1)
                    })
                })
            },
            // 批量删除
            delMulti() {
                xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                    courseService.deleteMulty(this.selectedIds.join(',')).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.dialogTree.isShow = false
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
                })
            },
        },
    }
</script>