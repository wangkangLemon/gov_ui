<!--公告-->
<style lang="scss" rel="stylesheet/scss">
	@import "../../utils/mixins/mixins";
	@import "../../utils/mixins/topSearch";
	.analysis-company-manage {
		.search {
			@extend %top-search-container;
		}
		.box-card {
			margin-top: 20px;
			.el-card__header {
				padding: 10px 15px;
				background: #f0f3f5;
			}
			.block {
				text-align: right;
				margin-top: 15px;
			}
		}
		.course-analytics {
			@extend %justify;
			margin: 15px 0;
			height: 120px;
			border: 1px solid #ddd;
			background: #fff;
			border-radius: 5px;
			padding: 25px 40px;
			>div {
				display: inline-block;
				vertical-align: top;
				height: 100%;
				border-right: 1px solid #ddd;
				&:last-of-type {
					border-right: none;
				}
				width: 18%;
				>* {
					display: inline-block;
					vertical-align: top;
				}
				.sign {
					width: 55px;
					height: 55px;
					text-align: center;
					text-align-last: center;
					border-radius: 50%;
					margin: 10px 20px;
					line-height: 76px;
				}
				>div {
					margin-top: 10px;
					>i {
						font-size: 12px;
						color: #666;
					}
					>p {
						font-size: 25px;
						color: #333;
					}
				}
				.red {
					color: red;
				}
				.green {
					color: green;
				}
			}
		}
	}
</style>
<template>
	<article class="analysis-company-manage">
		<el-card class="box-card">
			<el-table v-loading="loading" border :data="manageData" stripe style="width: 100%">
				<el-table-column prop="course_name" min-width="180" label="课程名称">
				</el-table-column>
				<el-table-column prop="category_name" min-width="180" label="课程分类">
				</el-table-column>
				<el-table-column prop="progress" min-width="180" label="学习进度">
				</el-table-column>
				<el-table-column prop="date" min-width="180" label="学习时间">
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[15, 30, 60, 100]" :page-size="search.pagesize" layout="sizes,total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</el-card>
	</article>
</template>
<script>
	
	import govService from '../../services/gov/govService.js'
	import authUtils from '../../utils/authUtils'

	function clearFn() {
		return {
			user_id:'',
			name: '',
			user_name: '',
			gov_id: '',
			role_id: '',
			createTime: '',
			endTime: '',
			level: void 0,
			pagesize: 15,
			page:1,
			
		}
	}

	export default {
		name: 'data-report-userlogin',
		data() {
			return {
				loading: false,
				manageData: [],
				statData: null,
				currentPage: 1,
				total: 0,
				search: clearFn(),
				level: void 0,
				govID: void 0,
				govLevel: authUtils.getUserInfo().gov_level,
				isVillage: '',
				date_start:'',
				date_end:''
			}
		},
		created() {
			this.search.user_id=this.$route.query.user_id
			this.date_start=this.$route.query.date_start
			this.date_end=this.$route.query.date_end
			this.getData().then(() => {
				xmview.setContentLoading(false)
			})
		},
		watch: {
			"$route": function(to, from) {
				this.isVillage = ''
				console.log(to, from)
				console.log(to.name)
				console.log(from.name)
				if(to.name !== from.name) {
					xmview.setContentLoading(false)
					if(this.$route.path == '/data/report-userlogin-isVillage') {
						this.isVillage = 1
					}
					this.getData()
				}
			}
		},
		methods: {
			handleSizeChange(val) {
				this.search.pagesize = val
				this.getData()
			},
			handleCurrentChange(val) {
				this.search.page=val
				this.getData(val)
			},
			getData() {
				this.loading = true
				if(this.search.gov_id) {
					this.level = Number(this.govLevel) + 2
				} else {
					this.level = Number(this.govLevel) + 1
				}
				return govService.getCourseHistory({
					user_id:this.search.user_id,
					page: this.search.page,
                    pagesize: this.search.pagesize,
                    gov_id: this.search.companySelect,
                    date_start: this.date_start,
                    date_end: this.date_end,
//					name: this.search.name,
//					user_name: this.search.user_name,
//					gov_id: this.search.gov_id,
//					role_id: this.search.role_id,
//					date_start: this.search.createTime,
//					date_end: this.search.endTime,
//					level: this.level,
//					isVillage: this.isVillage,
				}).then((ret) => {
					xmview.setContentLoading(false)
					this.loadingData = false
					this.total = ret._exts.total
					this.manageData = ret.data
				}).then(() => {
					this.loading = false
				})
			}
		}
	}
</script>