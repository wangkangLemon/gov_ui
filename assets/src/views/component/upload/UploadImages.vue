<!--使用ex.-->
<!--<el-form-item label="反馈附件" prop="image">-->
<!--<UploadImages :url="uploadImgUrl" :fileNum="fileNum" :name="file"-->
<!--:on-success="res => form.images.push(res.data.url)"-->
<!--:on-remove="file => form.images.splice(form.images.indexOf(file.response.data.url),1)" ></UploadImg>-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    .component-upload-uploadimages {
        height: auto !important;
        .el-upload-list__item,
        .el-upload--picture-card {
            width: 100px;
            height: 100px;
        }
        .el-upload--picture-card {
            line-height: 100px;
        }
    }
</style>
<template>
    <div class="component-upload-uploadimages" ref="container">
        <el-upload :headers="headers"
                   :action="url"
                   :name="name"
                   :data="data"
                   list-type="picture-card"
                   :multiple="multiple"
                   :on-success="handleSuccess"
                   :on-error="handleRemove"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="imgList" 
                   :limit="2" 
                   accept="image/jpg,image/jpeg,image/png,image/gif">
            <!--<i v-if="showUploadBtn" class="el-icon-plus"></i>-->
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import authUtils from '../../../utils/authUtils'
    import config from '../../../utils/config'
    export default{
        props: {
            // 要上传的url地址
            url: String,
            // 上传的文件字段名
            name: {
                type: String,
                default: 'image',
            },
            // 上传成功后的回调
            onSuccess: Function,
            // 删除后的回调
            onRemove: Function,
            // 允许上传多少个文件，默认只允许上传一个
            fileNum: {
                type: Number,
                default: 9
            },
            //上传的参数
            data:{
                type:Object,
                default:()=>({
                    biz: "",
                    extpath: ""
                })
               
            }
        },
        data () {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                showUploadBtn: true,
                headers: void 0,
                host: config.apiHost,
                uploadBtn: null, // 上传按钮
                multiple: true,
                imgList: [],

            }
        },
        watch: {
            'imgList' (val) {
                // console.log(this.apiHost)
                if (val.length >= this.fileNum && val[0].url) {
                    // console.log('hide btn')
                    this.uploadBtn.style.display = 'none'
                } else {
                    // console.log('show btn')
                    this.uploadBtn.style.display = 'inline-block'
                }
            }
        },
        created () {
            this.headers = {
                'Authorization': 'Bearer ' + authUtils.getAuthToken(),
                'TwoStep': `Bearer ` + authUtils.getTwiceToken() // 二次验证的token
            }
        },
        activated () {
            console.log(this.govid)
            this.uploadBtn && (this.uploadBtn = this.$refs.container.querySelector('.el-upload--picture-card'))
        },
        mounted () {
            this.uploadBtn = this.$refs.container.querySelector('.el-upload--picture-card')
        },
        methods: {
            handlePreview (file) {
                this.dialogImageUrl = file.url
                console.log(file.url)
                this.dialogVisible = true
            },
            handleRemove (file, fileList) {
                // console.log('handleRemove', file, fileList)
                this.onRemove && this.onRemove(file, fileList)
                this.imgList = fileList
                // this.$refs.container.querySelector('.el-upload__input').value = null
            },
            handleSuccess (response, file, fileList) {
                // console.log( response)
                // console.log('handleSuccess', response, file, fileList)

                if (response.code == 0) {
                    this.onSuccess && this.onSuccess( response)
              
                    // this.dialogImageUrl = '';
                    // this.dialogVisible = false;
                    this.imgList = fileList   
                    // console.table(this.imgList);
                  
                } else {
                    xmview.showTip('error', response.message)
                }
            },
            clearFiles() {
                this.imgList = []
            }
        },
    }
</script>
