<!--视频管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";

    #course-manage-video-container {
        @extend %content-container;

        .manage-container {
            position: absolute;
            right: 0;
            top: -50px;
            > * {
                color: #fff;
                border-radius: 5px;
            }

            // 添加课程
            .add {
                background: rgb(0, 204, 255);
            }

        }

        .search {
            @extend %top-search-container;
        }

        // 底部的管理按钮
        .bottom-manage {
            margin-top: 15px;
            display: inline-block;
        }

    }
</style>

<template>
    <article id="course-manage-video-container">
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({name:'course-video-add'})"><i>上传视频</i>
            </el-button>
        </section>
        <article class="search">
            <section>
                <i>视频</i>
                <el-input v-model="fetchParam.keyword" @keyup.enter.native="fetchData.setTime()"></el-input>
            </section>

            <section>
                <i>状态</i>
                <el-select :clearable="true" v-model="fetchParam.status" placeholder="请选择" @change="fetchData">
                    <el-option label="转码中" :value="1"></el-option>
                    <el-option label="转码失败" :value="2"></el-option>
                    <el-option label="正常" :value="0"></el-option>
                </el-select>
            </section>

            <section>
                <i>所属政府部门</i>
                <IndustryCompanySelect v-model="fetchParam.gov_id"
                                       :change="fetchData"></IndustryCompanySelect>
            </section>

            <DateRange title="创建时间" :start="fetchParam.time_start" :end="fetchParam.time_end"
                       @changeStart="val=> fetchParam.time_start=val "
                       @changeEnd="val=> fetchParam.time_end=val" :change="fetchData">
            </DateRange>
        </article>

        <el-table class="data-table" v-loading="loadingData"
                  :data="data"
                  :fit="true"
                  @select="selectRow"
                  @select-all="selectRow"
                  border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column
                    min-width="230"
                    prop="file_name"
                    label="视频名称">
            </el-table-column>
            <el-table-column
                    min-width="200"
                    prop="company"
                    label="所属政府部门">
            </el-table-column>
            <el-table-column
                    width="80"
                    prop="duration"
                    label="时长">
            </el-table-column>
            <el-table-column width="120" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
                    <el-tag v-else-if="scope.row.status == 1" type="primary">转码中</el-tag>
                    <el-tag v-else-if="scope.row.status == 2" type="primary">转码失败</el-tag>
                    <!--<el-tag v-else-if="scope.row.status == 3" type="primary">审核成功</el-tag>
                    <el-tag v-else-if="scope.row.status == 4" type="primary">审核失败</el-tag>-->
                    <el-tag v-else>正常</el-tag>
                    <el-button type="text" v-if="scope.row.status == 1" size="small" @click="refreshStatus(scope.$index, scope.row)">刷新</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="create_time_name"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    width="180"
                    label="操作">
                <template scope="scope">
                    <el-button @click="preview(scope.$index, scope.row)" type="text" size="small"
                               v-if="scope.row.status != 1 && scope.row.status != 2">查看
                    </el-button>
                    <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部的批量删除和移动两个按钮-->
        <div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>

        <el-pagination class="pagin"
                       @size-change="val => fetchParam.pagesize = val "
                       @current-change="val => fetchParam.page = val"
                       :current-page="fetchParam.page"
                       :pagesize="fetchParam.pagesize"
                       :page-sizes="[15, 30, 60, 100]"
                       layout="sizes,total, prev, pager, next"
                       :total="total">
        </el-pagination>

        <el-dialog :title="dialogAdd.title" v-model="dialogAdd.isShow">
            <el-form label-position="right" label-width="80px" :model="videoModel">
                <el-form-item label="视频名称">
                    <el-input v-model="videoModel.file_name"></el-input>
                </el-form-item>
                <el-form-item label="所属政府部门">
                    <IndustryCompanySelect :placeholder="videoModel.company"
                                           @change="val => videoModel.gov_id = val"
                                           v-if="dialogAdd.isShow"></IndustryCompanySelect>
                </el-form-item>
                <el-form-item label="视频封面">
                    <UploadImg :defaultImg="videoModel.cover" :url="uploadImgUrl"
                               :onSuccess="handleOnUploaded"></UploadImg>
                </el-form-item>
                <el-form-item label="视频时长">
                    <el-input v-model="videoModel.duration"></el-input>
                </el-form-item>>
                <el-form-item label="视频标签">
                    <vTags v-model="videoModel.tags"></vTags>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd.isShow = false">取 消</el-button>
                <el-button type="primary" @click="dialogAdd.confirmFn">确 定</el-button>
            </div>
        </el-dialog>

        <VideoPreview :url="videoUrl" :row ="row" :onchange="fetchData" ref="videoPreview"></VideoPreview>
    </article>
