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


    }
</style>

<template>
    <article id="course-manage-coursecategory">

        <section class="right-container">
            <el-card class="edit-content">
                <el-form label-position="right" label-width="90px" :rules="rules" :model="fetchParam" ref="form">
                    <el-form-item label="公告标题" prop="title">
                        <el-input v-model="fetchParam.title" ></el-input>
                    </el-form-item>
                    <el-form-item label="公告内容" prop="content">
                        <el-input v-model="fetchParam.content" ></el-input>
                    </el-form-item>
                    <el-form-item label="公告图片" prop="images" class="images">
                        <UploadImg ref="uploadImg" :defaultImg="fetchParam.images" :url="uploadImgUrl"
                                   :onSuccess="handleImgUploaded">
                        </UploadImg>
                    </el-form-item>
                    <el-form-item prop="sendtime" label="发送时间" >
                        <el-date-picker v-model="fetchParam.sendtime" type="date" />
                    </el-form-item>

                    <el-form-item label="发送范围" >
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedMenus" @change="handleCheckedMenusChange">
                            <el-checkbox v-for="item in allCheckData" :label="item.id" :key="item.id" :value="item.id">{{item.concact}}</el-checkbox>
                        </el-checkbox-group>
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
        
    </article>
</template>

<script >
    import announceService from '../../services/announce/announceService.js'
    import treeUtils from '../../utils/treeUtils'
    import UploadImg from '../component/upload/UploadImages.vue'
    import { date2Str } from '../../utils/timeUtils.js'

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
                dialogTree: {
                    isShow: false,
                    confirmClick: {}
                },
                fetchParam: getFetchParam(),
                rules: {
                    title: [
                        {required: true, message: '请输入公告标题', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请输入公告内容', trigger: 'blur'},
                    ],
                    images: [
                        // {required: true, message: '请上传栏目logo', trigger: 'blur'}
                    ]
                },
                checkedMenus: [],
                //checkbox 的相关数据
                checkAll: false,
                allCheckData:[],     // 总的数据
            }
        },
        watch: {
            'activeTab'(val) {
                if (val === 'add'||val === 'root') {
                    this.resetForm()
                }
            },
        },
        activated () {
            xmview.setContentLoading(false)
            this.uploadImgUrl = announceService.getUploadCategoryImgUrl()
            console.log(this.uploadImgUrl)
            this.fetchData()
        },
        methods: {

             //全选反选按钮
            handleCheckAllChange(event) {
                var arr = this.allCheckData.map(v=>{
                    return v.id
                })
                this.checkedMenus = event.target.checked ? arr : [];
            },
            handleCheckedMenusChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.allCheckData.length;
            },

            //总的数据     
            fetchData(val) {
                return announceService.fetchAllCheckData(this.fetchParam).then((ret) => {
                    // console.log('全部的菜单======')
                    this.allCheckData = ret
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
                



                this.$refs.form.validate((ret) => {
                    if (!ret) return
                    this.fetchParam.sendtime = this.fetchParam.sendtime ? date2Str(this.fetchParam.sendtime) : ''
                    this.fetchParam.range=this.checkedMenus.join(',')
                    // console.log(this.fetchParam)
                    announceService.announceSend(this.fetchParam).then((ret) => {
                        xmview.showTip('success', '操作成功!')
                        this.$refs['form'].resetFields()
                        // if (this.activeTab === 'edit') {
                        //     this.nodeSelected.label = this.fetchParam.title  
                        //     node.data.data=this.fetchParam
                        //     // this.nodeSelected.item = this.fetchParam
                        //     this.$forceUpdate()
                        // } else {
                        //     this.fetchParam.id = ret.data.id
                        //     let addedItem = {
                        //         title: this.fetchParam.title,
                        //         value: this.fetchParam.id,
                        //         item: this.fetchParam
                        //     }

                            // 如果是添加的根节点
                            this.fetchParam = getFetchParam()
                        // }
                    })
                })
            },
            // 重置表单
            resetForm () {
                this.$refs.form.resetFields()
            },
           
           
        },
        components: { UploadImg}
    }

    function getFetchParam () {
        return {
            title: void 0,
            content: void 0,
            images: void 0,
            sendtime: '',
            range:'',


        }
    }


</script>
