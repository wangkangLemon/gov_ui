<!--栏目管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/mixins";

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

        .el-dialog__wrapper {
            padding-top: 15px;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
        }
    }
</style>

<template>
    <article id="course-manage-coursecategory">
        <section class="manage-container">
            <el-button type="primary" @click="addRootCategory">新建栏目</el-button>
        </section>

        <section class="left-container">
            <!--这是view-->
            <CourseCategoryTree v-model="treeData" ref="courseCategory"
                                :onNodeClick="treeNodeClick.bind(this,1)">
            </CourseCategoryTree>
        </section>

        <section class="right-container">
            <div >
                <el-button :class="{'btn-selected': activeTab == 'edit'}" @click="activeTab = 'edit'">修改栏目</el-button>
                <el-button :class="{'btn-selected': activeTab == 'add'}" @click="activeTab = 'add'" >添加子栏目</el-button>
                <el-button @click="moveSubCategory" disabled>移动栏目</el-button>
                <el-button @click="moveSubCategoryContent" disabled>移动栏目下内容</el-button>
                <el-button type="danger" @click="deleteCategory">删除栏目</el-button>
                <el-button :class="{'btn-selected': activeTab == 'root'}" @click="addRootCategory">添加根节点</el-button>
            </div>

            <el-card class="edit-content">
                <el-form label-position="right" label-width="90px" :rules="rules" :model="fetchParam" ref="form">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="fetchParam.name" :disabled="fetchParam.pid == null"></el-input>
                    </el-form-item>
                    <el-form-item label="栏目logo" prop="image">
                        <UploadImg ref="uploadImg" :defaultImg="fetchParam.image" :url="uploadImgUrl"
                                   :disabled="fetchParam.pid == null"
                                   :onSuccess="handleImgUploaded">
                        </UploadImg>
                    </el-form-item>
                    <el-form-item label="课程类型" prop="category_type">
                        <el-radio-group v-model="fetchParam.category_type">
                            <el-radio :label="1">课程栏目</el-radio>
                            <el-radio :label="2">应试课程栏目</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否最终菜单" prop="ended">
                        <el-radio-group v-model="fetchParam.ended">
                            <el-radio :label="0">否</el-radio>
                            <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="栏目排序" prop="sort">
                        <el-input placeholder="最小的排在前面" :disabled="fetchParam.pid == null"
                                  v-model.number="fetchParam.sort"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="submitForm" :disabled="fetchParam.pid == null">保存
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
        <!--移动子栏目的弹出框-->
        <div class="el-dialog__wrapper" v-if="dialogTree.isShow">
            <article class="el-dialog el-dialog--tiny">
                <section class="el-dialog__header">
                    移动栏目【
                    <span style="color:red">
                        {{nodeSelected && nodeSelected.label}}
                    </span> <i>】到</i>
                </section>
                <section class="el-dialog__body">
                    <CourseCategoryTree v-model="treeData" node-key="id"
                                        :onNodeClick="treeNodeClick.bind(this,2)"></CourseCategoryTree>
                </section>

                <section class="el-dialog__footer">
                    <span class="dialog-footer">
                          <el-button @click="dialogTree.isShow = false">取 消</el-button>
                        <el-button type="primary" @click="dialogTree.confirmClick">确 定</el-button>
                    </span>
                </section>
            </article>
        </div>
    </article>
</template>

