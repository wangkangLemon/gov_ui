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
                <!--<el-form-item prop="category" label="部门类型">
                    <el-select v-model="form.category">
                        <el-option v-for="(item, index) in govTypes"
                                   :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="地区" :label-width="formLabelWidth">
                    <Region :province="form.province_id"
                            :city="form.city_id"
                            :area="form.area_id"
                            title=""
                            v-on:provinceChange="val => form.province_id = val"
                            v-on:cityChange="val => form.city_id = val"
                            v-on:areaChange="val => form.area_id = val">
                    </Region>
                </el-form-item>-->
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
                </el-form-item>
               -->
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
    import authUtils from '../../utils/authUtils.js'
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
                govID: void 0, //新建的时候
                getID: void 0,
                pid: void 0,
                province_id: void 0,
                city_id: void 0,
                area_id: void 0,
                town_id: void 0,
                village_id: void 0,
                govTypes: [ // 部门类型
                    {
                        name: '政府',
                        id: 2
                    },
                ],
                formLabelWidth: '120px',
                form: {
                    id: void 0,
                    category: 2, // 类型
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
                        { message: '必填项', trigger: 'blur'}
                    ],
                    mobile: [
                        { message: '必填项', trigger: 'blur'},
                        // { validator: validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        { message: '必填项', trigger: 'blur'},
                        // { validator: validateEmail, trigger: 'blur'}
                    ]
                },
            }
        },
        computed: {
            getGovID () {
                return authUtils.getUserInfo().gov_id
            }
        },
        activated () {
            this.govID = this.getGovID
            let _this = this
            console.log('this.govID='+this.getGovID)

            // 调用govid 拿到提交表单需要的其他id
            govService.getGovInfo(_this.govID).then((ret) => {
                if(ret.pid!== 0 ) _this.form.pid = ret.pid
                if(ret.province_id!== 0 ) _this.form.province_id = ret.province_id
                if(ret.city_id!== 0 ) _this.form.city_id = ret.city_id
                if(ret.area_id!== 0 ) _this.form.area_id = ret.area_id
                if(ret.town_id!== 0 ) _this.form.town_id = ret.town_id
                if(ret.village_id!== 0 ) _this.form.village_id = ret.village_id
                if(_this.govID = ret.province_id || ret.city_id || ret.area_id || ret.town_id || ret.village_id){
                    
                }
                console.log( this.form.province_id,this.form.city_id,this.form.area_id,this.form.town_id ,this.form.village_id )
                xmview.setContentLoading(false)
            })
            // console.log('getID='+this.getID)
            if (this.getID == undefined) {
                this.form = {
                    id: void 0,
                    gov_id:void 0,
                    category: 2, // 类型
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
                xmview.setContentLoading(false)
                return false
            }
 
            //拿到当前表单的数据
            govService.getGovInfo(this.getID).then((ret) => {
                this.form = ret
                this.getID = this.getID
                xmview.setContentLoading(false)
                
            })
            
        },
        mounted () {
            
        },
        methods: {
 
            submit (form) { // 表单提交
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.form = Object.assign(this.form, this.sign)
                        let reqFn = govService.addGov
                        let msg = '添加成功'
                        this.form.pid = this.form.area_id || this.form.city_id || this.form.province_id
                        // console.log(this.form)
                        // console.log(this.form.pid)
                        if (this.getID) {
                            // console.log(this.getID)
                            this.form.gov_id = this.getID
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
