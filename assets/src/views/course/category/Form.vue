<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-form {
            max-width: 700px;
        }
    
        .submit-form {
        width: 40%;
        padding: 20px;
            .subButton {
                text-align: center;
            }
    }
    }
</style>
<template>
    <main id="sys-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="imgUrl" />
            </div>
            <!--<ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput>-->
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form"  :rules="rules" :model="fetchParam">
  
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model.name="fetchParam.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model.remark="fetchParam.remark"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.sort="fetchParam.sort"  type="number"></el-input>
                </el-form-item>
                <el-form-item label="父级栏目id" prop="pid">
                    <el-input v-model.pid="fetchParam.pid"></el-input>
                </el-form-item>
                
                <div class="el-form-item">
                    <label for="category_type" class="el-form-item__label" style="width: 120px;">
                        	栏目分类
                    </label>
                    <div class="el-form-item__content" style="margin-left: 120px;">
                        <label class="el-radio radio">
                        <span :class="{'el-radio__input':true,'is-checked':fetchParam.category_type==1}">
                            <span class="el-radio__inner"></span>
                            <input type="radio" class="el-radio__original" value="1" name="category_type" v-model="fetchParam.category_type">
                        </span>
                        <span class="el-radio__label">课程栏目</span></label> 
                        <label class="el-radio radio">
                            <span :class="{'el-radio__input':true,'is-checked':fetchParam.category_type==2}">
                                <span class="el-radio__inner"></span>
                                <input type="radio" class="el-radio__original" value="2" name="category_type" v-model="fetchParam.category_type">
                            </span>
                            <span class="el-radio__label">应试课程栏目</span>
                        </label>
                    </div>
                </div>

                <div class="el-form-item">
                    <label for="ended" class="el-form-item__label" style="width: 120px;">
                        是否与引用同步
                    </label>
                    <div class="el-form-item__content" style="margin-left: 120px;">
                        <label class="el-radio radio">
                        <span :class="{'el-radio__input':true,'is-checked':fetchParam.ended==1}">
                            <span class="el-radio__inner"></span>
                            <input type="radio" class="el-radio__original" value="1" name="ended" v-model="fetchParam.ended">
                        </span>
                        <span class="el-radio__label">是</span></label> 
                        <label class="el-radio radio">
                            <span :class="{'el-radio__input':true,'is-checked':fetchParam.ended==0}">
                                <span class="el-radio__inner"></span>
                                <input type="radio" class="el-radio__original" value="0" name="ended" v-model="fetchParam.ended">
                            </span>
                            <span class="el-radio__label">否</span>
                        </label>
                    </div>
                </div>
                 <div class="el-form-item">
                    <label for="disabled" class="el-form-item__label" style="width: 120px;">
                        	是否禁用
                    </label>
                    <div class="el-form-item__content" style="margin-left: 120px;">
                        <label class="el-radio radio">
                        <span :class="{'el-radio__input':true,'is-checked':fetchParam.disabled==1}">
                            <span class="el-radio__inner"></span>
                            <input type="radio" class="el-radio__original" value="1" name="disabled" v-model="fetchParam.disabled">
                        </span>
                        <span class="el-radio__label">是</span></label> 
                        <label class="el-radio radio">
                            <span :class="{'el-radio__input':true,'is-checked':fetchParam.disabled==0}">
                                <span class="el-radio__inner"></span>
                                <input type="radio" class="el-radio__original" value="0" name="disabled" v-model="fetchParam.disabled">
                            </span>
                            <span class="el-radio__label">否</span>
                        </label>
                    </div>
                </div>

                <el-form-item label="">
                    <el-button @click="$router.push({ name:'sys-index'})">取消</el-button>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import courseService from '../../../services/course/courseService.js'
    import vTags from '../../component/form/Tags.vue'
    export default {
        name: 'sys-form',
        components: {
            vTags,
        },
        data() {
            return {
                imgUrl: '',
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                rules: {
                    name: { required: true, message: '请输入栏目名称'},
                },
                resultData: [],
                role_list:[],
                courseTags: [],
            }
        },
        activated () {
            xmview.setContentLoading(false);
            console.log(this.$route.params.course_id)
             if (this.$route.params.course_id != undefined) {    //路由id传递
                    console.log('进入了编辑')
                    courseService.getCourseInfo(this.$route.params.course_id).then((ret) => {
                        console.log(ret)
                        this.fetchParam = ret
                    })
                }else{
                    this.fetchParam = getOriginData()
                }    
            this.loadingData=false;
            // console.log('this.$route.params.course_id='+ this.$route.params.course_id )
        },
        methods: {
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = courseService.create_cate
                    if (this.$route.params.course_id) req = courseService.update_cate
                    req(this.fetchParam).then((ret) => {
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        this.courseTags=[]
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                    })
                })
            },
        }
    }

    function getOriginData() {
        return {
            id:0, 
            name:'', 
            remark:'', 
            sort: 0, 
            category_type:'', 
            pid:'', 
            ended:'', 
            disabled:'', 
        }
    }

</script>;