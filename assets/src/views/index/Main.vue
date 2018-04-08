<style lang='scss' rel="stylesheet/scss">
@import "../../utils/mixins/mixins";
#index-main-container {
    .dashboard-analytics {
        margin-bottom: 0;
        @extend %justify;
        >div {
            height: 100%;
            color: #fff;
            position: relative;
            display: inline-block;
            vertical-align: top;
            border-radius: 5px;
            font-size: 12px;
            >i {
                display: block;
                line-height: 55px;
                width: 55px;
                height: 55px;
                position: absolute;
                right: 20px;
                top: 25px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                font-size: 38px;
                text-align: center;
                text-align-last: center;
                img {
                    width: 44px;
                    margin-top: 5px;
                };
            }
            p {
                font-size: 16px;
                padding-left: 10px;
                cursor: pointer;
                margin-top: 20px;
                
            }
            >div {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.2);
                padding: 5px 10px;
                text-align: left;
                text-align-last: left;
                > a {
                    float: right;
                    color: #fff;
                }
            }
            &.col2 {
                width: 49%;
                height: 140px;
                background: #fff;
                color: #333;
                >h2 {
                    margin: 20px 0 10px 85px;
                    font-size: 25px;
                }
                table {
                    width: 320px;
                    margin-left: 85px;
                    font-size: 14px;
                }
                td {
                    line-height: 1.8;
                }
            }
            &.col4 {
                height: 120px;
                width: 23.5%;
                text-align: left;
                text-align-last: left;
                &:first-of-type {
                    background: #169998;
                }
                &:nth-child(2) {
                    background: #37B7F2;
                }
                &:nth-child(3) {
                    background: #9999CB;
                }
                &:nth-child(4) {
                    background: #CA0036;
                }
                >h2 {
                    font-size: 25px;
                    padding-left: 10px;
                }
                >div {
                    border-radius: 0 0 5px 5px;
                }
            }
        }
    }
    .course-analytics {
        // @extend %justify;
        float: left;
        width:23.5%;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 5px;
        padding: 1.5% 0.7%;
        overflow-x: auto;
        > div {
            display: inline-block;
            vertical-align: top;
            height: 100%;
            border-bottom: 1px solid #ddd;
            padding: 1% 0;
            &:last-of-type {
                border-bottom: none;
            }
            width: 100%;
            > * {
                display: inline-block;
                vertical-align: top;
            }
            .sign {
                width: 55px;
                height: 55px;
                text-align: center;
                text-align-last: center;
                border-radius: 50%;
                margin:10px 20px;
                &.test {
                    background: #808BC4;
                }
                &.public {
                    background: #37B8F3;
                }
                &.primary {
                    background: #F8BE29;
                }
                line-height:450%;
                img {
                    margin-top: 9px;
                    width: 35px;
                    // height: 50%;
                }
            }
            > div {
                margin-top: 10px;
                > i {
                    font-size: 12px;
                    color: #666;
                }
                > p {
                    font-size: 25px;
                    color: #333;
                    font-weight:500;
                }
            }
        }
    }
    .box-card {
        margin-bottom: 15px;
        color: #333;
        width: 75%;
        height:100%;
        &.l{
            margin-left:25%;
        }
        .clearfix {
            text-align: left;
            
        }
        .el-card__header {
            padding: 10px 15px;
            background: #f0f3f5;
            font-size: 16px;
            
        }
        #lineChart {
            width: 100%;
            height: 40%;
            min-height:210px;
        }
    }
    .l{
        color: #909399;
    }
    .analyics-list {
        @extend %justify;
        >.box-card ,>.box-card-2{
            width: 32.4%;
            display: inline-block;
            vertical-align: top;
            .el-table {
                border: none;
                th {
                    font-weight: normal;
                }
                .cell {
                    text-align: left;
                    text-align-last: left;
                    height: 30px !important;
                    line-height: 30px !important;
                    @extend %singline;
                    padding-right: 0;
                }
                td {
                    height: 20px !important;
                    line-height: 20px !important;
                    border-bottom: none;
                }
            }
            .el-card__body {
                padding: 0;
                .cell{
                text-align: center
                    
                }
            }
            th {
                background: none;
            }
            thead {
                div {
                    background: none;
                }
            }
        }
        >.box-card-2{
            width: 49.3%;
            margin-bottom: 15px;
        }
        .el-table  {
            thead{
            color: #909399;
            font-weight: 500;
            }
        }
    }
}
</style>

