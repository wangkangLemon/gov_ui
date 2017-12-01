<!--地区下拉选择-->

<!--使用示范:-->
<!--<Region v-on:provinceChange="val => provinceSelect = val"
        v-on:cityChange="val => citySelect = val"
        v-on:areaChange="val => areaChange = val"
        :change="fetchData"></Region>-->

<style lang='scss' rel='stylesheet/scss'>
    .region-container {
        .el-select {
            max-width: 130px !important;
        }
    }
</style>

<template>
    <section class="region-container" ref="container">
        <i>{{title}}</i>
        <el-select :disabled="disabled" v-if="" placeholder="全部" clearable @change="setCurrVal(0, provinceSelect)" v-model="provinceSelect">
            <el-option v-for="(item, index) in provinces" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
        </el-select>
      
    </section>
</template>

<script>
    // import cityData from '../../../assets/js/govCity.js'
    import treeUtils from '../../../utils/treeUtils'

    import govService from '../../../services/gov/govService.js'

    export default {
        props: ['change', 'title', 'province', 'city', 'area', 'disabled'],
        data() {
            return {
                provinces: [],
                citys: [],
                areas: [],
                provinceSelect: '',
                citySelect: '',
                areaSelect: '',
                curItem: [],
                cityData: '',
                options: [],
                fetchParam: {
                    pagesize: -1,
                    pid: 0,
                    province_id: null,
                    city_id: null,
                    area_id: null,
                },
                levelPath:null,
            }
        },
        watch: {
            province(val) {
                if (val) {
                    this.provinceSelect = val
                    // console.log('this.provinceSelect='+this.provinceSelect)
                    this.currentVal(0, val)
                } else {
                    this.provinceSelect = ''
                }
            },
            city(val) {
                if (this.province && val) {
                    this.citySelect = val
                    // console.log('this.citySelect='+this.citySelect)
                    this.currentVal(1, val)
                } else {
                    this.citySelect = ''
                }
            },
            area(val) {
                if (this.province && this.citySelect && val) {
                    this.areaSelect = val
                    this.currentVal(2, val)
                    // console.log('this.areaSelect='+this.areaSelect)
                } else {
                    this.areaSelect = ''
                }
            },
            disabled(val) {
                if (val) {
                    this.provinceSelect = ''
                }
            }
        },
        created() {


        },
        mounted() {
            // 获取数据  按需加载 按需处理数据？  三个独立的选择器
            // this.$refs.container.addEventListener('click', () => {
            // if(this.cityData ){
            //      this.options = this.lastData
            // }else{

            // }
            // console.log(this.provinces)
            this.getData(this.fetchParam.pid, 'provinces')

            // this.cityData.forEach((item) => {
            //     this.provinces.push({
            //         name: item.name,
            //         id: item.id
            //     })
            // })
            // })

        },
        methods: {
            getData(pid, address) {
                this.loading = true
                govService.postSelectList({
                    pagesize: -1,
                    pid: pid,
                    province_id: this.fetchParam.provinceSelect,
                    city_id: this.fetchParam.citySelect,
                    area_id: this.fetchParam.areaSelect
                }).then((ret) => {
                    this.provinces = this.cityData = ret
                    // console.log(this.cityData)


                    if(this.cityData[0].pid = this.cityData[0].area_id ){
                         this.levelPath = 2
                    }else if(this.cityData[0].pid = this.cityData[0].city_id){
                        this.levelPath = 1
                    }else{
                        this.levelPath = 0
                    }

                    let arr = []
                    consoel.log(levelPath)
                    this.cityData.forEach(v => {
                        arr.push({
                            data: v,
                            // children: v.pid ? null : [], //是否最终菜单？
                            name: v.name,
                            id: v.id
                        })
                    })
                    this[address] = arr

                }).then(() => {
                    this.loading = false
                })
            },
            currentVal(type, val) {
                // let levelPath = []
                let emitArr = ['provinceChange', 'cityChange', 'areaChange']
                let typeArr = ['provinceSelect', 'citySelect', 'areaSelect']
                let t = ['provinces', 'citys', 'areas']

                if (!this[typeArr[type]]) return
                // levelPath = [this[typeArr[type]]]
                if (type < typeArr.length - 1) { //最后一级之前
                    this.getData(val, t[type + 1]) //拿到下一级数据
                    for (let i = type + 1; i < typeArr.length; i++) { // 从当前项开始初始化（清空）
                        this[typeArr[i]] = null 
                        // console.log(this[typeArr[i]])    
                                                    //1 触发方法不能是三个 改成一个 这样来初始化 （清空）
                                                    // 2 现在省触发3 市2 县1 
                                                    // 3子组件调用父组件方法来回触发方法要解决的bug
                    }
                }
                 this.change && this.change(val, t[ this.levelPath + 1])
                 //
            },
            setCurrVal(type, val) { //type  0 省 1 市 2 县
                type = this.levelPath
                let emitArr = ['provinceChange', 'cityChange', 'areaChange']
                this.$emit(emitArr[type], val)
                //this.change && this.change()

                // let levelPath = []
                // let typeArr = ['provinceSelect', 'citySelect', 'areaSelect']
                // let t = ['provinces', 'citys', 'areas']

                // if (!this[typeArr[type]]) return
                // levelPath = [this[typeArr[type]]]
                // console.log(levelPath)
                // console.log(type,val)
                // if (type == 0) {  //类型是省拿到子集市
                //     // this.curItem = treeUtils.findItem(this.cityData, levelPath)
                //     // console.log(this.curItem)
                //     // if (this.curItem.children && this.curItem.children.length > 0) {
                //     //     this.citys = this.curItem.children
                //     // } else{
                //         this.getData(val,t[type+1])
                //         for(let i=type+1;i<typeArr.length;i++){
                //              this[typeArr[i]] = null
                //         }
                //     // }
                // } else if (this.provinceSelect && type == 1) {  //类型是市拿到子集区
                //     // if (this.citys && this.citys.length > 0) {
                //     //     this.areas = treeUtils.findItem(this.citys, levelPath).children
                //     // }else{
                //     //      this.getData(val,'areas')
                //     // }
                //     this.getData(val,'areas')
                //     this.areaSelect = null
                // }

                // if (type < typeArr.length - 1) {  //最后一级之前
                //     this.getData(val, t[type + 1])   //拿到下一级数据
                //     for (let i = type + 1; i < typeArr.length; i++) {  // 从当前项开始初始化（清空）
                //         this[typeArr[i]] = null
                //     }
                // }
            }
        }
    }
</script>