<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
	@import "../../../utils/mixins/common";
	@import "../../../utils/mixins/topSearch";
	#course-manage-public-container {
		@extend %content-container;
		border: none;
		.manage-container {
			@extend %right-top-btnContainer;
			>* {
				color: #fff;
				border-radius: 5px;
			} // 添加课程
			.add {
				background: rgb(0, 204, 255);
			} // 管理栏目
			.catmange {
				background: rgb(153, 102, 204);
			}
		}
		.search {
			@extend %top-search-container;
		} // 底部的管理按钮
		.bottom-manage {
			margin-top: 15px;
		}
		.el-dialog__wrapper {
			padding-top: 15px;
			background: rgba(0, 0, 0, .5);
			z-index: 1000;
		}
	}
</style>

<template>
	<article id="course-manage-public-container">
		<section class="manage-container">
			<el-button type="primary" icon="plus" @click="addCourse"><i>添加课程</i>
			</el-button>
			<!--<el-button type="warning" icon="menu" @click="$router.push({name:'course-manage-course-category-manage'})">
                <i>管理栏目</i>
            </el-button>-->
		</section>

		<article class="search">
			<section>
				<i>标题</i>
				<el-input v-model="fetchParam.course_name" @keyup.enter.native="fetchData" placeholder="请输入标题"></el-input>
			</section>
			<section>
				<i>状态</i>
				<el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData">
					<el-option label="全部" value="-1"></el-option>
					<el-option label="正常" value="0"></el-option>
					<el-option label="禁用" value="1"></el-option>
					<el-option label="转码中" value="2"></el-option>
				</el-select>
			</section>
		</article>

		<el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" @select="selectRow" @select-all="selectRow" border>
			<!--<el-table-column type="selection"></el-table-column>-->
			<el-table-column min-width="200" prop="course_name" label="课程名称">
			</el-table-column>
			<!--<el-table-column min-width="200" prop="category_name" label="绑定栏目">
            </el-table-column>-->

			<!--<el-table-column width="80" label="题目数">
                <template scope="scope">
                    <el-button style="width: 100%" @click="$router.push({name: 'course-manage-addCourse', params: {courseInfo: scope.row, tab:'second'}})"
                        type="text" size="small">{{scope.row.subject_num}}
                        
                    </el-button>
                </template>
            </el-table-column>
            -->
			<!--<el-table-column width="80" prop="sort" label="排序">
			</el-table-column>-->
			<el-table-column width="80" prop="tags" label="标签">
			</el-table-column>
			<el-table-column width="100" label="状态">
				<template scope="scope">
					<el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
					<el-tag v-else-if="scope.row.status == 2" type="primary">转码中</el-tag>
					<el-tag v-else>已禁用 </el-tag>
				</template>
			</el-table-column>
			<el-table-column width="190" prop="addate" label="创建时间">
			</el-table-column>
			<el-table-column fixed="right" width="227" label="操作">
				<template scope="scope">
					<!--<el-button @click="preview(scope.$index, scope.row)" type="text" size="small">预览</el-button>-->
					<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="offline(scope.$index, scope.row)" type="text" size="small">
						<i>{{ scope.row.status == 1 ? '正常 ' : '禁用 ' }}</i>
					</el-button>
					<el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
					<!--<el-button v-if="scope.row.subject_num > 0" @click="$router.push({name:'course-manage-course-answer-analysis', params:{id:scope.row.id}})" type="text" size="small">答案分析
						
					</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100, 130, 160, 200]" layout="sizes,total, prev, pager, next" :total="total">
		</el-pagination>

		<!--底部的批量删除和移动两个按钮-->
		<!--<div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>-->

		<!--移动子栏目的弹出框-->
		<div class="el-dialog__wrapper" v-show="dialogTree.isShow">
			<article class="el-dialog el-dialog--tiny">
				<section class="el-dialog__header">
					<i>移动课程到</i>
				</section>
				<section class="el-dialog__body">
					<CourseCategoryTree node-key="id" :onNodeClick="(data) => dialogTree.selectedId=data.value"></CourseCategoryTree>
				</section>
				<section class="el-dialog__footer">
					<span class="dialog-footer">
                          <el-button @click="dialogTree.isShow = false">取 消</el-button>
                        <el-button type="primary" @click="moveToCat">确 定</el-button>
                    </span>
				</section>
			</article>
		</div>
	</article>
