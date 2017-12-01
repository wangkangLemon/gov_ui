<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/mixins";
    .left-menu-container {
        .fa {
            margin-right: 5px;
        }
    }
</style>

<template>
    <!--<el-submenu v-if="data && data.children != null">
        <template slot="title">
            {{data.item.name}}
        </template>

        <MenuTree v-for="item in hasChildCItems" :key="item.item.id" :data="item"></MenuTree>
        <template v-if="leafChildren">
        <el-menu-item :index="item.item.id" v-bind="{index}" v-for="item in leafChildren" :key="item.item.id">
            {{item.item.name}}
        </el-menu-item>
        </template>
    </el-submenu>-->
    <el-tree v-else :data="data1" :props="defaultProps" @node-click="handleNodeClick">{{this.data}}</el-tree>
    <!--<el-menu-item :index="item.id" v-bind="{index}" v-for="item in data" :key="item.id" v-else>
        <template v-if="data"> 
        {{data.item.name}}
        </template>
    </el-menu-item>-->
</template>

<script>
    //这是 组件   
    import MenuTree from './MenuTreeSec.vue'
    export default {
        name: 'MenuTree',
        data() {
            return {
                leafChildren: null, // 叶子节点
                hasChildCItems: [], // 有子节点的item
                data1: null,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        props: ['data'],
        created() {
            var arr = []
            this.data.forEach(v => {
                if (v.level == 0) {
                    arr.push({
                        id: v.id,
                        name: v.name,
                        pid: v.pid,
                        model:v.model,
                        path:v.path,
                        level:v.level,
                        image:v.image,
                        children: []
                    })
                }
            })
            this.data.forEach(v => {
                if (v.level == 1) {
                    arr.forEach(item => {
                        if (v.pid == item.id) {
                            item.children.push({
                                id: v.id,
                                name: v.name,
                                pid: v.pid,
                                model:v.model,
                                path:v.path,
                                level:v.level,
                                image:v.image,
                                children: []
                            })
                        }
                    })
                }
            })
            this.data1 = arr
            // console.log('---------++++++++++++++')
            // console.log(this.data1)

            let hasChildCItems = []
            let leafChildren = []
            if (this.data.children) {
                this.data.children.forEach((item) => {
                    if (item.children != null) {
                        hasChildCItems.push(item)
                    } else {
                        leafChildren.push(item)
                    }
                })
            }

            this.hasChildCItems = hasChildCItems
            this.leafChildren = leafChildren
        },
        components: {
            MenuTree
        },
        methods: {
            handleNodeClick(a){
                if( a.level == 0 ){
                    this.$store.dispatch('savePid',a.id)
                }
                this.$store.dispatch('setSecMenu',a);
       
            }
        }
    }
</script>