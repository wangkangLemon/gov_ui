<!--课程栏目-->

<template> 
    <!--这是父组件-->
    <el-tree v-loading="loading" :data="data" :expand-on-click-node="false" @node-click="handleNodeClick"
             @node-expand="handleNodeExpand" :highlight-current="selectable">
    </el-tree>
</template>

<script>
    import courseService from '../../../services/course/courseService.js'
    import treeUtils from '../../../utils/treeUtils'

    export default{
        props: {
            onNodeClick: Function,
            value: Array,
        },
        data () {
            return {
                data: this.value,
                // data: [],
                loading: false,
                selectable: true, // 是否可选中
            }
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
              

               // 能在这也存储一个类似item 吗？ 在视图 this.fechparam   反正两个改一个  在这要改的话 怎么像map 一样给个  item.item=item
               this.loading = false
               xmview.setContentLoading(false)
             
            })
        },
        watch: {

            // 'value' (val) {  
            //     if (val.length != this.data.length) {
            //         this.setCurrVal(val)
            //     }
            // },
            // 'data' (val) {
            //     this.$emit('input', val)
            // }
        },
        methods: {
            // handleNodeClick ({data, node, store}) {
                //     this.onNodeClick && this.onNodeClick(data, node, store)
                //                     console.log(node)
                //     // console.log('===========onNodeClick    data==========  ')
                // },
                // removeItem (item, parent) {
                //     this.$refs.tree.removeItem(item, parent)
                // },
                // setCurrVal (val) {
                //     if (val === this.data) return
                //     this.data = val
                //     this.$emit('input', val)
                // },
            // 给子元素获取数据的方法
            getData (params) {
                return courseService.getCategoryTree(params)
            },

//========================================  opeeableTree============================================================

            handleNodeExpand (data, node, nodeDom) { //点下拉箭头  
                // 如果是有children 并且只有一个[加载中...]的一项 则去服务器加载数据
    
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
            handleNodeClick (data, node, store) { //点击
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

                 // this.$emit('onNodeClick', {data, node, store})
                this.onNodeClick(1, data, node, store) 

                // // // 根节点无法被选中 
                if (data.value == 0) return
                this.selectable = true
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },

            removeItem (item, parent) {
                // 父节点没有children 说明当前是根节点
                if (!parent.data.children) {
                    this.data = this.data.filter((curr) => {
                        return curr.value != item.value
                    })
                } else {
                    parent.data.children = parent.data.children.filter((curr) => {
                        return curr.value != item.value
                    })

                    if (parent.data.children.length < 1) parent.data.children = null
                }
                // 重新给父容器赋值  不然数据不同步
                this.$emit('input', this.data)
            },



            setCurrVal (val) { //给输入框设置值
                if (val === this.data) return
                this.data = val
                this.$emit('input', val)
            },
 
        },
    }

      function findItem(arr,key,value){
        arr.forEach(item=>{
            if(item[key] == value ){
                return item
            }
        })
    }
</script>