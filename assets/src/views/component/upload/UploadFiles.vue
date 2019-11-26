<!--上传文件-->
<!--使用形如-->
<!--<UploadFile :defaultFile="file" url='asdjadasd' :on-success="handleChange" btnTitle='点击上传' :autoUpload=''></UploadFile>-->
<template>
    <el-upload ref="upload"
               :before-upload="beforeUpload"
               :headers="headers"
               :action="url"
               :data='uploadData'
               :name='name'
               :file-list="fileList"
               :accept="accept"
               :on-error="handleError"
               :auto-upload="autoUpload"
               :on-success="handleUploadMedia" :multiple="false" :on-progress="onProgress" :disabled="disabled" >
        <el-button size="small" :disabled="disabled" type="primary" v-if="this.btnType=='add'"><i><i class="el-icon-upload el-icon--left"></i></i>
        点击上传
        </el-button>
         <el-button size="small" :disabled="disabled" type="primary" :class="{active:'isactive'}" v-else>
        {{btnTitle}}
        </el-button>
    </el-upload>
</template>

<script>
    import authUtils from '../../../utils/authUtils'
    export default {
        props: {
            beforeUpload: Function, 
            url: {
                type: String, // 上传的url
                default: 'https://jsonplaceholder.typicode.com/posts/'
            },
            defaultFile: String,
            onSuccess: Function,
            disabled: Boolean,
            btnTitle:String,
            accept: {
                type: String,
                default: '*/*'
            },
             btnType:String,
            // 文件上传中的回调
            onProgress: Function,
            onError: Function,
            autoUpload: { // 是否自动上传
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
            	isactive:true,
                headers: {},
                fileList: this.defaultFile ? [{name: this.defaultFile}] : [],
                uploadData:{
                	biz:'document'
                	
                },
                name:'image'
            }
        },
        created () {
            this.headers = {
                'Authorization': 'Bearer ' + authUtils.getAuthToken(),
                'TwoStep': `Bearer ` + authUtils.getTwiceToken() // 二次验证的token
            }
        },
        activated () {
            this.headers = {
                'Authorization': 'Bearer ' + authUtils.getAuthToken(),
                'TwoStep': `Bearer ` + authUtils.getTwiceToken() // 二次验证的token
            }
        },
        methods: {
            handleUploadMedia (response, file) {
                this.onSuccess && this.onSuccess(response,file)
                this.fileList = [{name: file.name}]
            },
            choose () {
                this.$refs.upload.$el.querySelector('input[type=file]').click()
            },
            handleError () {
                xmview.showTip('error', '上传失败')
                this.onError && this.onError()
            },
            // 开始上传
            submit() {
                this.$refs.upload.submit()
            },
            clearFiles () {
                this.$refs.upload.clearFiles()
            }
        },
        components: {}
    }
</script>
<style scoped>
	.active{
		background-color: #FFFFFF;
		/*color: #20a0ff;*/
		color: #000;
		border: 1px solid rgb(191, 203, 217);
		font-size: 14px;
	}
	.active:hover{
		color: #20a0ff;
		border-color:#20a0ff ;
	}
</style>
