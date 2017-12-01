<!--课程栏目-->

<template>
    <!--子组件-->
    <el-tree v-loading="loading" :data="data" :expand-on-click-node="false" @node-click="handleNodeClick"
             @node-expand="handleNodeExpand" :highlight-current="selectable">
    </el-tree>
</template>

<script>
    import treeUtils from '../../../utils/treeUtils'

    export default{
        props: {
            value: Array,
            getData: Function, // 获取数据 返回promise
        },
        data () {
            return {
                data: this.value,
                // data: [],
                loading: false,
                selectable: true, // 是否可选中
            } 
        },
        watch: { //续
            // 'value' (val) {
            //     console.log('================watch   1 val  2this.data=========')
            //     console.log(val)
            //     console.log(this.data)
            //     if (val.length != this.data.length) {
            //         this.setCurrVal(val)
            //     }
            // }
        },
        created () {
            this.getData({id : 'tree', type :'course', filter : true , pid :0 , level:-1}).then(ret=>{ 
               ret.data.forEach(v => {
                    this.data.push({
                        data: v,
                        label: v.name,
                        value: v.id,
                        children: v.ended ? null : [{
                            label: '正在加载',
                            value: -1,
                        }]  //是否最终菜单？点箭头触发请求
                    })
               })
              
               this.loading = false
               xmview.setContentLoading(false)
             
            })

            //11-7 关
            // if (!this.value || this.value.length < 1)
            // this.initData()
        },
        deactivated () {
        },
        methods: {
            handleNodeExpand (data, node, nodeDom) { //点下拉箭头  
                // 如果是有children 并且只有一个[加载中...]的一项 则去服务器加载数据
                // if (data.children && data.children[0].value)
                //     return

                //11-7 关
                // this.initData(data)  //初始化数据

                //11-7 开  
                this.getData({id : 'tree', type :'course', filter : true , pid :node.data.value , level:-1}).then(ret=>{
                    let arr = []
                    
                    ret.data.forEach(v => {
                        arr.push({
                            data: v,
                            label: v.name,
                            value: v.id,
                            children: v.ended ? null : [{ 
                                label: '正在加载',
                                value: -1,
                            }]  //是否最终菜单？
                        })
                })
                
                node.data.children = arr
                this.loading = false
                xmview.setContentLoading(false)
                })
            },
            handleNodeClick (data, node, store) {
                //点击
                // console.log(node.data)
                // if (node.data.ended) return
                    //     let currItem = treeUtils.findItem(this.data, node.data, 'value')   //拿到当前项 
                    //     var arr = []
                    //     this.getData({
                    //         pid: data.data.id, 
                    //         level:-1,
                    //     }).then((ret) => {
                    //         var arr = ret.map(v=>{
                    //             v.label = v.name
                    //             v.value = v.id
                    //             v.children = v.ended ? null : [] //是否最终菜单？是为nulgl 否则为一个数组
                    //             return v
                    //         })
                    //         currItem.children = arr
                    //         this.loading = false
                    //         xmview.setContentLoading(false)
                    //    })

                this.$emit('onNodeClick', {data, node, store})
                //
                // // // 根节点无法被选中 
                // if (data.value == 0) return
                // this.selectable = true
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },


            // removeItem (item, parent) {
            //     // 父节点没有children 说明当前是根节点
            //     if (!parent.data.children) {
            //         this.data = this.data.filter((curr) => {
            //             return curr.value != item.value
            //         })
            //     } else {
            //         parent.data.children = parent.data.children.filter((curr) => {
            //             return curr.value != item.value
            //         })

            //         if (parent.data.children.length < 1) parent.data.children = null
            //     }
            //     // 重新给父容器赋值  不然数据不同步
            //     this.$emit('input', this.data)
            // },



            setCurrVal (val) { //给输入框设置值
                console.log('============setCurrVal val============')
                console.log(val)
                if (val === this.data) return
                this.data = val
                this.$emit('input', val)
            },


            // initData (parentNode) {
            //     debugger
            //     console.log(parentNode)//当前节点对象
            //     let params = parentNode ? {id: parentNode.value} : {}
            //     console.log(params) //参数id
            //     this.loading = true
            //     return this.getData({id : 'tree', type :'course', filter : true , pid : 0 , level:-1}).then(ret => {
            //         //11-7 关
            //         // alert(22222)
            //         console.log(ret)
            //         xmview.setContentLoading(false)
            //         if (!parentNode) {
            //             this.setCurrVal(treeUtils.arr2Cascader(ret.data, 0, void 0, void 0, 'name', 'id'))
                  
            //         } else {
            //             ret.map((item) => {
            //                 item.label = item.name
            //                 item.value = item.id
            //                 item.item = item
            //                 item.children = item.has_children ? [{label: '加载中...'}] : null
            //             })
            //             parentNode.children = ret
            //             console.log(parentNode)
            //         }
            //     }, () => {
            //     }).then(() => {
            //         this.loading = false
            //         this.$forceUpdate()
            //     })
            // },
    
        },
        components: {}
    }

    function findItem(arr,key,value){
        arr.forEach(item=>{
            if(item[key] == value ){
                return item
            }
        })
    }


</script>
