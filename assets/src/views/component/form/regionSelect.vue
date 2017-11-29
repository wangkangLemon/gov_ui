<style lang="scss">
    .area {
        border: 1px solid #bfcbd9;
        border-radius: 9px;
        padding: 10px 0;
        margin-top: 5px;
        li {
            list-style: none;
            padding: 13px 10px 7px 10px;
            &:hover {
                background-color: #f2f2f2;
            }
            &>label {
                float: left;
                margin-right: 40px;
            }
            &>div {
                overflow: hidden;
                display: inline-block;
            }
        }
        li:nth-child(5) {
            &>div {
                label:nth-child(6) {
                    display: block;
                    margin: 10px 0 0 0;
                }
            }
        }
    }
</style>

<template>

    <ul class="area">
        <li v-for="(item, index) in areas">
            <el-checkbox v-model="checkAll[index]" @change="handleCheckAllChange($event,index)">{{item.name}}</el-checkbox>
            <el-checkbox-group v-model="checkedCities[index]" @change="handleCheckedCitiesChange($event, index)">
                <el-checkbox v-for="city in item.cities" :label="city" :key="city.code">{{city}}</el-checkbox>
            </el-checkbox-group>
        </li>
    </ul>
    
</template>

<script>
    import areaData from '../../../assets/js/area'
    import * as utils from '../../../utils/common.js'
    export default {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: Object,
            value: String,
            selectAreas: String
        },
        data () {
            return {
                checkAll: {},
                checkedCities: {},
                initSelectAreas: this.selectAreas,
                // isIndeterminate: '',
                areas: [],
                curItem: [],
                curAttr: this.attr,
                resArr: this.checked
            }
        },
        created () {
            // 封装数据
            // {areas:this.areas, checkAll:this.checkAll, checkedCities: this.checkedCities} = this.initData(this.areaData)
            this.areas = this.initData(areaData).areas
            this.checkAll = this.initData(areaData).checkAll
            this.checkedCities = this.initData(areaData).checkedCities
        },
        methods: {
            initData (param) {
                let areasArr = this.initSelectAreas.split(',')
                let areas = []
                let checkAll = {}
                let checkedCities = {}
                param.forEach((item, index) => {
                    checkedCities[index] = []
                    checkAll[index] = false
                    let cities = []
                    item.children.forEach((child) => {
                        // cities.push({
                        //     name: children.name,
                        //     code: children.code
                        // })
                        cities.push(child.name)
                        if (areasArr.includes(child.name)) {
                            checkedCities[index].push(child.name)
                        }
                        if (utils.isArrayEqual(checkedCities[index], cities)) {
                            checkAll[index] = true
                        }
                    })
                    areas.push({
                        name: item.name,
                        cities
                    })
                })
                return {areas, checkAll, checkedCities}
            },
            handleCheckAllChange (e, index) {
                this.$emit('change', this.checkedCities)
                this.checkedCities[index] = e.target.checked ? this.areas[index].cities : []
            },
            handleCheckedCitiesChange (value, index) {
                this.$emit('change', this.checkedCities)
                this.checkAll[index] = value.length === this.areas[index].cities.length
            }
        }
    }
</script>
