<!--视频选取弹出框-->
<style rel="stylesheet/scss" lang="scss">
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/mixins";
@import "../../../utils/mixins/topSearch";

#course-component-dialogvideo {
    @extend %content-container;
    .search {
        @extend %top-search-container;
    }
}
</style>
<template>
    <el-dialog title="选取视频" v-model="isShowDialog">
        <main id="course-component-dialogvideo">
            <section class="search">
                <section>
                    <i>名称</i>
                    <el-input v-model="fetchParam.file_name" @keyup.enter.native="fetchData"></el-input>
                </section>
            </section>
    
            <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
                <el-table-column prop="file_name" label="标题">
                </el-table-column>
                <el-table-column prop="duration" width="80" label="时长">
                </el-table-column>
                <el-table-column fixed="right" width="70" label="操作">
                    <template scope="scope">
                        <el-button @click="selectVideo(scope.$index, scope.row)" type="text" size="small">选取</el-button>
                    </template>
                </el-table-column>
            </el-table>
    
            <el-pagination class="pagin" @size-change="val => fetchParam.pagesize=val" @current-change="val => fetchParam.page = val" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
            </el-pagination>
    
        </main>
    </el-dialog>
</template>

<script>
import videoService from '../../../services/course/videoService'
export default {
    props: {
        onSelect: Function, //从父组件传过来的方法 改变时把row传回去
        value: Boolean,
    },
    data() {
        return {
            isShowDialog: this.value,
            data: [],
            loadingData: false,
            total: 0,
            fetchParam: {
                file_name: void 0,
                status: 0,
                page: 1,
                pagesize: 15,
            }
        }
    },
    watch: {
        'fetchParam.page'() {
            this.fetchData()
        },
        'fetchParam.pagesize'() {
            this.fetchData()
        },
        'value'(val) {
            this.setShowDialog(val)
        },
        'isShowDialog'(val) {
            this.$emit('input', val)
            this.setShowDialog(val)
            if (this.data.length < 1) this.fetchData()
        }
    },
    methods: {
        fetchData() {
            this.loadingData = true
            console.log((this.fetchParam))
            videoService.search(this.fetchParam).then((ret) => {
                this.data = ret
                this.total = ret.total
                this.loadingData = false
                xmview.setContentLoading(false)
            })
        },
        selectVideo(index, row) {
            // this.$emit('selectVideo',row)
            this.setShowDialog(false)
            this.onSelect && this.onSelect(row)
        },
        setShowDialog(val) {
            if (val === this.isShowDialog) return
            this.isShowDialog = val
        }
    },
    components: {}
}
</script>
