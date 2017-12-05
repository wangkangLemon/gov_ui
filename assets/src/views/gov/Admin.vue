<!--企业列表-管理员-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../utils/mixins/topSearch";
    @import "../../utils/mixins/showDetail";
    @import "../../utils/mixins/common";
    .company-admin-container {
        @extend %content-container;
        .add {
            @extend %right-top-btnContainer;
        }
        .main-container {
            background: #fff;
            padding: 20px;
            .search {
                @extend %top-search-container;
            }
            .block {
                text-align: right;
                margin-top: 10px;
            }
        }
    }
</style>
<template>
    <article class="company-admin-container">
        <!--详情-->
        <el-dialog class="show-detail" title="查看管理员" v-model="showDetail">
            <div class="avatar">
                <img :src="{url:clerkDetail.avatar, sex: clerkDetail.sex} | defaultAvatar" />
            </div>
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">所属部门：</i><span class="value">{{clerkDetail.gov_name}}</span></p>
                <p><i class="title">手机号</i> <span class="value">{{clerkDetail.mobile}}</span></p>
                <p><i class="title">Email：</i> <span class="value">{{clerkDetail.email}}</span></p>
                <p>
                    <i class="title">状态：</i>
                    <span class="value">
                        <el-tag type="success" v-if="!clerkDetail.disabled">正常</el-tag>
                        <el-tag type="danger" v-else="clerkDetail.disabled">异常</el-tag>
                    </span>
                </p>
                <!--<p><i class="title">性别：</i> <span class="value">{{clerkDetail.sex ? '男' : '女'}}</span></p>-->
                <p><i class="title">生日：</i> <span class="value">{{clerkDetail.birthday}}</span></p>
                <p><i class="title">地址：</i> <span class="value">{{clerkDetail.address}}</span></p>
                <p><i class="title">注册时间：</i><span class="value">{{clerkDetail.addate}}</span></p>
            </div>
        </el-dialog>
        <!--添加/编辑表单-->
        <el-dialog v-model="addForm">
            <el-form :model="form" :rules="rules" ref="form">
                <!--<el-form-item v-if="category == 2" prop="department_id" label="部门" :label-width="formLabelWidth">
                    <departmentSelect :type="companyID" v-model="form.department_id"
                    v-on:change="val=>form.department_id = val">
                    </departmentSelect>
                </el-form-item>-->
                <!--<el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
                    <departmentSelect :type="govID" v-model="form.role_id"
                    v-on:change="val=>form.role_id = val">
                    </departmentSelect>
                </el-form-item>-->
                <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="部门人员姓名" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
                    <el-radio class="radio" v-model="form.sex" :label="1">男</el-radio>
                    <el-radio class="radio" v-model="form.sex" :label="0">女</el-radio>
                </el-form-item>-->
                <el-form-item prop="mobile" label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" type="number" placeholder="手机号" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="passwd" label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.passwd" placeholder="密码" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item prop="birthday" label="生日" :label-width="formLabelWidth">
                    <el-date-picker type="date" v-model="form.birthday"></el-date-picker>
                </el-form-item>-->
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" placeholder="昵称" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>

        <section class="add">
            <el-button icon="plus" type="primary" @click="addAdmin">添加</el-button>
        </section>

        <div class="main-container">
            <section class="search">
                <section>
                    <i>姓名</i>
                    <el-input  @keyup.enter.native="getData" class="name" v-model="search.name" placeholder="请输入姓名"></el-input>
                </section>
            </section>
            <el-table border v-loading="loading" :data="adminData">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="100%">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="gov_name"
                        label="部门"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="update"
                        label="上次登录时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="last_login_ip"
                        label="上次登录IP"
                        width="200">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="207"> 
                    <template scope="scope">
                        <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                            详情
                        </el-button>
                        <el-button type="text" size="small" @click="editUser(scope.$index, scope.row)">
                            修改
                        </el-button>    
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 30, 60, 100]"
                        layout="total, sizes, ->, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </section>
        </div>
    </article>
