<!--供应商下拉框-->
<template>
    <SelectScroll :placeholder="placeholder" @changeVal="setCurrentValue" :changeCb="handleChange" :requestCb="fetchData" v-model="currVal">
    </SelectScroll>
</template>

<script>
    // import providerService from '../../../services/provider/providerService'
    // import SelectScroll from '../../component/form/SelectScroll.vue'
    // export default{
    //     props: ['value', 'change', 'placeholder'],
    //     data () {
    //         return {
    //             currVal: this.value,
    //             pageSize: 20
    //         }
    //     },
    //     watch: {
    //         'value'(val, oldValue) {
    //             this.setCurrentValue(val)
    //         }
    //     },
    //     methods: {
    //         fetchData (val, length) {
    //             return providerService.getSelectList({
    //                 keyword: val,
    //                 pagesize: this.pageSize,
    //                 page: parseInt(length / this.pageSize) + 1
    //             })
    //         },
    //         handleChange(val) {
    //             this.setCurrentValue(val)
    //             this.change && this.change()
    //         },
    //         setCurrentValue (val) {
    //             if (this.curVal == val) return
    //             this.currVal = val
    //             this.$emit('input', val)
    //         }
    //     },
    //     components: {
    //         SelectScroll
    //     }
    // }
</script>
