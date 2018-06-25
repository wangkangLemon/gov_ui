<!--使用示例-->
<!--<DateRange title="晒单时间" :start="fetchParam.time_start" :end="fetchParam.time_end"-->
<!--v-on:changeStart="val=> fetchParam.time_start=val "-->
<!--v-on:changeEnd="val=> fetchParam.time_end=val "-->
<!--:change="fetchData">-->
<template>
    <section>
        <i>{{title}}</i>
        <el-date-picker @change="setCurrVal(0)" ref="start"
                        :editable="false"
                        clearable
                        v-model="timespan[0]"
                        align="right"
                        type="date"
                        :default-value="defaultStart"
                        :picker-options="pickerOptionsStart"
                        placeholder="开始日期">
        </el-date-picker>
        <el-date-picker
                ref="end"
                clearable
                :editable="false"
                @change="setCurrVal(1)"
                v-model="timespan[1]"
                align="right"
                type="date"
                :default-value="defaultEnd"
                :picker-options="pickerOptionsEnd"
                placeholder="结束日期">
        </el-date-picker>
    </section>
</template>

<script>
    import * as timeUtils from '../../../utils/timeUtils'
    let _this
    export default{
        props: {
            defaultStart: String,
            defaultEnd: String,
            title: String,
            start: {}, // 开始时间
            end: {}, // 结束时间
            change: Function
        },
        data () {
            return {
                timespan: [this.start, this.end],
                pickerOptionsStart: {
                    disabledDate(time) {
                        // console.log(_this.timespan[1]);
                        // console.log(time.getTime());
                        // console.log(time.getTime() - 1000 * 60 * 60 * 4);
                        // console.log(new Date(_this.timespan[1]).getTime());
                        // console.log(timeUtils.compareDate(time, new Date(_this.timespan[0])) );
                        //设置禁用范围
                        return !_this.timespan[1] ? null
                            : (time.getTime() - 1000 * 60 * 60 * 4 >= new Date(_this.timespan[1]).getTime() && timeUtils.compareDate(time, new Date(_this.timespan[0])) !== 0)
                    }
                },
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return !_this.timespan[0] ? null
                            : (time.getTime() <= new Date(_this.timespan[0]).getTime() && timeUtils.compareDate(time, new Date(_this.timespan[0])) !== 0)
                    }
                },
            }
        },
        watch: {
            'start'(val) {
                console.log(this.timespan[0]);
                console.log(this.start);
                if (getTimeStr(this.timespan[0]) != val) {
                    this.timespan[0] = val
                    // console.log(this.timespan[0])
                    // 置空之后, 控件上面显示的值不会被清空  所以要自己操作dom进行操作
                    if (!val) this.$refs.start.$el.querySelector('input').value = ''
                }
            },
            'end'(val) {
                console.log(this.timespan[1]);
                console.log(this.end);
                if (getTimeStr(this.timespan[1]) != val) {
                    this.timespan[1] = val
                    if (!val) this.$refs.end.$el.querySelector('input').value = ''
                }
            }
        },
        beforeCreate () {
            _this = this
        },
        methods: {
            setCurrVal (type) {
                const emitArr = ['changeStart', 'changeEnd']
                let val = getTimeStr(this.timespan[type])
                this.$emit(emitArr[type], getTimeStr(val))
                console.log()
                this.change && this.change()
            }
        }
    }

    function getTimeStr (val) {
        if (!val) return val
        return timeUtils.date2Str(new Date(val))
    }
</script>