</template>
<script>
    import govService from '../../services/gov/govService.js'
    import departmentService from '../../services/gov/departmentService.js'
    import departmentSelect from '../component/select/CompanyDepartment.vue'
    import * as timeUtils from '../../utils/timeUtils'
    import companyUserService from '../../services/gov/companyUserService'
    import {defaultAvatar} from '../../utils/filterUtils.js'
    export default {
        name: 'company-admin',
        filters: {
            defaultAvatar
        },
        components: {
            departmentSelect
        },
        data () {
            let validateMobile = (rule, value, callback) => {
                if (!(value || '').match(/^1[34578]\d{9}$/)) {
                    callback(new Error('请填写正确的手机号'))
                }
                callback()
            }
            return {
                loading: false,
                // 查看管理员详情
                clerkDetail: {
                    name: '',          // 姓名
                    mobile: '',        // 手机
                    pass: '',          // 密码
                    address: '',       // 地址
                    sex: 0,            // 性别
                    birthday: '',          // 生日
                    addate: ''
                },
                departmentData: [],
//                companyID: this.$route.params.company_id,
                showDetail: false,     // 是否显示详情对话框
                form: {                // 表单属性值
                    role_id: 1,        //角色 无管理权限0 
                    area_id:0,         //地区id
                    gov_id: void 0,    //部门id
                    name: '',          // 姓名
                    mobile: '',        // 手机
                    passwd: '',        // 密码
                    nickname: '',
                    // address: '',       // 地址
                    // sex: 0,            // 性别
                    // birthday: ''       // 生日
                },
                rules: {
                    // department_id: [
                    //     {type: 'number', required: true, message: '必须填写', trigger: 'blur'}
                    // ],
                    name: [
                        {required: true, message: '必须填写', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '必须填写', trigger: 'blur'},
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    passwd: [
                        {required: true, message: '必须填写', trigger: 'blur'}
                    ]
                },
                formLabelWidth: '120px', // 表单label的宽度
                addForm: false, // 表单弹窗是否显示
                currentPage: 1, // 分页当前显示的页数
                total: 0,
                pageSize: 15,
                search: { // 搜索的姓名
                    name: ''
                },
                adminData: []
            }
        },
        computed: {
            govID () { 
                // console.log(this.$route.params.gov_id)
                return this.$route.params.gov_id
            },
            // category () {  //1 系统 2 政府
            //     return parseInt(this.$route.query.category)
            // }
        },
        activated () {
             this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            addAdmin () {
                // departmentService.getDepartment({
                //     company_id: this.companyID
                // }).then((ret) => {
                //     if (ret.data.length > 0) {
                //         this.departmentData = ret.data
                //     }
                // }).then(() => {
                    this.addForm = true
                // })
            },
            // 修改管理员信息
            editUser(index, row) {
                this.$router.push({
                    name: 'user-edit',
                    params: {
                        id: row.id
                    }
                })
            },
            getData () {
                this.loading = true
                return govService.govAdminList({
                    page: this.currentPage,
                    pagesize: this.pageSize,
                    name: this.search.name,
                    gov_id: this.govID,
                    role_id:1
                }).then((ret) => {
                    this.adminData = ret
                    this.total = ret.total
                    this.loading = false
                
                    this.$store.dispatch('saveUserList',ret)  
                    // console.log(this.$store.state.index.userList  )
                })
            },
            // 查看管理员详情
            checkClerkDetail (index, row) {
                this.showDetail = true
                companyUserService.userDetail(row.id).then((ret) => {
                    this.clerkDetail = ret
                })
            },
            handleDelete (index, row) {
                xmview.showDialog(`你确认要删除用户<i style="color:red">${row.name}</i>的管理权限吗？`, () => {
                    govService.delAdmin({company_id: row.company_id, id: row.id}).then((ret) => {
                        xmview.showTip('success', '删除成功')
                        this.getData()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            },
            submit (form) {
                this.$refs[form].validate((valid) => {this.form
                    if (valid) {
                        this.form.gov_id = this.govID
                        this.form.birthday = timeUtils.date2Str(this.form.birthday)
                        govService.addGovAdmin(this.form).then((ret) => {
                            xmview.showTip('success', '添加成功')
                        }).then(() => {
                            this.addForm = false
                            this.getData()
                            this.currentPage = 1
                        }).catch((ret) => {
                            xmview.showTip('error', ret.message)
                        })
                    } else {
                        return false
                    }
                })
            },
            handleSizeChange (val) {
                this.pageSize = val
                this.getData()
            },
            handleCurrentChange (val) {
                this.currentPage = val
                this.getData()
            },
            goBack () {
                window.history.back()
            }
        }
    }
</script>
