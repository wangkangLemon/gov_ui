<!--上传视频-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/mixins";
@import "../../../utils/mixins/topSearch";

#course-video-add-container {
    @extend %content-container;
    min-height: 300px;
    position: relative;

    .first-select-box {
        @extend %absoluteCenter;
        position: absolute;
        
        section {
            margin-bottom: 10px;
        }
    }
    .box-card {
        margin: 0 auto;
        width: 700px;
        margin-bottom: 15px;
        transition: all 300ms ease;

        .clearfix {
            display: flex;
            span {
                flex: 1;
                height: 34px;
                line-height: 34px;
            }

            .el-button {
                flex: 0;
            }
        }

        .el-card__header {
            padding: 5px 10px;
            background: #f8f8f8;
        }
    } // 底部按钮
    .bottom-btn {
        margin: 0 auto;
        width: 700px;
        .el-button {
            &:last-of-type {
                float: right;
            }
        }
    }
}
</style>

<template>
    <main id="course-video-add-container">
        <section v-if="listData.length < 1" class="first-select-box">
                       <el-button @click="fileClick" class="" type="primary">
                <i class="el-icon-upload el-icon--right"></i>
                <i> 选择要上传的视频文件</i>
            </el-button>
        </section>
    
        <el-card class="box-card" v-for="(item,index) in listData" :key="index">
            <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
                <el-button type="text" icon="delete" @click="deleteVideo(index)"></el-button>
            </div>
            <el-form label-width="120px">
                <el-form-item label="视频名称">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="视频标签">
                    <vTags v-model="item.tags"></vTags>
                </el-form-item>
                <el-form-item label="">
                    <el-progress :percentage="item.process" :status="item.process>= 100 ? 'success' : ''"></el-progress>
                </el-form-item>
            </el-form>
        </el-card>
    
        <div v-if="listData.length > 0" class="bottom-btn">
            <el-button :disabled="uploading" @click="fileClick">继续添加视频</el-button>
            <el-button type="primary" :disabled="uploading" @click="submit">
                <i>{{uploading ? '正在上传' : '开始上传'}}</i>
            </el-button>
        </div>
    
        <input style="display: none" type="file" ref="file" multiple="multiple" @change="fileChange($event)" accept="">
    </main>
</template>

<script>
import vTags from '../../component/form/Tags.vue'
import OssSdk from '../../../vendor/ossSdk'
import videoService from '../../../services/course/videoService'
import authUtils from '../../../utils/authUtils'

let ossSdk = new OssSdk()
export default {
    name: 'course-video-add',
    components: {
        vTags,
    },
    data() {
        return {
            listData: [],
            uploading: false,
        }
    },
    beforeCreate() {
        // ossSdk = new OssSdk()
        this.user = authUtils.getUserInfo()
    },
    mounted() {
        xmview.setContentLoading(false)
    },
    methods: {
        fileChange(e) {
            let dom = e.target
            let ret = []
            for (let i = 0; i < dom.files.length; i++) {
                let file = dom.files[i]
                if (this.checkExist(file.name)) {
                    xmview.showTip('warning', `${file.name} 已存在于列表中`)
                } else {
                    ret.push({
                        name: file.name,
                        tags: [],
                        file: file,
                        process: 0
                    })
                }
            }

            this.listData.push(...ret)
            dom.value = null
        },
        deleteVideo(index) {
            this.listData.splice(index, 1)
        },
        fileClick() {
            this.$refs.file.click()
        },
        submit() {
            this.uploading = true
            if (this.listData.length > 0) this.uploadVideo()
        },
        uploadVideo(count = 0) {
            let item = this.listData[count]
            videoService.getOssToken().then((ret) => {
                ossSdk = new OssSdk(ret)
                console.log(ossSdk)
                // 开始上传
                // 格式化名称
                var now = new Date()
                console.log("========================================")
                console.log(this.user)
                console.log("========================================")
                var name = [
                    'yxt', this.user.id,
                    now.getFullYear(), now.getMonth() + 1, now.getDate(),
                    [now.getHours(), now.getMinutes(), now.getSeconds(), (Math.random() + 1).toString(36).substring(7)].join('')
                ].join('/') + this.extname(item.file)
                console.log(now)
                console.log(name)
                // 上传
                ossSdk.uploadFile(name, item.file, function (progress) {
                    item.process = progress
                }, ret => {
                    // 创建视频
                    videoService.create({
                        file_name: item.name,
                        tags: item.tags.join(','),
                        source_type: 'aliyun',
                        source_url: ret.res.requestUrls[0].split('?')[0]
                    }).then(() => {
                        count++
                        // 全都上传完毕之后 跳转到列表页面
                        if (count < this.listData.length) {
                            this.uploadVideo(count)
                        } else if (count >= this.listData.length) {
                            xmview.showTip('success', '操作成功!')
                            setTimeout(() => {
                                this.$router.back()
                            }, 300)
                        }
                    })
                }, err => {
                    xmview.showTip('error', '上传出现错误' + JSON.stringify(err))
                })
            })
        },
        checkExist(name) {
            for (let i = 0; i < this.listData.length; i++) {
                if (this.listData[i].name === name) {
                    return true
                }
            }
            return false
        },
        extname(file) {
            var name = file.name || ''
            var parts = name.split('.')
            parts.shift()
            if (parts.length) {
                return '.' + parts.pop()
            }
            return ''
        }
    }
}
</script>
