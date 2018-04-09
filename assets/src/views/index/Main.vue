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
        padding: 25px 13px;

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
                @media (max-width: 1121px) {
                    display:none;
                    // transform: translateX(-100%);
                    // top: 0px;
                    // z-index:10;
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
            @media (max-width: 1121px) {
                padding:15px 20px;
                // transform: translateX(-100%);
                // top: 0px;
                // z-index:10;
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
         .header-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .header-right {
                display: inline-block;
            }
        }
        .fr{
            display: inline-block;
            float:right;
            .el-radio-group{
                margin-right: 10px;
                .el-radio-button__inner{
                    display: inline-block;
                    padding: 10px 13px;
                 }

            }
            
        }
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
                    <i v-if=" mainData.user_learn_cnt-mainData.user_learn2_cnt >=0">比前天新增 {{ mainData.user_learn_cnt-mainData.user_learn2_cnt }}人 </i>
                    <i v-else>比前天减少 {{ mainData.user_learn2_cnt-mainData.user_learn_cnt}}人 </i>
                    <!-- <i>比前天新增 {{ mainData.user_learn2_cnt }}人 （{{ mainData.user_learn_added_rate }}）</i> -->
                    <router-link tag="a" :to="{name: 'data-course-history', query: {yesterday}}">查看详情</router-link>
                </div>
            </div>
            <div class="col4">
                <i><img src="./images/kaoshirenshu.png"/></i>
                <p>昨日考试人数</p>
                <h2>{{ mainData.user_testing_cnt }}</h2>
                <div>
                    <i v-if="mainData.user_testing_cnt-mainData.user_testing2_cnt>=0">比前天新增{{ mainData.user_testing_cnt-mainData.user_testing2_cnt }}人 </i>
                    <i v-else>比前天减少 {{ mainData.user_testing2_cnt-mainData.user_testing_cnt  }}人 </i>
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
                        <i>学习次数</i>
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
                    <div slot="header" class="clearfix header-title">人员学习情况和考试情况     
                        <div class="fr">
                            <span class="fr">
                                 <DateRange   
                                    :start="chartParam.stime" 
                                    :end="chartParam.etime" 
                                    :defaultStart="chartParam.stime"
                                    :defaultEnd="chartParam.etime"
                                    v-on:changeStart="val=> chartParam.stime=val" 
                                    v-on:changeEnd="val=> chartParam.etime=val"
                                    :change="getChartData" ref="DateRange">
                                </DateRange>
                            </span>
                              <span class="fr">
                                <el-radio-group v-model="chartRadio" class="header-right">
                                    <el-radio-button label="week">近7天</el-radio-button>
                                    <el-radio-button label="month">近30天</el-radio-button>
                                </el-radio-group>
                            </span>
                        </div> 
                    </div>    
                </div>

                <section id="lineChart"></section>
            </el-card>
            <section class="analyics-list">
                <el-card class="box-card box-card-2">
                    <div slot="header" class="clearfix">
                        本{{this.level_name}}学习TOP 10
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
                        本{{this.level_name}}昨日学习TOP 10
                    </div>
                    <el-table  :data="mainData.added_learn_detail_top" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="gov_name" width="200" label="部门名称">
                        </el-table-column>
                        <el-table-column prop="added_duration_name" width="120" label="观看时长">
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
                        本{{this.level_name}}昨日课程TOP 10
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
import DateRange from '../component/form/DateRangePicker'
import authUtils from '../../utils/authUtils' 
import * as timeUtils from '../../utils/timeUtils'
let d = new Date()
export default {
    components: {
        DateRange
    },
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
            maxResult: 0,
            chartRadio: 'week',
            chartParam:{
                stime:'',
                etime:''
            },
            levels:['省','市','县','镇','村'],
            level_name:'',
        }
    },
    created() {
        console.log(authUtils.getUserInfo())
        this.level_name=this.levels[authUtils.getUserInfo().gov_level]
        xmview.setContentLoading(false)//加载数据结束关闭加载动画
    },
    mounted () {
          mainService.getMain().then((ret) => {
            this.mainData = ret.data
            // this.listData = ret.data
        })
        this.chartParam={
                    stime:this.getlastweekday(this. getNow()),
                    etime:this.getNow()
                },
        this.getChartData()
    },
    watch:{
        'chartRadio'(){
            if(this.chartRadio=='month'){
                this.getPreMonth(this. getNow())
                   this.chartParam={
                    stime:this.getPreMonth(this. getNow()),
                    etime:this.getNow()
                },
                this.getChartData()
            }
             if(this.chartRadio=='week'){
                this.getlastweekday(this. getNow())
                   this.chartParam={
                    stime:this.getlastweekday(this. getNow()),
                    etime:this.getNow()
                },
                this.getChartData()
            }
        },
    },
    methods: {
        /**
         * 获取上一个月
         *
         * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
         */
        getNow(){
            let date= new Date()
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) 
            return(Y+M+D)
        },
        /** 
         * 计算上周的时间 
         * @returns 
         */  
        getlastweekday(){         
            var d=new Date();  
            var yesterday_milliseconds=d.getTime()-7000*60*60*24;          
            var yesterday = new Date();          
            yesterday.setTime(yesterday_milliseconds);          
            var strYear = yesterday.getFullYear();       
            var strDay = yesterday.getDate();       
            var strMonth = yesterday.getMonth()+1;     
            if(strDay<10)       
        {       
            strDay="0"+strDay;       
            }      
        if(strMonth<10)       
        {       
            strMonth="0"+strMonth;       
            }       
            var datastr = strYear+"-"+strMonth+"-"+strDay;     
            return datastr;     
        },     
        getPreMonth(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        },

        getChartData(){
            // console.log(this.chartParam.stime,this.chartParam.etime)
            if(this.chartParam.stime==undefined||this.chartParam.etime==undefined){
                return false
            }
            // console.log('轻取数据')
             mainService.getchart(this.chartParam).then((ret) => {
                this.xData=[]
                let chartData = ret.data
                chartData.forEach((item) => {
                    this.xData.push(item.dt)
                    this.viewUserData.push(item.learn_cnt)   // 学习人数
                    this.viewCourseData.push(item.testing_cnt) // 考试人数
                })
            }).then(() => {
                setTimeout(() => {
                    this.getLineChart()
                }, 1000)
                var max1 = this.viewUserData.reduce(function(a, b) {
                    return Math.max(a, b)
                })
                var max2 = this.viewCourseData.reduce(function(a, b) {
                    return Math.max(a, b)
                })
                var arr = [max1, max2]
                this.maxResult = arr.reduce(function(a, b) {
                    return Math.max(a, b)
                })
            })
        },
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
