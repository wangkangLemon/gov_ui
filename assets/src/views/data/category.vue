<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../utils/mixins/common";
    @import "../../utils/mixins/topSearch";

    #course-index-container {
        @extend %content-container;
        min-width:1077px;

        .manage-container {
            @extend %right-top-btnContainer;
            >* {
                color: #fff;
                border-radius: 5px;
            }
        }
        >section{
            display: inline-block;
             vertical-align: top;
        }
        .left-container{
            min-width: 300px;
            border-right: 1px solid #ededed;
        }
        .right-container{
            width: 60%;
            margin-left: 15px;
            >div{
                margin-bottom: 20px       
            }
        }
        .el-dialog__wrapper {
            padding-top: 15px;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
        }
    }
</style>

<template>
    <article id="course-index-container">

            <section class="manage-container"><button type="button" icon="plus" class="el-button el-button--primary"  @click="create"><span>新建分类</span></button></section>
            <section class="left-container">
                
                <MenuTree :data="SecMenu" v-if="SecMenu.length"></MenuTree>
                
            </section>
            <section class="right-container">
                <div><button type="button" class="el-button" :class="{'el-button--primary':type=='update'}" @click="changeType('update')"><span>修改分类</span></button>                    
                    <button type="button" class="el-button" :class="{'el-button--primary':type=='P'}" @click="changeType('P')"><span>添加根节点</span></button>                    
                    <button type="button" class="el-button" :class="{'el-button--primary':type=='S'}" @click="changeType('S')"><span>添加子分类</span></button>                    
                    <button type="button" class="el-button" :class="{'el-button--primary':type=='C'}" @click="changeType('C')" ><span>移动分类</span></button>
                    <button type="button" class="el-button" :class="{'el-button--primary':type=='Cd'}" @click="changeType('Cd')" ><span>移动分类下内容</span></button> 
                    <button type="button" class="el-button el-button--danger" @click="del"><span>删除分类</span></button>
                </div>
                
      
                <SecCard @handleSave="handle" :data="selectData" :type="type"></SecCard>
            </section>
            <!--{{secMenu}}-->
    </article>
</template>

<script>
    //这是 主页面
    import cateService from '../../services/section/cateService.js'
    import MenuTree from '../component/tree/MenuTreeSec.vue'
    import SecCard from '../component/table/SecCard.vue'
    function getFetchParam() {
        return {
            status: void - 1, // 2- 视屏转码中 1-下线 0-正常
            category: void 0, // 3- 供应商
            page: 1,
            pagesize: 15,
            time_start: void 0,
            time_end: void 0,
            need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
            keyword: void 0,
           
        }
    }

    export default {
        components: {
            MenuTree,
            SecCard
        },
     
        data() {
            return {
                loadingData: false,
                SecMenu:[],
                total: 0,
                fetchParam: getFetchParam(),
                selectData:{},
                type: 'update',

            }
        },

        watch: {
            '$store.state.index.secMenu'(){
                this.selectData = Object.assign({},this.$store.state.index.secMenu) //复制一份vuex存储的值 
                console.log(this.$store.state.index.secMenu)
            }
        },
        activated() {
            this.loadingData=false
            xmview.setLoading(false)
            this.fetchData()
        },
        methods: {
            initFetchParam() {
                this.fetchParam = getFetchParam()
            },
            handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
            },
            handleSizeChange(val) {
                this.fetchParam.pagesize = val
                this.fetchData()
            },
            fetchData() {
                cateService.fetchData().then((ret) => {
                        // this.$store.state.index.secMenu.commit('INDEX_SET__SETSECMENU', ret.data) 
                        this.SecMenu=ret.data
                        xmview.setContentLoading(false)     
                    })
            },
            create( ) {
                cateService.create().then(() => {
                        console.log(ret)
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
            },
            //处理保存的数据
            handle( message ) {
                // if(){
                //     xmview.showDialog('请先添加要保存的数据')
                // }else{}
               console.log( message )
            //    if( message.pid == 0 || message.pid == 1 ){
               if( this.type == 'P'|| this.type == 'S' ){
                    if(this.type == 'P'){
                        message.pid=0
                    } else if( this.type == 'S'){
                        message.pid=this.$store.state.index.secPid
                    }
                    cateService.create( message ).then(( ret ) => {
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
               }else {
                    cateService.edit( message ).then(( ret ) => {
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
               }
               
            },
            //编辑
            edit( e ) {
                cateService.edit(e).then((ret) => {
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
            },
            // //添加根节点
            // addP(p){
            //     this.selectData=null
            //     this.type = 'P'

            // },
            // //添加子分类
            // addS(){
            //      this.selectData=null
            //      this.type = 'S'
            // },
            changeType(type){
                this.type = type
                if(type!="update"){
                    this.$store.dispatch('setSecMenu',null);
                }
            },
            // 单条删除
            del() {
                if( this.selectData.name != undefined ){
                     xmview.showDialog(`您将要删除<span style="color:red">${this.selectData.name}</span>区块,确认吗？`, () => {
                    cateService.delete(this.selectData.id).then(() => {
                        // store.commit('increment', 10)
                        xmview.showTip('success', '操作成功')
                    })
                })
                }else{
                     xmview.showTip('error','请您先选择区块，再执行删除操作。')
                }
            },
        
        },
    }
</script>