<template>
    <main id="index-main-container" v-if="mainData != null">
        <section class="dashboard-analytics">
            <div class="col4">
                <i><img src="./images/renyuanzongshu.png"/></i>
                <p>人员总数量</p>
                <h2>{{ mainData.user_cnt }}</h2>
                <div>
                    <i>已激活： {{ mainData.logined_cnt }}（{{ mainData.logined_rate }}）</i>
                    <router-link tag="a" :to="{name: 'user-index', query: {yesterday}}">查看详情</router-link>
                </div>
            </div>
            <div class="col4">
                <i><img src="./images/cunyizongshu.png"/></i>
                <p>村医总数量</p>
                <h2>{{ mainData.village_user_cnt}}</h2>
                <div>
                    <i>已激活 {{ mainData.village_logined_cnt }} （{{ mainData.village_logined_rate }}）</i>
                    <router-link tag="a" :to="{name: 'data-report-userlogin-isVillage', query: {yesterday}}">查看详情</router-link>
                </div>
            </div>
            <div class="col4">
                <i><img src="./images/xuexirenshu.png"/></i>
                <p>昨日学习人数</p>
                <h2>{{ mainData.user_learn_cnt }}</h2>
                <div>
                    <i>比前天新增 {{ mainData.user_learn2_cnt }}人 （{{ mainData.user_learn_added_rate }}）</i>
                    <router-link tag="a" :to="{name: 'data-course-history', query: {yesterday}}">查看详情</router-link>
                </div>
            </div>
            <div class="col4">
                <i><img src="./images/kaoshirenshu.png"/></i>
                <p>昨日考试人数</p>
                <h2>{{ mainData.user_testing_cnt }}</h2>
                <div>
                    <i>比前天减少 {{ mainData.user_testing2_cnt }}人 （{{ mainData.user_testing_added_rate }}）</i>
                    <router-link tag="a" :to="{name: 'data-testing', query: {yesterday}}">查看详情</router-link>
                </div>
            </div>
        </section>
        <section >
             <section class="course-analytics">
            <div>
                <i class="sign test"><img src="./images/gongkaikecheng.png"/></i>
                <div>
                    <i>平台公开课程</i>
                    <p>{{mainData.course_num}}</p>
                </div>
            </div>
            <div>
                <i class="sign public"><img src="./images/xuexi_cishu.png"/></i>
                <div>
                    <i>村医学习次数</i>
                    <p>{{mainData.total_village_learn_cnt}}</p>
                </div>
            </div>
            <div>
                <i class="sign primary"><img src="./images/kechengrenwu.png"/></i>
                <div>
                    <i>课程任务</i>
                    <p>{{mainData.course_task_num}}</p>
                </div>
            </div>
            </section>    
            <el-card class="box-card l">
                <div slot="header" class="clearfix">
                    人员学习情况和考试情况
                </div>
                <section id="lineChart"></section>
            </el-card>
            <section class="analyics-list">
                <el-card class="box-card box-card-2">
                    <div slot="header" class="clearfix">
                        本县学习TOP 10
                    </div>
                    <el-table  :data="mainData.total_learn_detail_top" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="gov_name" width="200" label="部门名称">
                        </el-table-column>
                        <el-table-column prop="total_duration_name" width="120" label="观看时长">
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card class="box-card box-card-2">
                    <div slot="header" class="clearfix">
                        本县昨日学习TOP 10
                    </div>
                    <el-table  :data="mainData.added_learn_detail_top" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="gov_name" width="200" label="部门名称">
                        </el-table-column>
                        <el-table-column prop="total_duration_name" width="120" label="观看时长">
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        昨日平台课程TOP 10
                    </div>
                    <el-table  :data="mainData.site_course_top" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" prop="course_name" label="课程名称">
                        </el-table-column>
                        <el-table-column prop="category_name" width="120" label="课程栏目">
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        本县昨日课程TOP 10
                    </div>
                    <el-table  :data="mainData.area_course_top" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" prop="course_name" label="课程名称">
                        </el-table-column>
                        <el-table-column prop="category_name" width="120" label="课程栏目">
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        平台新增课程TOP 10
                    </div>
                    <el-table :data="mainData.newer_course_detail" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" prop="course_name" label="课程名称">
                        </el-table-column>
                        <el-table-column prop="category_name" width="120" label="课程栏目">
                        </el-table-column>
                    </el-table>
                </el-card>
            </section>
        </section>
       
    </main>
