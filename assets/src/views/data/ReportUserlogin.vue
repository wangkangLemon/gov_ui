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
					<CompanySelect :change="this.level_name=='区(县)'||this.level_name=='乡镇'||this.level_name=='村'? getData :getData_Other" v-model="search.gov_id" v-on:change="val=>search.gov_id=val" :character='search.character'>
					</CompanySelect>
				</section>
				<section v-if="this.level_name=='区(县)'||this.level_name=='乡镇'||this.level_name=='村'">
					<i>选取日期</i>
					<DateRange :start="stime" :end="etime" :defaultStart="stime" :defaultEnd="etime" v-on:changeStart="val=> stime=val" v-on:changeEnd="val=>etime=val" :change="getChartData" ref="DateRange">
					</DateRange>
				</section>
				<el-button type="primary" style="float: right;" @click="exports" v-if="this.level_name=='区(县)'||this.level_name=='乡镇'||this.level_name=='村'">导出</el-button>
			</section>
			<el-table v-loading="loading" border :data="manageData" stripe style="width: 100%" v-if="this.level_name=='区(县)'||this.level_name=='乡镇'||this.level_name=='村'">
				<el-table-column min-width="180" label="姓名">
					<template scope="scope">
						<el-button type="text" @click='goUserDetail(scope.row)'>{{scope.row.name}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="town_name" min-width="180" label="卫生院">
               
				</el-table-column>
				<el-table-column prop="village_name" min-width="180" label="卫生室">
				</el-table-column>
				<el-table-column prop="course_cnt" min-width="180" label="课程总数">
				</el-table-column>
				<el-table-column prop="duration_name" min-width="180" label="学习时长">
				</el-table-column>
				<el-table-column prop="duration_lave_name" min-width="180" label="剩余时长">
				</el-table-column>
			</el-table>
			<el-table v-loading="loading" border :data="manageData" stripe style="width: 100%" v-else>
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
			<div class="block" v-if="this.level_name=='区(县)'||this.level_name=='乡镇'||this.level_name=='村'">
				<el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.page" :page-size="search.pagesize" :page-sizes="[15, 30, 60, 100, 130, 160, 200]" layout="sizes,total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</el-card>
	</article>
</template>
<script>
	import CompanySelect from '../component/select/IndustryCompany.vue'
	import govService from '../../services/gov/govService.js'
	import authUtils from '../../utils/authUtils'
	import DateRange from '../component/form/DateRangePicker'
    import config from '../../utils/config'
	function clearFn() {
		return {
			name: '',
			user_name: '',
			gov_id: '',
			role_id: '',
			createTime: '',
			endTime: '',
			level: void 0,
			pagesize: 15,
			page: 1,
			character: 2,
			_export: '',
		}
	}

	export default {
		components: {
			CompanySelect,
			DateRange
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
				levels: ['省', '市', '区(县)', '乡镇', '村'],
				isVillage: '',
				user_id: '',
				stime: '',
				etime: '',
				token: '',
				area_id:'',
				town_id:'',
				village_id:''
			}
		},
		created() {
			this.level_name = this.levels[authUtils.getUserInfo().gov_level]
			this.area_id=authUtils.getUserInfo().area_id
			this.town_id=authUtils.getUserInfo().town_id
			this.village_id=authUtils.getUserInfo().village_id
			xmview.setContentLoading(false)
			this.stime = this.getlastweekday(this.getNow()),
				this.etime = this.getNow()
			this.isVillage = ''
			if(this.$route.path == '/data/report-userlogin-isVillage') {
				this.isVillage = 1
			}
			this.area()
			this.token = authUtils.getAuthToken()
			console.log(this.token)
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
					this.area()
				}
			}
		},
		methods: {
			exports() {
				let urlPre = config.apiHost
				let newurl=urlPre+'/report/userlearn/rank/lists?_export=1&token='+this.token+'&character='+this.search.character +'&page=1'+'&pagesize=15'+'&stime='+this.stime+'&etime='+this.etime+'&village_id='+this.search.gov_id
				console.log(newurl)
				window.location.href =newurl

			},
			goUserDetail(scope) {
				this.$router.push({
					path: '/data/user-Detail',
					query: {
						user_id: scope.user_id,
						date_start:this.stime,
						date_end:this.etime
					}
				})
			},
			initFetchParam() {
				this.currentPage = 1
				this.search = clearFn()
			},
			handleSizeChange(val) {
				console.log(val)
				this.search.pagesize = val
				this.area()
			},
			handleCurrentChange(val) {
				this.search.page = val
				this.area()
			},
			getlastweekday() {
				var d = new Date();
				var yesterday_milliseconds = d.getTime() - 7000 * 60 * 60 * 24;
				var yesterday = new Date();
				yesterday.setTime(yesterday_milliseconds);
				var strYear = yesterday.getFullYear();
				var strDay = yesterday.getDate();
				var strMonth = yesterday.getMonth() + 1;
				if(strDay < 10) {
					strDay = "0" + strDay;
				}
				if(strMonth < 10) {
					strMonth = "0" + strMonth;
				}
				var datastr = strYear + "-" + strMonth + "-" + strDay;
				return datastr;
			},
			getNow() {
				let date = new Date()
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
				return(Y + M + D)
			},
			getChartData() {
				this.area()
			},
			getData(page) {
				this.loading = true
				return govService.getReportUserlogin({
					page: this.search.page,
					pagesize: this.search.pagesize,
					stime: this.stime,
					etime: this.etime,
					character: this.search.character,
				    _export: this.search._export,
				    village_id:this.search.gov_id
				}).then((ret) => {
					xmview.setContentLoading(false)
					this.loading = false
					this.total = ret._exts.total
					this.manageData = ret.data
				}).then(() => {
					this.loading = false
				})
			},
			getData_Other() {
				this.loading = true
				if(this.search.gov_id) {
					this.level = Number(this.govLevel) + 2
				} else {
					this.level = Number(this.govLevel) + 1
				}
				return govService.getDepartmentStatistics({
					page: this.search.page,
					pagesize: this.search.pagesize,
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
			},
			area() {
				if(this.level_name == '区(县)' || this.level_name == '乡镇'||this.level_name=='村') {
					this.getData().then(() => {
						xmview.setContentLoading(false)
					})
				} else {
					this.getData_Other().then(() => {
						console.log(111)
						xmview.setContentLoading(false)
					})

				}
			}
		}
	}
</script>