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
			<section class="search">
				<section>
					<i>部门</i>
					<CompanySelect :change="getData" v-model="search.gov_id" v-on:change="val=>search.gov_id=val">
					</CompanySelect>
				</section>
			</section>
			<el-table v-loading="loading" border :data="manageData" stripe style="width: 100%">
				<el-table-column min-width="180" label="所属部门">
					<template scope="scope">
						<span>{{scope.row.gov_name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="user_cnt" min-width="180" label="录入人数">

				</el-table-column>
				<el-table-column prop="logined_cnt" min-width="180" label="激活人数">
				</el-table-column>
				<el-table-column prop="logined_rate" min-width="180" label="激活率">
				</el-table-column>
				<el-table-column prop="active_rate" min-width="180" label="活跃率">
				</el-table-column>
			</el-table>
			<!--<div class="block">
				<el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.page" :page-size="search.pagesize" :page-sizes="[15, 30, 60, 100, 130, 160, 200]" layout="sizes,total, prev, pager, next" :total="total">
				</el-pagination>
			</div>-->
		</el-card>
	</article>
</template>
<script>
	import CompanySelect from '../component/select/IndustryCompany.vue'
	import govService from '../../services/gov/govService.js'
	import authUtils from '../../utils/authUtils'

	function clearFn() {
		return {
			name: '',
			user_name: '',
			gov_id: '',
			role_id: '',
			createTime: '',
			endTime: '',
			level: void 0,
			pagesize: -1,
			page: 1
		}
	}

	export default {
		components: {
			CompanySelect,
		},
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
			}
		},
		created() {
			this.isVillage = ''
			if(this.$route.path == '/data/report-userlogin-isVillage') {
				this.isVillage = 1
			}
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
			initFetchParam() {
				this.currentPage = 1
				this.search = clearFn()
			},
			handleSizeChange(val) {
				console.log(val)
				this.search.pagesize = val
				this.getData()
			},
			handleCurrentChange(val) {
				this.search.page = val
				this.getData(val)
			},
			getData(page) {
				this.loading = true
				if(this.search.gov_id) {
					this.level = Number(this.govLevel) + 2
				} else {
					this.level = Number(this.govLevel) + 1
				}
				return govService.getDepartmentStatistics({
					page: this.search.page,
					pagesize: this.search.pagesize,
					gov_id: this.search.gov_id,
					level: this.level,
					isVillage: this.isVillage,
				}).then((ret) => {
					xmview.setContentLoading(false)
					this.loading = false
					this.total = ret._exts.total
					this.manageData = ret.data
				}).then(() => {
					this.loading = false
				})
			}
		}
	}
</script>
