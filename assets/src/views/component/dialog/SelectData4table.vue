<!--弹出表格选则数据-->
<!--使用demo-->

<!--<dialogSelectData v-model="dialogCourse.isShow" :fetchData="fetchCourse" title="选择课程"-->
<!--:selectedList="form.courses" @changeSelected="val=>form.courses=val">-->
<!--<div style="margin-bottom: 15px" slot="search">-->
<!--<el-input @keyup.enter.native="fetchCourse(true)" v-model="dialogCourse.keyword" icon="search"-->
<!--placeholder="请输入关键字搜索"></el-input>-->
<!--</div>-->
<!--</dialogSelectData>-->

<style lang='scss' rel='stylesheet/scss'>
    .comp-dialog-select4table {
        main {
            > section {
                >aside{
                    margin-bottom: 5px;
                }
                display: inline-block;
                width: 43%;

                &:first-of-type {
                    margin-right: 5%;
                }
            }
        }
    }
</style>

<template>
    <el-dialog :title="title" v-model="currVal" class="comp-dialog-select4table">
        <main>
            <slot name="search"></slot>
            <section>
                <aside>未选中</aside>
                <el-table ref="courseTable" v-loading="loading" :data="data" :show-header="false"
                          :height="500"
                          @select="rowSelected">
                    <el-table-column type="selection" :selectable="(row) =>  row.id != -1"></el-table-column>
                    <el-table-column>
                        <template scope="scope" >
                            <i v-if="scope.row.id != -1">{{scope.row.course_name}}</i>
                            <el-button @click="fetchCourse(false)" class="dialog-getmore-btn" type="text"
                                       v-else :disabled="data.length - 1 >= total">
                                <i>{{data.length - 1 >= total ? '已无更多' : '点击加载更多'}}</i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <section>
                <aside>已选中</aside>
                <el-table :show-header="false" :height="500" :data="currSelectedList">
                    <el-table-column>
                        <template scope="scope">
                            {{scope.row.course_name}}
                            <el-button style="float: right;margin-right: 10px" type="text" size="tiny" icon="delete"
                                       @click="delItem(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </main>
        <span slot="footer">
                <el-button type="primary" @click="currVal=false">确定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default{
        props: {
            title: String, // dialog的标题
            value: { // 是否显示
                type: Boolean,
                default: false
            },
            // 获取数据的方法 返回一个Promise,  数据格式: { total: 9, data:[{ name:'xxx', id:1 }] }
            getData: Function,
            // 被选中的列表集合
            selectedList: Array, //右侧
            itemKey: {
                type:String,
                default: 'id'
            },
            getItemKey: {
                type:String,
                default: 'id'
            }
        },
        data () {
            return {
                currVal: this.value, //控制弹出框关闭
                currSelectedList: this.selectedList,
                fetchParam: {
                    page: 1,
                    pagesize: 15,
                    need_testing: 1,
                },
                total: 0,
                data: [],
                loading: false
            }
        },
        watch: {
            currVal (val) {
                this.$emit('input', val)
            },
            value (val) {
                val !== this.currVal && (this.currVal = val)
                if (val && this.data.length < 1) this.fetchCourse()
                val && this.setSelected()
            },
            selectedList (val) { //出现混乱是不是ID没有匹配对？？？ 拿到的值
                console.log('右侧列表上次val====',val) 
                if (val !== this.currSelectedList && val.length !== this.currSelectedList.length)  //检测刷新赋值
                    this.currSelectedList = val
            }
        },
        created () {
        },
        activated () {
        },
        methods: {
            fetchCourse (isFirst) {
                this.loading = true
                if (isFirst) this.fetchParam.page = 1
                this.getData(this.fetchParam).then((ret) => {
                    this.total = ret._exts.total
                    // 是否首次加载
                    if (this.fetchParam.page === 1) {
                        this.fetchParam.page = 1
                        this.data = []
                        if (ret.data.length < 1) return
                    }
                    this.data.splice(-1, 1)
                    this.data.push(...[...ret.data, {id: -1}])
                    console.log('dataGot: ', this.data)
                    // 设置选中
                    this.setSelected()

                    this.fetchParam.page++
                }, () => {
                }).then(() => {
                    this.loading = false
                })
            },
            rowSelected (selection, row) {// 选中 取消选中选择框！ //selection左侧选中 
                // 排除已选课程
                console.log(111111111111111,selection, row)  
                if (selection.indexOf(row) > -1)
                    this.currSelectedList.push(row)
                else
                    // this.currSelectedList.splice(this.currSelectedList.indexOf(row), 1)
                    this.currSelectedList.splice(this.currSelectedList.findIndex(item => {
                        row.id=row[this.itemKey]?row[this.itemKey]:row.id //2018-07-06 解决ID不对应，删除混乱 优先匹配[this.itemKey]删除
                        console.log('item.id ===',row.id);
                        return item[this.itemKey] === row.id  // 优先匹配[this.itemKey]删除
                    }), 1)
                // 重新设置选中
                // this.setSelected ()
                this.$emit('changeSelected', this.currSelectedList)
                console.log('右侧选中的列表',this.currSelectedList)
            },
            delItem (row) {    // 右侧删除！
                this.currSelectedList.splice(this.currSelectedList.findIndex(item => {
                    row.id=row.id?row.id:row[this.itemKey] //2018-07-06 解决ID不对应，删除混乱 优先匹配id删除
                    console.log('item.id ===',row.id);
                    return item.id === row.id  

                }), 1)
                // 重新设置选中
                this.setSelected()
                this.$emit('changeSelected', this.currSelectedList)
            },
            // 设置选中
            setSelected () {
                // console.log('setSelected')
                this.$nextTick(() => {
                    if (!this.$refs.courseTable) return
                    this.$refs.courseTable.clearSelection()
                    this.currSelectedList.forEach((row) => {
                        console.log('左边数据',this.data)//左边数据
                        let currRow = this.data.find((item) => {
                            return item[this.itemKey] == row[this.itemKey]
                        })
                        console.log('左边选中数据',currRow)//左边选中数据
                        this.$refs.courseTable.toggleRowSelection(currRow, true)
                        console.log('setSelected finished')
                    })
                })
            }
        },
        components: {}
    }
</script>
