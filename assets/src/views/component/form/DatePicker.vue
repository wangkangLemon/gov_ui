<!--使用示例-->
<!--<DateRange title="时间" :start="fetchParam.time_start" :end="fetchParam.time_end"-->
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
                        :picker-options="pickerOptionsStart"
                        placeholder="选择日期">
        </el-date-picker>
    </section>
</template>

<script>
    import * as timeUtils from '../../../utils/timeUtils'
    let _this
    export default{
        props: {
            title: String,
            start: {}, // 开始时间
            change: Function
        },
        data () {
            return {
                timespan: [this.start, this.end],
                pickerOptionsStart: {
                    disabledDate(time) {
                        return !_this.timespan[1] ? null
                            : (time.getTime() - 1000 * 60 * 60 * 4 >= new Date(_this.timespan[1]).getTime() && timeUtils.compareDate(time, new Date(_this.timespan[0])) !== 0)
                    }
                },
            }
        },
        watch: {
            'start'(val) {
                if (getTimeStr(this.timespan[0]) != val) {
                    this.timespan[0] = val
                    // 置空之后, 控件上面显示的值不会被清空  所以要自己操作dom进行操作
                    if (!val) this.$refs.start.$el.querySelector('input').value = ''
                }
            },
        },
        beforeCreate () {
            _this = this
        },
        methods: {
            setCurrVal (type) {
                const emitArr = ['changeStart', 'changeEnd']
                let val = getTimeStr(this.timespan[type])
                this.$emit(emitArr[type], getTimeStr(val))
                this.change && this.change()
            }
        }
    }

    function getTimeStr (val) {
        if (!val) return val
        return timeUtils.date2Str(new Date(val))
    }
</script>
