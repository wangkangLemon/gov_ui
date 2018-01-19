<template>
    <div class="el-card edit-content">
<!--
        <div class="el-card__body">
            <form class="el-form el-form--label-right">
                <div class="el-form-item is-required"><label for="name" class="el-form-item__label" style="width: 90px;">分类名称</label>
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner" v-model="selectData.name"></div>
                    </div>
                </div>
                <div class="el-form-item is-required"><label for="name" class="el-form-item__label" style="width: 90px;">模型标识</label>
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner" v-model="selectData.model"></div>
                    </div>
                </div>
                <div class="el-form-item is-required"><label for="name" class="el-form-item__label" style="width: 90px;">跳转路径</label>
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner" v-model="selectData.path"></div>
                    </div>
                </div>
                <div class="el-form-item"><label for="image" class="el-form-item__label" style="width: 90px;">分类logo</label>
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="component-upload-uploadimg">
                            <div>
                                <ul class="el-upload-list el-upload-list--picture-card"></ul>
                                <div class="el-upload el-upload--picture-card" style="display: block;"><i class="el-icon-plus"></i><input type="file" name="file" accept="image/jpg,image/jpeg,image/png,image/gif"
                                        class="el-upload__input"></div>
                            </div>
                            <div class="el-dialog__wrapper" style="display: none;">
                                <div class="el-dialog el-dialog--tiny" style="top: 15%;">
                                    <div class="el-dialog__header"><span class="el-dialog__title"></span>
                                        <div class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="el-form-item"><label for="sort" class="el-form-item__label" style="width: 90px;">分类排序</label>
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input autocomplete="off" placeholder="最小的排在前面" type="text" rows="2" validateevent="true" class="el-input__inner">
                        </div>
                    </div>
                </div>

                <div class="el-form-item">

                    <div class="el-form-item__content" style="margin-left: 90px;"><button type="button" class="el-button el-button--info" @click="save"><span>保存</span></button>

                    </div>
                </div>
            </form>
        </div>-->
        <el-card class="edit-content">
            <el-form label-position="right" label-width="90px" :rules="rules" :model="selectData" ref="form">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="selectData.name" ></el-input>
                </el-form-item>
                 <el-form-item label="模型标识">
                        <el-select v-model="selectData.model" placeholder="请选择">
                            <el-option label="混合开发" value="hybrid"></el-option>
                            <el-option label="原生开发" value="native"></el-option>
                            <el-option label="引用类型" value="link"></el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="跳转路径" prop="path">
                    <el-input v-model="selectData.path" ></el-input>
                </el-form-item>
                <el-form-item label="栏目logo" prop="image">
                    <UploadImg ref="uploadImg" :defaultImg="selectData.image" :url="uploadImgUrl"  :onSuccess="handleImgUploaded"></UploadImg>
                </el-form-item>
                <el-form-item label="分类排序" prop="sort">
                    <el-input placeholder="最小的排在前面"  v-model.number="selectData.sort"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info"  @click="save">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>
<script>
    import UploadImg from '../../component/upload/UploadImg.vue'
    import courseService from '../../../services/course/courseService.js'
    export default {
        components: {
            UploadImg
        },
        data() {
            return {
                SecMenu: [],
                selectData: {
                    name: '',
                    model: null,
                    path: '',
                    sort: void 0,
                    image: null,
                },
                uploadImgUrl: '',
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
        props: ['data', 'type'],

        watch: {
            'type' () {
                this.initData()
            },
            'data' () {
                //判断是否存在传过来的数据 有则使用无则初始化
                if (this.data) {
                    // console.log(this.data)
                    this.selectData = Object.assign({}, this.data)
                }
            }
            // '$store.state.index.secMenu'(){
            //     this.selectData = Object.assign({},this.$store.state.index.secMenu)
            // }
        },
        activated () {
            xmview.setContentLoading(false)
            this.uploadImgUrl = courseService.getUploadCategoryImgUrl()
        },
        methods: {
            initData() {
                this.selectData = {
                    name: '',
                    model: '',
                    path: '',
                    sort: void 0,
                    image: void 0,
                }
            },
            save() {
                xmview.showDialog(this.selectData, () => {
                    this.$emit('handleSave', this.selectData)
                })
            },
            // 图片上传完毕
            handleImgUploaded (response) {
                this.selectData.image = response.data.url
                // alert( response.data.url)
            },
            // 重置表单
            resetForm () {
                this.$refs.form.resetFields()
            },


        }
    }
</script>