</template>

<script>
    import CourseCategorySelect from '../../component/select/CourseCategory.vue'
    import DateRange from '../../component/form/DateRangePicker.vue'
    import IndustryCompanySelect from '../../component/select/IndustryCompany.vue'
    import vTags from '../../component/form/Tags.vue'
    import VideoPreview from '../../component/dialog/VideoPreview.vue'
    import UploadImg from '../../component/upload/UploadImg.vue'

    import config from '../../../utils/config.js'
    import videoService from '../../../services/course/videoService.js'

    function getVideoModel () {
        return {
            material_id: void 0,
            file_name: '',
            gov_id: 0,
            cover: void 0,
            duration: void 0,
            tags: [],
        }
    }
    function getFetchParam() { //定义视频列表的参数
        return {
            gov_id: null,
            material_id: null,
            title:'',
            page: 1,
            pagesize: 15,
            create_start: '',
            create_end: '',
            status:null,
        }
    }

    function  formatTimeStr(Long) {
        let hour = 0;
        let minute = 0;
        let second = 0;
 
        second = intValue() / 1000;
 
        if (second > 60) {
            minute = second / 60;
            second = second % 60;
        }
        if (minute > 60) {
            hour = minute / 60;
            minute = minute % 60;
        }
        return (formatTimeStr(hour) + ":" + formatTimeStr(minute)  + ":"  + formatTimeStr(second));
    }

    export default{
        data () {
            return {
                loadingData: false,
                total: 0,
                data: [],
                selectedIds: [], // 选中的id
                uploadImgUrl: '', // 上传图片的url
                fetchParam: getFetchParam(),
                dialogAdd: {
                    isShow: false,
                    title: '添加课程',
                    confirmFn: {}
                },
                videoModel: getVideoModel(),
                videoUrl: '', // 预览的视频url
                row: '' // dialoglog信息
            }
        },
        watch: {
            'fetchParam.pagesize'() {
                this.fetchData()
            },
            'fetchParam.page'() {
                this.fetchData()
            }
        },
        created () {
            this.uploadImgUrl = videoService.getUploadCoverUrl()
        },
        activated () {
            this.fetchData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
    
            initFetchParam() {
                this.fetchParam = getFetchParam()
            },
            fetchData () {
                this.loadingData = true
                return videoService.getVideo(this.fetchParam).then((ret) => {
                    console.log(ret)
                    this.data = ret
                    this.total = ret.total
                    this.loadingData = false
                })
            },
            selectRow (selection) {
                let ret = []
                selection.forEach((item) => {
                    ret.push(item.id)
                })
                this.selectedIds = ret
            },
            add () {
                this.dialogAdd.isShow = true
                this.videoModel = getVideoModel()
            },
            edit (index, row) {
                this.dialogAdd.isShow = true
                this.videoModel = JSON.parse(JSON.stringify(row))
                this.videoModel.tags = this.videoModel.tags ? this.videoModel.tags.split(',') : []

                this.dialogAdd.confirmFn = () => {
                    console.log(this.videoModel)
                    videoService.updateVideo(this.videoModel).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.fetchData()
                        this.dialogAdd.isShow = false
                    })
                }
            },
            del (index, row) {
                xmview.showDialog(`你将要删除视频 <span style="color:red">${row.name}</span> 操作不可恢复确认吗?`, () => {
                    this.loadingData = true
                    videoService.deleteVideo({id: row.id}).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.data.splice(index, 1)
                        this.loadingData = false
                    }).catch(() => {
                        this.loadingData = false
                    })
                })
            },
            delMulti () {
                xmview.showDialog(`你将要删除选中的视频，操作不可恢复确认吗?`, () => {
                    this.loadingData = true
                    videoService.deleteVideoMulty({id: this.selectedIds.join(',')}).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.fetchData() // 重新刷新数据
                    })
                })
            },
            // 预览视频
            preview (index, row) {
                // 拿到播放地址
                videoService.getVideoPreviewUrl(row.material_id).then((ret) => {
                    this.videoUrl = ret.video
                    this.row = row
                    this.$refs.videoPreview.show(row.file_name)
                })
            },
            // 处理图片上传完毕
            handleOnUploaded (ret) {
                this.videoModel.cover = ret.data.url
            },
            // 刷新视频状态
            refreshStatus (index, row) {
                videoService.refreshVideoStatus({id: row.material_id}).then((ret) => {
                    row.status = 0
                })
            }
        },
        components: {
            CourseCategorySelect, DateRange, IndustryCompanySelect, vTags, UploadImg, VideoPreview
        }
    }
</script>
