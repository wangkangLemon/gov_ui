<!--栏目管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../utils/mixins/common";
    @import "../../utils/mixins/mixins";

    #course-manage-coursecategory {
        @extend %content-container;

        .manage-container {
            @extend %right-top-btnContainer;
        }

        > section {
            display: inline-block;
            vertical-align: top;
        }
        .left-container {
            min-width: 300px;
            border-right: 1px solid #ededed;
        }

        .right-container {
            margin-left: 15px;
            width: 700px;
            .edit-content {
                margin: 10px 0 0

            }

            .btn-selected {
                background: #20A0FF;
                color: #fff;
            }
        }
        .collection {
            align-items: center;
            min-height: 36px;
            border-radius: 4px;
            padding: 3px 30px 3px 10px;
            border: 1px solid #bfcbd9;
        }

        .u-course-tag {
            margin-right: 10px;
            background-color: rgba(32,160,255,.1);
            display: inline-block;
            padding: 0 10px;
            height: 32px;
            line-height: 30px;
            font-size: 12px;
            color: #20a0ff;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid rgba(32,160,255,.2);
            white-space: nowrap;
            &:last-child {
                margin-right: 0;
            }
        }
        .el-tabs__content {
            position: relative;
            .dialog-select-item {
                h5 {
                    line-height: 40px;
                    font-size: 14px;
                    padding-left: 20px;
                    background: #fbfdff;
                    border: 1px solid #d1dbe5;
                    border-bottom: none;
                }
                position: absolute;
                top: 54px;
                right: 120px;
                height: 500px;
                width: 42%;
                display: inline-block;
                vertical-align: top;
            }
        }
        .row-class {
            border: 1px solid #d1dbe5;
        }

        .course-search {
            margin-bottom: 12px;
            .el-input {
                width: 150px;
                ::-webkit-input-placeholder {
                    font-size: 13px
                }
            }
        }

    }
</style>

<template>
    <article id="course-manage-coursecategory">

        <section class="right-container">
            <el-card class="edit-content">
                <el-form label-position="right" label-width="90px" :rules="rules" :model="fetchParam" ref="form">
                    <el-form-item label="类别" prop="category_id"  :fetch-suggestions="querySearch">
                        <el-select clearable class="select" v-model="fetchParam.category_id" placeholder="请选择类别"  @change="fetchData">
                            <el-option  v-for="item in  category_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公告标题" prop="name">
                        <el-input v-model="fetchParam.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="公告内容" prop="content">
                        <el-input v-model="fetchParam.content" ></el-input>
                    </el-form-item>
                    <el-form-item label="公告图片" prop="images" class="images">
                        <UploadImg ref="uploadImg" :fetchParam.images="fetchParam.images" :url="uploadImgUrl"
                                   :onSuccess="handleImgUploaded">
                        </UploadImg>
                    </el-form-item>
                    <el-form-item prop="sendtime" label="发送时间" >
                        <el-date-picker v-model="fetchParam.sendtime" type="date" />
                    </el-form-item>
                    <el-form-item label="是否推送" prop="pushabled">
                        <el-radio-group v-model="fetchParam.pushabled">
                            <el-radio :label="0">不推送 </el-radio>
                            <el-radio :label="1">推送</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--<el-form-item label="发送范围" >
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedMenus" @change="handleCheckedMenusChange">
                            <el-checkbox v-for="item in allCheckData" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>-->
                    <el-form-item label="发送部门">
                        <div class="collection" @click="openPushTypeDialog">
                            <el-tag
                                class="u-course-tag"
                                v-for="item in pushTypeDialog.selectedData[this.pushTypeDialog.type]"
                                :key="item.id">
                                {{item.name}}
                            </el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="submitForm" >保存
                            <!--zhankeng-->
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </section>

        <el-dialog title="操作提示" v-model="dialogConfirm.isShow" size="tiny">
            <span v-html="dialogConfirm.msg"></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogConfirm.isShow = false">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm.confirmClick">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 发布对象弹窗 -->
        <el-dialog
            :title="pushTypeDialog.title"
            :visible.sync="pushTypeDialog.showDialog"
            v-if="pushTypeDialog.showDialog">
            <template v-if="pushTypeDialog.isSearch">
                <section class="search">
                    <section>
                        <i>部门</i>
                        <DepSelect v-model="pushTypeDialog.fetchParam.gov_id" :change="getPushTypeData"></DepSelect>
                    </section>
                </section>
            </template>
            <Transfer placeholder="搜索"
                      @searchFn="(val)=>{pushTypeDialog.page=1;pushTypeDialog.fetchParam.name=val;fetchPushTypeData();}"
                      @moreFn="()=>{pushTypeDialog.page++;fetchPushTypeData('no-clear');}"
                      :total="pushTypeDialog.total"
                      :data="pushTypeDialog.data"
                      :selectedValue='selectData'
                      v-model="pushTypeDialog.selectedData[pushTypeDialog.type]"></Transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushTypeDialog.showDialog = false">取 消</el-button>
                <el-button type="primary" @click="transferConfirmFn">确 定</el-button>
            </span>
        </el-dialog>


    </article>