</template>

<script>
import Echars from 'echarts'
import mainService from '../../services/base/mainService'
import * as timeUtils from '../../utils/timeUtils'
let d = new Date()
export default {
    data() {
        return {
            yesterday: timeUtils.date2Str(new Date(d.setTime(Date.now() - 24 * 60 * 60 * 1000))),
            mainData: null,
            listData: null,
            xData: [],
            viewUserData: [],
            viewCourseData: [],
            tryUserData: [],
            tryCourseData: [],
            maxResult: 0
        }
    },
    created() {
        xmview.setContentLoading(false)//加载数据结束关闭加载动画
        //这里是假数据
        // this.mainData={'course_plan': 222, 'course_plan_offline': 3434,'user_yesterday': 666,'testing': 4711}
   

        mainService.getMain().then((ret) => {
            this.mainData = ret.data
            this.listData = ret.data
            // let chartData = ret.chart
                // chartData.forEach((item) => {
                //     this.xData.push(item.day)
                //     this.viewUserData.push(item.num1)   // 学习人数
                //     this.viewCourseData.push(item.num2) // 考试人数
                //     this.tryUserData.push(item.num3)    // 试看人数
                //     this.tryCourseData.push(item.num4)  // 试看课程数
                // })
        }).then(() => {
            // this.getLineChart()
                // var max1 = this.viewUserData.reduce(function(a, b) {
                //     return Math.max(a, b)
                // })
                // var max2 = this.viewCourseData.reduce(function(a, b) {
                //     return Math.max(a, b)
                // })
                // var max3 = this.tryUserData.reduce(function(a, b) {
                //     return Math.max(a, b)
                // })
                // var max4 = this.tryCourseData.reduce(function(a, b) {
                //     return Math.max(a, b)
                // })
                // var arr = [max1, max2, max3, max4]
                // this.maxResult = arr.reduce(function(a, b) {
                //     return Math.max(a, b)
                // })
        }).then(() => {
            xmview.setContentLoading(false)
        })

        mainService.getUserlearn().then((ret) => {
            let chartData = ret.data
            console.log(ret.data)
            // if(chartData==null||chartData==undefined){ return flase}
            chartData.forEach((item) => {
                this.xData.push(item.dt)
                this.viewUserData.push(item.user_cnt)   // 学习人数
            })
        }).then(() => {
            this.getLineChart()
            var max1 = this.viewUserData.reduce(function(a, b) {
                return Math.max(a, b)
            })
            var arr = [max1]
            this.maxResult = arr.reduce(function(a, b) {
                return Math.max(a, b)
            })
        })

        mainService.getUsertesting().then((ret) => {
            let chartData = ret.data
            console.log(chartData)
            chartData.forEach((item) => {
                this.xData.push(item.dt)
                this.viewCourseData.push(item.user_cnt) // 考试人数
            })
        }).then(() => {
            this.getLineChart()
            var max2 = this.viewCourseData.reduce(function(a, b) {
                return Math.max(a, b)
            })
            var arr = [ max2]
            this.maxResult = arr.reduce(function(a, b) {
                return Math.max(a, b)
            })
        })

    },
    methods: {
        getLineChart() { // 线性
            this.$nextTick(() => {
                let myChart = Echars.init(document.getElementById('lineChart'))
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['学习人数', '考试人数']
                    },
                    grid: {
                        left: '3%',
                        right: '0%',
                        bottom: 20, // 通过bottom调整图表的高度 使得x轴label可以全部显示
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.xData,
                            axisLabel: {
                                interval: 1,
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            max: Math.ceil(this.maxResult * 1.2)
                        }
                    ],
                    series: [
                        {
                            name: '学习人数',
                            type: 'line',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(0, 0, 0, 0)'
                                }
                            },
                            data: this.viewUserData
                        },
                        {
                            name: '考试人数',
                            type: 'line',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(0, 0, 0, 0)'
                                }
                            },
                            data: this.viewCourseData
                        }
                    ]
                }
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option)
                window.onresize = myChart.resize
            })
        }
    }
}
</script>