<script >
    import courseService from '../../../services/course/courseService.js'
    import treeUtils from '../../../utils/treeUtils'
    import CourseCategoryTree from '../../component/tree/CourseCategory.vue'
    import UploadImg from '../../component/upload/UploadImg.vue'

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
                    name: [
                        {required: true, message: '请输入栏目名称', trigger: 'blur'},
                    ],
                    image: [
                        {required: true, message: '请上传栏目logo', trigger: 'blur'}
                    ]
                }
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
            this.uploadImgUrl = courseService.getUploadCategoryImgUrl()
        },
        methods: {
            // 删除栏目
            deleteCategory (){
                let node = this.nodeSelected
                // console.log( node.value)
                if (node && node.children) {
                    xmview.showTip('warning', '该栏目下还有子栏目,不能被删除')
                    return
                }
                this.dialogConfirm.isShow = true
                this.dialogConfirm.msg = `是否确认删除栏目 <i style="color:red">${node.label}</i> 吗？`
                this.dialogConfirm.confirmClick = () => {
                    courseService.delete_cate( node.value).then(() => {
                        xmview.showTip('success', '操作成功!')
                        this.$refs.courseCategory.removeItem(node, this.nodeParentSelected)
                        node = null
                        this.dialogConfirm.isShow = false
                        this.resetForm()
                        this.fetchParam = getFetchParam()
                    })
                }
            },
            // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                // console.log('===========   node.data.data==========  ')
                // console.log(node)
                if (type == 1) { 
                    // if (this.nodeSelected && this.nodeSelected.value === data.value) return  
                    this.nodeParentSelected = node.parent// 记录父节点
                    this.nodeSelected = node // 记录当前节点
                    this.$refs.uploadImg.clearFiles()
                    this.fetchParam = Object.assign({},node.data)  //解决左右数据
                    this.activeTab = 'edit'
                } else if (type == 2) {
                    this.moveToNode = node
                }
            },
            // 图片上传完毕
            handleImgUploaded (response) {
                this.fetchParam.image = response.data.url
            },
            // 新建根节点
            addRootCategory () {
                this.activeTab = 'root'
                // 清空选中项
                this.$refs.courseCategory.clearSelected()
                this.fetchParam.pid = 0
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
            // 提交表单
            submitForm () {
                this.$refs.form.validate((ret) => {
                    if (!ret) return

                    let p
                    if (this.activeTab === 'add'){
                        this.fetchParam.pid =this.fetchParam.id  
                        p = courseService.create_cate(this.fetchParam)
                        
                    }
                    else{
                        p = courseService.update_cate(this.fetchParam)
                    }

                    p.then((ret) => {
                        xmview.showTip('success', '操作成功!')
                        if (this.activeTab === 'edit') {
                            this.nodeSelected.label = this.fetchParam.name  
                            node.data.data=this.fetchParam
                            // this.nodeSelected.item = this.fetchParam
                            this.$forceUpdate()
                        } else {
                            this.fetchParam.id = ret.data.id
                            let addedItem = {
                                label: this.fetchParam.name,
                                value: this.fetchParam.id,
                                item: this.fetchParam
                            }

                            // 如果是添加的根节点
                            if (this.fetchParam.pid === 0) this.$refs.courseCategory.initData()
                            else if (!this.nodeSelected.children) this.nodeSelected.children = [{label: '加载中...'}]
                            else if (this.nodeSelected.children[0].value) this.nodeSelected.children.push(addedItem)
                            this.fetchParam = getFetchParam()
                        }
                    })
                })
            },
            // 重置表单
            resetForm () {
                this.$refs.form.resetFields()
            },
            // 移动子栏目点击
            moveSubCategory () {
                if (!this.nodeSelected) {
                    xmview.showTip('warning', '请先选中一个栏目')
                    return
                }

                this.dialogTree.isShow = true
                this.dialogTree.confirmClick = () => {
                    let id = this.nodeSelected.value
                    let to = this.moveToNode.data.value
                    if (id === to) {
                        xmview.showTip('warning', '请选择不同的栏目')
                        return
                    }
                    courseService.moveCategory({id, to}).then((ret) => {
                        // 重新渲染树节点
                        if (ret.code === 0) {
                            xmview.showTip('success', '操作成功!')
                            this.$refs.courseCategory.initData()
                            this.dialogTree.isShow = false
                        } else if (ret.code === 1) {
                            xmview.showTip('error', ret.message)
                        }
                    })
                }
            },
            // 移动栏目下的内容
            moveSubCategoryContent () {
                if (!this.nodeSelected) {
                    xmview.showTip('warning', '请先选中一个栏目')
                    return
                }

                this.dialogTree.isShow = true
                this.dialogTree.confirmClick = () => {
                    let id = this.nodeSelected.value
                    let to = this.moveToNode.data.value
                    if (id === to) {
                        xmview.showTip('warning', '请选择不同的栏目')
                        return
                    }
                    courseService.moveCategoryContent({id, to}).then((ret) => {
                        // 重新渲染树节点
                        if (ret.code === 0) {
                            xmview.showTip('success', '操作成功!')
                            this.dialogTree.isShow = false
                        } else if (ret.code === 1) {
                            xmview.showTip('error', ret.message)
                        }
                    })
                }
            }
        },
        components: {CourseCategoryTree, UploadImg}
    }

    function getFetchParam () {
        return {
            pid: void 0, //父级id
            category_type: void '',
            name: void 0,
            image: void 0,
            sort: void 0,
            id: 0,
            ended: void 0,
        }
    }


</script>
