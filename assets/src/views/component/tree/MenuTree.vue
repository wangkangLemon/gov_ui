<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/mixins";
    .left-menu-container {
        .fa {
            margin-right: 5px;
        }
    }
</style>

<template>
    <el-submenu :index="data.menu_node" v-if="data && data.items != null"> <!-- 最外层 el-submenu -if  ,el-menu-item -else -->
        <template slot="title">  <!-- 第1层 要用slot-->
            <i class="fa" :class="data.menu_icon" v-if="data.menu_icon"></i>
            <i class="fa fa-th-large" v-else></i> {{data.menu_name}}
        </template>
        <template>  <!-- 第2层  el-submenu -if  ,el-menu-item -else -->
            <el-submenu :index="subItem.menu_node" v-for="subItem in data.items" :key="subItem.id" v-if="subItem.items.length!=0">
                <template slot="title">
                    <i class="fa" :class="subItem.menu_icon" v-if="subItem.menu_icon"></i>
                    <i class="fa fa-circle-o" v-else></i> {{subItem.menu_name}}
                </template>
                <template>
                    <el-menu-item :index="subSubItem.menu_node" v-for="subSubItem in subItem.items"  :key="subSubItem.id">
                        <!--<template slot="title">-->
                        <i class="fa" :class="subSubItem.menu_icon" v-if="subSubItem.menu_icon"></i>
                        <i class="fa fa-circle-o" v-else></i> {{subSubItem.menu_name}}
                        <!--</template>-->
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item :index="subItem.menu_node" v-else>
                <i class="fa" :class="subItem.menu_icon" v-if="subItem.menu_icon"></i>
                <i class="fa fa-circle-o" v-else></i> {{subItem.menu_name}}
            </el-menu-item>
        </template>
    </el-submenu>
    <el-menu-item :index="data.menu_node" v-else>
        <i class="fa" :class="data.menu_icon" v-if="data.menu_icon"></i>
        <i class="fa fa-th-large" v-else></i> {{data.menu_name}}
    </el-menu-item>
</template>

<script>
    import MenuTree from './MenuTree.vue'
    export default {
        name: 'MenuTree',
        data() {
            return {
                leafChildren: [], // 叶子节点
                hasChildCItems: [], // 有子节点的item
            }
        },

        props: ['data'],
        created() {
            if (this.data == null) {
                this.data = {}
            }
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
        }
    }
</script>