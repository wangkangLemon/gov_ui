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
                left: 20px;
                top: 25px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                font-size: 38px;
                text-align: center;
                text-align-last: center;
                img {
                    width: 35px;
                    height: 35px;
                }
            }
            p {
                font-size: 16px;
                padding-right: 10px;
                cursor: pointer;
            }
            >div {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.9);
                padding: 5px 10px;
                text-align: left;
                text-align-last: left;
                color: #999999;
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
                text-align: right;
                text-align-last: right;
                &:first-of-type {
                    background: #FF9966;
                }
                &:nth-child(2) {
                    background: #2DB6F4;
                }
                &:nth-child(3) {
                    background: #7DC856;
                }
                &:nth-child(4) {
                    background: #5D6977;
                }
                >h2 {
                    margin-top: 20px;
                    font-size: 25px;
                    padding-right: 10px;
                }
                >div {
                    border-radius: 0 0 5px 5px;
                }
            }
        }
    }
    .box-card {
        margin-bottom: 15px;
        color: #333;
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
            height: 300px;
        }
    }
    .analyics-list {
        @extend %justify;
        >.box-card {
            width: 33%;
            display: inline-block;
            vertical-align: top;
            padding-bottom: 20px;
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
    }
}
</style>

<template>
    <main id="index-main-container" v-if="mainData != null">
        <div>123123</div>
        <section class="dashboard-analytics">
            <div class="col4">
                <i class="fa fa-user"></i>
                <h2>{{ mainData.course_plan }}</h2>
                <p>销售额</p>
                <div>
                    <i>昨日销售额 {{ mainData.finance_money_yesterday }}</i>
                </div>
            </div>
            <div class="col4">
                <i class="fa fa-user"></i>
                <h2>{{ mainData.course_plan_offline}}</h2>
                <p>销售量</p>
                <div>
                    <i>昨日销售量 {{ mainData.finance_num_yesterday }}</i>
                </div>
            </div>
            <div class="col4">
                <i class="fa fa-user"></i>
                <h2>{{ mainData.testing_count_total }}</h2>
                <p>用户量</p>
                <div>
                    <i>昨日新增用户 {{ mainData.user_yesterday }}</i>
                </div>
            </div>
            <div class="col4">
                <i class="fa fa-user"></i>
                <h2>{{ mainData.testing_pass_user_total }}</h2>
                <p>课程数</p>
                <div>
                    <i>昨日新增课程 {{ mainData.course_yesterday }}</i>
                </div>
            </div>
        </section>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                近30天课程观看情况
            </div>
            <section id="lineChart"></section>
        </el-card>
        <section class="analyics-list">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    销售金额 TOP 5
                </div>
                <!--<el-table :data="listData.finance_money.total" style="width: 100%">-->
                <el-table  style="width: 100%">
                    <el-table-column :show-overflow-tooltip="true" prop="title" label="课程名称">
                    </el-table-column>
                    <el-table-column prop="num" width="90" label="销售金额">
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    课程销售量 TOP 5
                </div>
                <!--<el-table :data="listData.finance_course.total" style="width: 100%">-->
                <el-table  style="width: 100%">
                    <el-table-column :show-overflow-tooltip="true" prop="title" label="课程名称">
                    </el-table-column>
                    <el-table-column prop="num" width="90" label="销售量">
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    学习人数 TOP 5
                </div>
                <!--<el-table :data="listData.view_user.total" style="width: 100%">-->
                <el-table style="width: 100%">
                    <el-table-column :show-overflow-tooltip="true" prop="title" label="课程名称">
                    </el-table-column>
                    <el-table-column prop="num" width="90" label="学习人数">
                    </el-table-column>
                </el-table>
            </el-card>
        </section>
    </main>
</template>

<script>
import Echars from 'echarts'
// import mainService from '../../services/base/mainService'
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
        //this.mainData={'course_plan': 222, 'course_plan_offline': 3434,'user_yesterday': 666}
        // mainService.getMain().then((ret) => {
        //     this.mainData = ret.stat
        //     this.listData = ret.list
        //     let chartData = ret.chart
        //     chartData.forEach((item) => {
        //         this.xData.push(item.day)
        //         this.viewUserData.push(item.num1)   // 学习人数
        //         this.viewCourseData.push(item.num2) // 学习课程数
        //         this.tryUserData.push(item.num3)    // 试看人数
        //         this.tryCourseData.push(item.num4)  // 试看课程数
        //     })
        // }).then(() => {
        //     this.getLineChart()
        //     var max1 = this.viewUserData.reduce(function(a, b) {
        //         return Math.max(a, b)
        //     })
        //     var max2 = this.viewCourseData.reduce(function(a, b) {
        //         return Math.max(a, b)
        //     })
        //     var max3 = this.tryUserData.reduce(function(a, b) {
        //         return Math.max(a, b)
        //     })
        //     var max4 = this.tryCourseData.reduce(function(a, b) {
        //         return Math.max(a, b)
        //     })
        //     var arr = [max1, max2, max3, max4]
        //     this.maxResult = arr.reduce(function(a, b) {
        //         return Math.max(a, b)
        //     })
        // }).then(() => {
        //     xmview.setContentLoading(false)
        // })
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
                        data: ['学习人数', '学习课程数']
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
                            name: '学习课程数',
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
