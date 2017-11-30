<!--编辑/添加企业-->
<style lang="scss" rel="stylesheet/scss">
    .gov-operate-container {
        background: #fff;
        padding: 20px 200px;
        .addForm {
            .tip {
                text-align: center;
                border-top: 1px solid #ddd;
                color: #ff0000;
                line-height: 50px;
            }
        }
        .dialog-footer {
            text-align: center;
        }
    }
</style>
<template>
    <article class="gov-operate-container">
        <section>
            <el-form class="addForm" :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                <el-form-item prop="category" label="部门类型">
                    <el-select v-model="form.category">
                        <el-option v-for="(item, index) in govTypes"
                                   :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="地区" :label-width="formLabelWidth">
                    <Region :province="form.province_id"
                            :city="form.city_id"
                            :area="form.area_id"
                            title=""
                            v-on:provinceChange="val => form.province_id = val"
                            v-on:cityChange="val => form.city_id = val"
                            v-on:areaChange="val => form.area_id = val">
                    </Region>
                </el-form-item>
                <el-form-item prop="name" label="政府单位名称	" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="concact" label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="form.concact" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" type="number" label="联系人手机" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="联系人邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="tel" label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="fax" label="传真" :label-width="formLabelWidth">
                    <el-input v-model="form.fax" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="zip" label="邮编" :label-width="formLabelWidth">
                    <el-input v-model="form.zip" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item prop="url" label="企业网址" :label-width="formLabelWidth">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="企业介绍" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" v-model="form.description" auto-complete="off"></el-input>
                </el-form-item>-->
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit('form')">提交</el-button>
            </div>
        </section>
    </article>
</template>
<script>
    import govService from '../../services/gov/govService.js'
    import Region from '../component/select/Region.vue'
    import * as timeUtils from '../../utils/timeUtils.js'
    let _this
    export default {
        components: {
            Region,
        },
        data () {
            let validateEmail = (rule, value, callback) => {
                if (!(value || '').match(/^\w+([-+.]\w+)*@\w+([-+.]\w+)*.\w+([-+.]\w+)*$/)) {
                    callback(new Error('请输入一个有效的电子邮箱地址'))
                }
                callback()
            }
            let validateMobile = (rule, value, callback) => {
                if (!(value || '').match(/^1[34578]\d{9}$/)) {
                    callback(new Error('请输入正确的手机号'))
                }
                callback()
            }
            return {
                govTypes: [ // 部门类型
                    {
                        name: '政府',
                        id: 2
                    },
                    {
                        name: '系统',
                        id: 1
                    }
                ],
                formLabelWidth: '120px',
                form: {
                    gov_id: void 0,
                    category: '', // 类型
                    pid:'', //上级部门                    
                    province_id : '', // 省
                    city_id: '',  // 市
                    area_id: '',  // 区
                    town_id: '',  //乡镇                       -----
                    village_id: '', // 街道                    -----
                    name: '', // 名称
                    concact: '', // 联系人
                    mobile: '', // 联系人手机
                    email: '', // 联系人邮箱
                    mobile_title: '', // 手机端客户端名称        ----
                    tel: '', // 电话
                    zip: '', // 邮编
                    fax: '', // 传真
                    url: '', // 企业网址
                    address: '', // 地址
                    description: '', // 企业介绍
                },
  
                rules: {
                    name: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    concact: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '必填项', trigger: 'blur'},
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '必填项', trigger: 'blur'},
                        {validator: validateEmail, trigger: 'blur'}
                    ]
                },
            }
        },
        computed: {
            govID () {
                return this.$route.params.id
            }
        },
        activated () {
            _this = this
            xmview.setContentLoading(false)
            if (this.govID == undefined) {

                this.form = {
                    gov_id: void 0,
                    category: '', // 类型
                    pid:'', //上级部门                    
                    province_id : '', // 省
                    city_id: '',  // 市
                    area_id: '',  // 区
                    town_id: '',  //乡镇                       -----
                    village_id: '', // 街道                    -----
                    name: '', // 名称
                    concact: '', // 联系人
                    mobile: '', // 联系人手机
                    email: '', // 联系人邮箱
                    mobile_title: '', // 手机端客户端名称        ----
                    tel: '', // 电话
                    zip: '', // 邮编
                    fax: '', // 传真
                    url: '', // 企业网址
                    address: '', // 地址
                    description: '', // 企业介绍
                }
                return false
            }
            govService.getGovInfo(this.govID).then((ret) => {
                this.form = ret
                this.govID = this.govID
            })
        },
        methods: {
 
            submit (form) { // 表单提交
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.form = Object.assign(this.form, this.sign)
                        let reqFn = govService.addGov
                        let msg = '添加成功'
              
                        if(this.form.province_id) {
                            this.form.pid = this.form.province_id
                            console.log( 'this.form.province_id='+ this.form.province_id)
                            if(this.form.province_id && this.form.city_id){
                                 this.form.pid = this.form.city_id
                                 console.log( 'this.form.city_id='+ this.form.city_id)
                                 if(this.form.province_id && this.form.city_id && this.form.area_id){
                                    this.form.pid = this.form.area_id
                                    console.log( 'this.form.area_id='+ this.form.area_id)
                                    if(this.form.province_id && this.form.city_id && this.form.area_id && this.form.town_id){
                                        this.form.pid = this.form.town_id
                                        if(this.form.province_id && this.form.city_id && this.form.area_id && this.form.town_id && this.form.village_id){
                                            this.form.pid = this.form.village_id
                                        }
                                    }
                                }
                            }
                        }

                        if (this.govID) {
                            this.form.gov_id = this.govID
                            reqFn = govService.updateGov
                            msg = '修改成功'
                        }
                        reqFn(this.form).then(() => {
                            xmview.showTip('success', msg)
                        }).then(() => {
                            this.$router.push({name: 'gov-index'})
                        }).catch((ret) => {
                            xmview.showTip('error', ret.message)
                        })
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>
