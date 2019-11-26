<!--栏目管理-->
<style lang='scss' rel='stylesheet/scss'>
	@import "../../utils/mixins/common";
	@import "../../utils/mixins/mixins";
	#course-manage-coursecategory {
		@extend %content-container;
		.manage-container {
			@extend %right-top-btnContainer;
		}
		>section {
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
		.collection {
			align-items: center;
			min-height: 36px;
			border-radius: 4px;
			padding: 3px 30px 3px 10px;
			border: 1px solid #bfcbd9;
		}
		.u-course-tag {
			margin-right: 10px;
			background-color: rgba(32, 160, 255, .1);
			display: inline-block;
			padding: 0 10px;
			height: 32px;
			line-height: 30px;
			font-size: 12px;
			color: #20a0ff;
			border-radius: 4px;
			box-sizing: border-box;
			border: 1px solid rgba(32, 160, 255, .2);
			white-space: nowrap;
			&:last-child {
				margin-right: 0;
			}
		}
		.el-tabs__content {
			position: relative;
			.dialog-select-item {
				h5 {
					line-height: 40px;
					font-size: 14px;
					padding-left: 20px;
					background: #fbfdff;
					border: 1px solid #d1dbe5;
					border-bottom: none;
				}
				position: absolute;
				top: 54px;
				right: 120px;
				height: 500px;
				width: 42%;
				display: inline-block;
				vertical-align: top;
			}
		}
		.row-class {
			border: 1px solid #d1dbe5;
		}
		.course-search {
			margin-bottom: 12px;
			.el-input {
				width: 150px;
				 ::-webkit-input-placeholder {
					font-size: 13px
				}
			}
		}
	}
</style>

<template>
	<article id="course-manage-coursecategory">
		<section class="right-container">
			<el-card class="edit-content">
				<el-form label-position="right" label-width="130px" :model="fetchParam" ref="fetchParam" :rules="rules">
					<el-form-item label="县级考试学时(分)" prop="duration">
						<el-input v-model="fetchParam.duration"></el-input>
					</el-form-item>
					<el-form-item label="镇级考试学时(分)" prop="duration_town">
						<el-input v-model="fetchParam.duration_town"></el-input>
					</el-form-item>
					<el-form-item label="村级考试学时(分)" prop="duration_village">
						<el-input v-model="fetchParam.duration_village"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="submitForm">保存
						</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</section>
	</article>
</template>

<script>
	import announceService from '../../services/announce/announceService.js'
	import treeUtils from '../../utils/treeUtils'
	import { time2String } from '../../utils/timeUtils.js'
	import authUtils from '../../utils/authUtils'
	import * as api from '@/services/api'
	import config from '@/utils/config'

	export default {
		data() {
			return {
				fetchParam: getFetchParam(),
				code: "",
				id: '',
				rules: {
					duration: [{
						required: true,
						message: '请输入县级考试学时',
						trigger: 'blur'
					}],
					duration_town: [{
						required: true,
						message: '请输入镇级考试学时',
						trigger: 'blur'
					}],
					duration_village: [{
						required: true,
						message: '请输入村级考试学时',
						trigger: 'blur'
					}]
				}
			}
		},

		activated() {
			this.fetach()
			xmview.setContentLoading(false)
		},
		watch: {　　 // 利用watch方法检测路由变化：
			　　
			'$route': function(to, from) {　　　　 // 拿到目标参数 to.query.id 去再次请求数据接口
				this.fetach()　　
			}
		},
		methods: {
			submitForm() {
				console.log(this.fetchParam)
				var _this = this;
				_this.$refs.fetchParam.validate((ret) => {
					if(!ret) {
						return false
					}
					if(_this.code == 1) {
						var url = config.apiHost + '/gov/study_cnf/create'
						api.post(url, _this.fetchParam).then(function(res) {
							console.log(res)
							if(res.code == 0) {
								xmview.showTip('success', '操作成功!')
								_this.fetach()
								xmview.setContentLoading(false)
							}
						})
					} else if(_this.code == 0) {
						let newId = _this.id
						var url = config.apiHost + '/gov/study_cnf/edit/' + newId
						api.post(url, _this.fetchParam).then(function(res) {
							console.log(res)
							if(res.code == 0) {
								xmview.showTip('success', '操作成功!')
								_this.fetach()
								xmview.setContentLoading(false)
							}
						})
					}
				})

			},
			fetach() {
				var _this = this;
				var url = config.apiHost + '/gov/study_cnf/get'
				api.get(url).then(function(res) {
					console.log(res)
					_this.code = res.code
					if(res.code == 0) {
						_this.id = res.data.id
						_this.fetchParam.duration = res.data.duration.toString()
						_this.fetchParam.duration_town = res.data.duration_town.toString()
						_this.fetchParam.duration_village = res.data.duration_village.toString()
						xmview.setContentLoading(false)

					}

				})
			}

		},
		mounted() {
			console.log(111)
			this.fetach()
		}

	}

	function getFetchParam() {
		return {
			duration: '',
			duration_town: '',
			duration_village: ''
		}
	}
</script>