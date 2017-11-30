<!--使用实例-->
<!--<Transfer :data="allCompany"-->
          <!--v-model="selectCompany"></Transfer>-->
<style lang="scss" rel="stylesheet/scss">
    .transfer-container {
        margin: 0 auto;
        .dialog-add-item {
            height: 500px;
            width: 45%;
            display: inline-block;
            vertical-align: top;
            &:first-of-type {
                margin-right: 2%;
                margin-left: 4%;
                .footer {
                    text-align: left;
                    padding-left: 10px;
                }
            }
            h5 {
                line-height: 40px;
                font-size: 14px;
                padding-left: 20px;
                background: #fbfdff;
                border: 1px solid #d1dbe5;
                border-bottom: none;
            }
            .el-input {
                width: 100%;
                input {
                    border-radius: 0;
                    border: 1px solid #d1dbe5;
                    border-bottom: none;
                }
            }
            .row-class {
                border-bottom: none !important;
            }
            .footer {
                text-align: right;
                line-height: 40px;
                padding-right: 10px;
            }
        }
    }
</style>
<template>
    <article class="transfer-container">
        <div class="dialog-add-item">
            <h5>全部</h5>
            <el-table :data="data"
                      :height="400"
                      :show-header="false"
                      :fit="true"
                      ref="multiple"
                      v-loading="loading"
                      row-class-name="row-class"
                      @select="selectRow">
                <el-table-column type="selection" :selectable="(row) =>  row.id != -1">
                </el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <i v-if="scope.row.id != -1">{{scope.row.name}}</i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer"><el-button type="text" @click="selectAll">全选</el-button></div>
        </div>
        <div class="dialog-add-item">
            <h5>已选择</h5>
            <el-table :show-header="false" :data="selectData" :height="400" :fit="true" row-class-name="row-class" v-loading="selectLoading">
                <el-table-column>
                    <template scope="scope">
                        <i v-if="scope.row.id != -1">{{scope.row.name}}</i>
                        <el-button type="text" @click="deleteData(scope.$index, scope.row)" icon="delete" size="small" style="float:right;"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer"><el-button type="text" @click="deleteAll">全部删除</el-button></div>
        </div>
    </article>
</template>
<script>
    import clone from 'clone'
    export default {
        props: {
            data: {
                type: Array,
            },
            value: {
                type: Array,
            }
        },
        watch: {
            data (val) {
                this.data = val
            },
            value (val) {
                this.selectData = val
            }
        },
        data () {
            return {
                selectData: this.value,
                keyword: '',
                loading: false,
                selectLoading: false
            }
        },
        methods: {
            fetchData () {
                this.$emit('searchFn', this.keyword)
            },
            deleteData (index, row) {
                this.selectData.splice(index, 1)
                this.data.forEach((item) => {
                    if (item.id === row.id) this.$refs.multiple.toggleRowSelection(item, false)
                })
                this.$emit('input', this.selectData)
            },
            // 选中数据
            selectRow (selection, row) {
                if (row.id < 0) return
                for (let i = 0; i < this.selectData.length; i++) {
                    if (this.selectData[i].id == row.id) {
                        this.selectData.splice(i, 1)
                        return
                    }
                }
                this.selectData.push(row)
                this.$emit('input', this.selectData)
            },
            // 全选
            selectAll () {
                this.data.forEach((item) => {
                    this.$refs.multiple.toggleRowSelection(item, true)
                })
                this.selectData = clone(this.data).splice(0, this.data.length - 1)
                this.$emit('input', this.selectData)
            },
            // 全部删除
            deleteAll () {
                this.selectData = []
                this.data.forEach((item) => {
                    this.$refs.multiple.toggleRowSelection(item, false)
                })
                this.$emit('input', this.selectData)
            },
        }
    }
</script>