</template>

<script>
	import courseService from '../../../services/course/courseService.js'
	import CourseCategorySelect from '../../component/select/CourseCategory.vue'
	// import CourseCategoryTree from '../../component/tree/CourseCategory.vue'
	import CourseCategoryTree from '../../component/tree/CourseCategory.vue'

	function getFetchParam() {
		return {
			gov_id: void 0, // 部门id
			category_id: 0, // 栏目id
			course_name: '',
			id: '',
			type: 'gov',
			page: 1,
			pagesize: 15,
			level: void 0,
			create_start: void 0,
			create_end: void 0,
			need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
			status: '-1', // 2- 视屏转码中 1-下线 0-正常
			deleted: '0',
			material_type: '', //教材类型
		}
	}
	export default {
		data() {
			return {
				loadingData: false,
				data: [], // 表格数据
				total: 0,
				dialogVisible: false,
				selectedIds: [], // 被选中的数据id集合
				fetchParam: getFetchParam(),
				dialogTree: {
					isShow: false,
					selectedId: void 0,
				},
				status: '',
			}
		},
		activated() {
			this.fetchParam.status = '-1'
			this.fetchData()
			xmview.setContentLoading(false)
		},
		methods: {
			initFetchParam() {
				this.fetchParam = getFetchParam()
			},
			handleCurrentChange(val) {
				this.fetchParam.page = val
				this.fetchData()
			},
			handleSizeChange(val) {
				this.fetchParam.pagesize = val
				this.fetchData()
			},
			fetchData(val) {
				this.loadingData = true
				console.log(this.fetchParam)
				let obj = Object.assign({}, this.fetchParam)
				if(obj.status === '') {
					obj.status = -1
				}
				return courseService.getPublicCourselist(obj).then((ret) => {
					xmview.setContentLoading(false)
					this.data = ret.data
					this.total = ret._exts.total
					this.loadingData = false

				})

			},
			// 单行被选中
			selectRow(selection) {
				let ret = []
				selection.forEach((item) => {
					ret.push(item.id)
				})
				this.selectedIds = ret
			},
			// 下线 或者上线课程 0为下线，1为上线
			offline(index, row) {
				console.log(row)
				let txt = row.status == 0 ? '禁用' : '启用'
				let finalStatus = row.status == 0 ? 1 : 0
				xmview.showDialog(`你将要${txt}课程 <span style="color:red">${row.course_name}</span> 确认吗?`, () => {
					courseService.offlineCourse({
						id: row.contentid,
						status: finalStatus
					}).then((ret) => {
						row.status = finalStatus
					})
				})
			},
			// 单条删除
			del(index, row) {
				xmview.showDialog(`你将要删除课程 <span style="color:red">${row.course_name}</span> 操作不可恢复确认吗?`, () => {
					courseService.deleteCourse({
						course_id: row.contentid
					}).then(() => {
						xmview.showTip('success', '操作成功')
						this.data.splice(index, 1)
					})
				})
			},
			moveToCat() {
				courseService.moveCourseToCategoryMulty({
					id: this.selectedIds.join(','),
					catid: this.dialogTree.selectedId
				}).then(() => {
					xmview.showTip('success', '操作成功')
					this.dialogTree.isShow = false
					setTimeout(() => {
						this.fetchData() // 重新刷新数据
					}, 300)
				})
			},
			// 批量删除
			delMulti() {
				xmview.showDialog(`你将要删除选中的课程，操作不可恢复确认吗?`, () => {
					courseService.deleteCourseMulty({
						id: this.selectedIds.join(',')
					}).then(() => {
						xmview.showTip('success', '操作成功')
						this.dialogTree.isShow = false
						setTimeout(() => {
							this.fetchData() // 重新刷新数据
						}, 300)
					})
				})
			},
			addCourse() {
				this.$router.push({
					name: 'course-manage-addCourse',
					query: {
						handle:'add'
					}
				})
			},
			edit(row) {
				console.log(row)
				this.$router.push({
					name: 'course-manage-addCourse',
					params: {
						courseInfo:row
					},
					query: {
						contentid: row.contentid,
						handle:'edit',
						courseInfo: row,
					}
				})
			},
		},
		components: {
			CourseCategorySelect,
			CourseCategoryTree
		}
	}
</script>