</template>

<script >
    import announceService from '../../services/announce/announceService.js'
    import treeUtils from '../../utils/treeUtils'
    import UploadImg from '../component/upload/UploadImages.vue'
    import { date2Str } from '../../utils/timeUtils.js'
    import Transfer from '../component/dialog/Transfer.vue'

    export default{
        data () {
            return {
                activeTab: 'add',
                uploadImgUrl: '',
                nodeSelected: void 0, // 被选中的node节点
                nodeParentSelected: void 0, // 被选中node节点的父节点
                moveToNode: void 0, // 将要移动到最终的栏目
                treeData: [],
                dialogConfirm: {
                    isShow: false,
                    msg: '',
                    confirmClick: {}
                },
                fetchParam: getFetchParam(),
                rules: {
                    category_id: [
                        {required: true, type:'number', message: '请输入类别', trigger: 'change'},
                    ],
                    name: [
                        {required: true, pattern:  /\S$/, min: 1, message: '请输入非空格或非特殊字符的标题', trigger: 'blur'},
                    ],
                    content: [
                        {required: true,  pattern:  /\S$/, min: 1,message: '请输入非空格或非特殊字符的内容', trigger: 'blur'},
                    ],
                    images: [
                        {required: true, message: '请上传栏目logo', trigger: 'blur'}
                    ],
                    sendtime: [
                        {required: true, type:'object', message: '请输入发送时间', trigger: 'blur'}
                    ],
                    pushabled: [
                        {required: true,  type:'number', message: '请选择是否推送', trigger: 'blur'}
                    ],
                    // images: [
                    //     {required: true, message: '请上传栏目logo', trigger: 'blur'}
                    // ],
                },
                checkedMenus: [],
                //checkbox 的相关数据
                checkAll: false,
                allCheckData:[],     // 总的数据
                category_list:[],
                pushTypeDialog: { //发布对象数据模型
                    fetchParam: {
                        gov_id: '',
                        gov_ids: '',
                        name: ''
                    },
                    title: '',
                    isSearch: '',
                    type: '',
                    showDialog: false,
                    selectedData: {
                        2: [],
                        1: []
                    },
                    data: [],
                    page: 1,
                    pagesize: 15,
                    total: 0,
                },
                selectData:[],
            }
        },
        watch: {
            'activeTab'(val) {
                if (val === 'add'||val === 'root') {
                    this.resetForm()
                }
            },
            'fetchParam.pushabled'(){
                console.log(typeof(this.fetchParam.pushabled))
            }
        },

        activated () {
            this.fetchParam = getFetchParam()
            console.log(this.fetchParam)
            this.checkAll=this.checkedMenus= 0
            xmview.setContentLoading(false)
            this.uploadImgUrl = announceService.getUploadCategoryImgUrl()
            console.log(this.uploadImgUrl)
            this.$refs.uploadImg.clearFiles()
            this.fetchData()
            this.getCategory()
            this.pushTypeDialog.selectedData[this.pushTypeDialog.type] =[]
        },
        methods: {
            transferConfirmFn () {
                this.pushTypeDialog.showDialog = false
            },
            //打开发布对象弹出框
            openPushTypeDialog () {
                this.pushTypeDialog.showDialog = true
                this.pushTypeDialog.page = 1
                this.pushTypeDialog.fetchParam.gov_id = ''
                this.pushTypeDialog.fetchParam.gov_ids = ''
                this.pushTypeDialog.fetchParam.name = ''
                this.fetchPushTypeData()
            },
            getPushTypeData () {
                this.pushTypeDialog.page = 1
                this.fetchPushTypeData()
            },
            fetchPushTypeData (type) {
                type !== 'no-clear' && (this.pushTypeDialog.data = [])
                let map = {
                    1: announceService.fetchAllCheckData,  //部门
                    // 2: userService.fetchData,  //人员
                    // user_group: userService.userGroupSearch
                }
                let param = {
                    name: this.pushTypeDialog.fetchParam.name,
                    page: this.pushTypeDialog.page,
                    pagesize: this.pushTypeDialog.pagesize
                }

                if (this.pushTypeDialog.isSearch) {
                    param.gov_id = this.pushTypeDialog.fetchParam.gov_id
                    param.role_id = -1
                }
                console.log(param)
                // map[this.pushTypeDialog.type](param).then(ret => {
                announceService.fetchAllCheckData(param).then(ret => {

                    // this.pushTypeDialog.total = ret._exts.total
                    this.pushTypeDialog.total = ret._exts.total
                    // if (this.pushTypeDialog.data.length > 0 && this.pushTypeDialog.data.length < ret._exts.total) {
                    if (this.pushTypeDialog.data.length > 0 ) {
                        this.pushTypeDialog.data.splice(-1, 1)
                    }
                    this.pushTypeDialog.data.push(...ret.data, {id: -1}) //暂无id:-1 字段
                    // this.pushTypeDialog.data.push(...ret.data) //暂无id:-1 字段
                    //  this.pushTypeDialog.data.forEach(item => { item.type = 'exam' })
                })
            },
            //获取部门组下拉列表
            getCategory(val){
                announceService.getCategoryTree({pagesize:-1, disabled:-1}).then((ret)=>{
                    console.log(ret)
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
             //全选反选按钮
            handleCheckAllChange(event) {
                var arr = this.allCheckData.map(v=>{
                    return v.id
                })
                this.checkedMenus = event.target.checked ? arr : [];
            },
            handleCheckedMenusChange(value) {
                console.log(value)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.allCheckData.length;
            },

            //总的数据
            fetchData(val) {
                return announceService.fetchAllCheckData(this.fetchParam).then((ret) => {
                    // console.log('全部的菜单======')
                    this.allCheckData = ret.data
                    this.loadingData = false
                    this.checkAll = this.checkedMenus.length === this.allCheckData.length;
                    xmview.setContentLoading(false)
                })
            },
            // 图片上传完毕
            handleImgUploaded (response, file, fileList) {

                // this.fetchParam.images = response.url
                // if (this.fetchParam.images.indexOf(response.data.url) == -1) {
                //     this.fetchParam.images.push(response.data.url)
                // }


                // console.log(response)


                //  this.fetchParam.images = response.map(function(v){
                //     return v.response.data.url
                // }).join()


                // console.log(this.fetchParam.images)
            },


            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
            // 提交表单
            submitForm () {
                // announceService.createM(this.$route.params.role_id,ids).then((ret) => {
                //     this.fetchParamImp = ret
                //     console.log(ret)
                // })

               this.fetchParam.images = this.$refs.uploadImg.imgList.map(function(v){
                    return v.response.data.url
                }).join()
                // if(this.form.type==1){
                //     // 处理govids
                //     this.fetchParam.gov_ids = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                //     return item.id
                //     }).join(',')
                // }else{
                //     // 处理userids
                //     this.form.user_ids = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                //     return item.id
                //     }).join(',')
                // }
                this.$refs.form.validate((ret) => {
                    if (!ret) return
                    this.fetchParam.sendtime = this.fetchParam.sendtime ? date2Str(this.fetchParam.sendtime) : ''
                    this.fetchParam.range=this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                        return item.id
                        }).join(',')
                    console.log(this.fetchParam)
                    announceService.announceSend(this.fetchParam).then((ret) => {
                        xmview.showTip('success', '操作成功!')
                        this.$refs['form'].resetFields()
                        // if (this.activeTab === 'edit') {
                        //     this.nodeSelected.label = this.fetchParam.name
                        //     node.data.data=this.fetchParam
                        //     // this.nodeSelected.item = this.fetchParam
                        //     this.$forceUpdate()
                        // } else {
                        //     this.fetchParam.id = ret.data.id
                        //     let addedItem = {
                        //         name: this.fetchParam.name,
                        //         value: this.fetchParam.id,
                        //         item: this.fetchParam
                        //     }
                            // 如果是添加的根节点
                            this.$router.push({name: 'announce-lists'})
                            this.fetchParam =getFetchParam()
                        // }
                    })
                })
            },
            // 重置表单
            resetForm () {
                this.$refs.form.resetFields()
            },


        },
        components: { UploadImg, Transfer}
    }

    function getFetchParam () {
        return {
            category_id: '',
            name: '',
            content: void 0,
            images: void 0,
            sendtime: '',
            pushabled :void 0,
            range:'',
        }
    }


</script>
