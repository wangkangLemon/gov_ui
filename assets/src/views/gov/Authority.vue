<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-card {
            margin: 10px 0;
            max-width: 700px;
        }
    }
</style>
<template>
    <main id="sys-form">
        <el-card >
            <el-form label-width="120px" ref="form" :model="fetchParam">
                <el-form-item label="人员明细">
                    <el-switch
                        v-model="fetchParam.value1"
                        on-text="开"
                        off-text="关"
                        :on-value= "onValue"
                        :off-value= "offValue"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="changemx($event,1)">
                    </el-switch>
                </el-form-item>
                <el-form-item label="学习记录明细">
                    <el-switch
                        v-model="fetchParam.value2"
                        on-text="开"
                        off-text="关"
                        :on-value="onValue"
                        :off-value="offValue"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="changemx($event,2)">
                    </el-switch>
                </el-form-item>
            </el-form>
        </el-card>
            
    </main>
</template>

<script>
    import govService from '../../services/gov/govService'
    export default {
        name: 'gov-authority',
        data() {
            return {
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                onValue:1,
                offValue:2,

            }
        },
        created() {
            xmview.setContentLoading(false);
            govService.getAuthorize().then((ret) => {
                this.fetchParam=getOriginData()
                ret.map((v,i)=>{
                    if(v.access_type==1){this.fetchParam.value1=v.visibled}
                    if(v.access_type==2){this.fetchParam.value2=v.visibled}
                })
            })
            this.loadingData=false;
        },
        methods: {
            change($event,num){
                console.log($event)
                console.log(num);
            },
            changemx($event,num){
                console.log(name,num,$event)
                let param={
                    access_type :num,
                    visibled :$event
                }
                  console.log(param)
                govService.authorize(param).then((ret) => {
                        this.$refs['form'].resetFields();
                        // this.fetchParam = {
                        //     data: [],
                        //     pindex: -1,
                        //     index: -1
                        // }
                    })
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = govService.create
                    if (this.$route.params.warrant_id) req = govService.update
                    console.log(this.fetchParam)
                    // req(this.fetchParam).then((ret) => {
                    //     this.$refs['form'].resetFields();
                    //     this.currentData = {
                    //         data: [],
                    //         pindex: -1,
                    //         index: -1
                    //     }
                    //     if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                    //     this.$router.push({'name': 'gov-warrant'})
                    // })
                })
            }
        }
    }

    function getOriginData() {
        return {
                value1:2,
                value2:2,
        }
    }

</script>