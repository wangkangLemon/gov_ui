webpackJsonp([27],{121:function(e,t,a){a(786);var i=a(5)(a(710),a(858),null,null);e.exports=i.exports},141:function(e,t,a){"use strict";function i(e){return e?n.b(new Date(e)):e}Object.defineProperty(t,"__esModule",{value:!0});var n=a(25),o=void 0;t.default={props:{defaultStart:String,defaultEnd:String,title:String,start:{},end:{},change:Function},data:function(){return{timespan:[this.start,this.end],pickerOptionsStart:{disabledDate:function(e){return o.timespan[1]?e.getTime()-144e5>=new Date(o.timespan[1]).getTime()&&0!==n.c(e,new Date(o.timespan[0])):null}},pickerOptionsEnd:{disabledDate:function(e){return o.timespan[0]?e.getTime()<=new Date(o.timespan[0]).getTime()&&0!==n.c(e,new Date(o.timespan[0])):null}}}},watch:{start:function(e){i(this.timespan[0])!=e&&(this.timespan[0]=e,e||(this.$refs.start.$el.querySelector("input").value=""))},end:function(e){i(this.timespan[1])!=e&&(this.timespan[1]=e,e||(this.$refs.end.$el.querySelector("input").value=""))}},beforeCreate:function(){o=this},methods:{setCurrVal:function(e){var t=["changeStart","changeEnd"],a=i(this.timespan[e]);this.$emit(t[e],i(a)),this.change&&this.change()}}}},144:function(e,t,a){var i=a(5)(a(141),a(146),null,null);e.exports=i.exports},146:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("i",[e._v(e._s(e.title))]),e._v(" "),a("el-date-picker",{ref:"start",attrs:{editable:!1,clearable:"",align:"right",type:"date","default-value":e.defaultStart,"picker-options":e.pickerOptionsStart,placeholder:"开始日期"},on:{change:function(t){e.setCurrVal(0)}},model:{value:e.timespan[0],callback:function(t){var a=e.timespan;Array.isArray(a)?a.splice(0,1,t):e.timespan[0]=t},expression:"timespan[0]"}}),e._v(" "),a("el-date-picker",{ref:"end",attrs:{clearable:"",editable:!1,align:"right",type:"date","default-value":e.defaultEnd,"picker-options":e.pickerOptionsEnd,placeholder:"结束日期"},on:{change:function(t){e.setCurrVal(1)}},model:{value:e.timespan[1],callback:function(t){var a=e.timespan;Array.isArray(a)?a.splice(1,1,t):e.timespan[1]=t},expression:"timespan[1]"}})],1)},staticRenderFns:[]}},200:function(e,t,a){"use strict";(function(e){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=a(13),o=a(1),s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),r=o.a.apiHost+"/course/task",c=function(){function t(){i(this,t)}return s(t,[{key:"getCourseTaskList",value:function(e){var t=r+"/lists";return n.b(t,e).then(function(e){return e})}},{key:"submitTask",value:function(e){var t=e.title,a=void 0===t?void 0:t,i=e.image,o=void 0===i?void 0:i,s=e.description,c=void 0===s?void 0:s,l=e.course_ids,p=void 0===l?void 0:l,m=e.gov_ids,u=void 0===m?void 0:m,d=e.user_ids,A=void 0===d?void 0:d,g=e.score,f=void 0===g?0:g,k=e.type,v=void 0===k?void 0:k,h=e.stime,x=void 0===h?"":h,C=e.etime,y=void 0===C?"":C,b=e.task_type,_=e.exam_id,B=e.study_duration,D=r+"/create";return n.a(D,{title:a,image:o,description:c,course_ids:p,gov_ids:u,user_ids:A,score:f,type:v,stime:x,etime:y,task_type:b,exam_id:_,study_duration:B},!1).then(function(e){return e})}},{key:"editTask",value:function(e){var t=e.id,a=e.title,i=void 0===a?void 0:a,o=e.image,s=void 0===o?void 0:o,c=e.description,l=void 0===c?void 0:c,p=e.course_ids,m=void 0===p?void 0:p,u=e.gov_ids,d=void 0===u?void 0:u,A=e.user_ids,g=void 0===A?void 0:A,f=e.score,k=void 0===f?0:f,v=e.type,h=void 0===v?void 0:v,x=e.stime,C=void 0===x?"":x,y=e.etime,b=void 0===y?"":y,_=e.task_type,B=e.study_duration,D=r+"/edit/"+t;return n.a(D,{title:i,image:s,description:l,course_ids:m,gov_ids:d,user_ids:g,score:k,type:h,stime:C,etime:b,task_type:_,study_duration:B},!1).then(function(e){return e})}},{key:"getTask",value:function(e){var t=r+"/get/"+e;return n.b(t).then(function(e){return e})}},{key:"deleteCourseTask",value:function(e){var t=r+"/delete/"+e;return n.a(t,{})}},{key:"getCourseTaskTemplateEditDetail",value:function(e){var t=r+"/template/get/"+e;return n.b(t,{}).then(function(e){return e})}},{key:"getCourseTaskTemplateStudyCheck",value:function(e){var t=r+"/study/check";return n.b(t,e).then(function(e){return e.data})}},{key:"getCourseTaskTemplateList",value:function(e){var t=r+"/template/lists";return n.b(t,e).then(function(e){return e})}},{key:"CourseTaskTemplateUploadUrl",value:function(e){var t=e.avatar,a=e.alias,i=r+"/template/cover";return n.a(i,{avatar:t,alias:a})}},{key:"addCourseTaskTemplate",value:function(t){var a=t.category_id,i=t.title,o=t.description,s=t.image,c=t.course_ids,l=t.sort,p=t.score,m=r+"/template/create";return n.a(m,{category_id:a,title:i,description:o,image:s,course_ids:c,sort:l,score:p}).then(function(t){if(t.code)return e.reject(t)})}},{key:"updateCourseTaskTemplate",value:function(t){var a=t.id,i=t.category_id,o=t.title,s=t.description,c=t.image,l=t.course_ids,p=t.sort,m=t.score,u=r+"/template/edit/"+a;return n.a(u,{category_id:i,title:o,description:s,image:c,course_ids:l,sort:p,score:m}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteCourseTaskTemplate",value:function(e){var t=r+"/template/delete/"+e;return n.a(t,{})}},{key:"publishCourseTaskTemplate",value:function(e){var t=r+"/template/"+e+"/publish";return n.a(t,{})}},{key:"revokeCourseTaskTemplate",value:function(e){var t=r+"/template/"+e+"/revoke";return n.a(t,{})}},{key:"getCategoryTree",value:function(e){var t=e.id,a=e.type,i=e.task_type,o=e.pagesize,s=void 0===o?-1:o,c=r+"/template/category/lists";return n.b(c,{id:t,type:a,task_type:i,pagesize:s}).then(function(e){return e})}},{key:"create_cate",value:function(e){var t=(e.parent_id,e.name),a=(e.image,e.sort),i=r+"/template/category/create",o={name:t,sort:a};return n.a(i,o)}},{key:"update_cate",value:function(e){var t=e.name,a=(e.image,e.sort),i=e.id,o=r+"/template/category/edit/"+i;return n.a(o,{name:t,sort:a})}},{key:"delCategory",value:function(t){var a=t.id,i=r+"/template/category/delete/"+a;return n.a(i).then(function(t){if(t.code)return e.reject(t)})}},{key:"getCategoryImageUrl",value:function(){return r+"/template/category/image"}},{key:"moveCategory",value:function(e){var t=e.id,a=e.to,i=r+"/template/category/"+t+"/move";return n.a(i,{to:a})}},{key:"moveCategoryContent",value:function(e){var t=e.id,a=e.to,i=r+"/template/category/"+t+"/move/content";return n.a(i,{to:a})}},{key:"offline",value:function(e){var t=e.id,a=e.disabled,i=r+"/edit/"+t;return n.a(i,{disabled:a})}},{key:"online",value:function(e){var t=e.id,a=e.disabled,i=r+"/edit/"+t;return n.a(i,{disabled:a})}},{key:"getUploadUrl",value:function(e){var t=e.image,a=e.alias,i=r+"/upload";return n.a(i,{image:t,alias:a}).then(function(e){return e.data})}},{key:"getTaskStat",value:function(e){var t=e.type,a=e.title,i=e.page,o=e.pagesize,s=r+"/stat/lists";return n.b(s,{type:t,title:a,page:i,pagesize:o}).then(function(e){return e})}},{key:"getTaskStatDetail",value:function(e){var t=e.id,a=e.page,i=e.pagesize,o=e.name,s=e.status,c=r+"/stat/"+t+"/user";return n.b(c,{page:a,pagesize:i,name:o,status:s}).then(function(e){return e})}}]),t}();t.a=new c}).call(t,a(3))},710:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(144),n=a.n(i),o=a(200),s=a(26),r=a(718);t.default={filters:{fillImgPath:s.fillImgPath},components:{DateRange:n.a},data:function(){return{TYPE:["","课程","考试","学习"],currCategoryName:"",loading:!1,fetchParam:{title:"",category_id:"",stime:"",etime:"",type:void 0,status:void 0,deleted:-1},itemName:"",coursetasktemplateData:[],total:0,currentPage:1,pagesize:15,task:{loading:!1,dataList:[],total:0,fetchParam:{status:"",type:"",title:"",page:1,pagesize:15}},temp:{type:"",count:0,name:"",listDialog:!1,total:0,loading:!1,dataList:[],fetchParam:{category_id:"",title:"",deleted:-1,status:-1,page:1,pagesize:6,task_type:""},courseList:null},category_list:[]}},activated:function(){this.getCategory(),this.getTempData().then(function(){xmview.setContentLoading(!1)})},watch:{"fetchParam.task_type":function(){this.getCategory()}},methods:{selectCate:function(){this.getTempData(),this.getCategory(this.temp.fetchParam.task_type)},use:function(e){this.$router.push({name:"server-manage-add",params:{taskInfo:e,type:"template",add:1,taskType:e.task_type},query:{id:e.id}})},getCategory:function(e){var t=this;e||(e=-1),o.a.getCategoryTree({id:"",type:this.temp.fetchParam.task_type,task_type:e,pagesize:-1}).then(function(e){t.category_list=e.data})},querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},handleClick:function(e){"temp"===e.name&&this.getTempData(),"list"===e.name&&this.getTaskData()},getTaskData:function(){var e=this;this.task.loading=!0;var t=r.a(this.task.fetchParam);return t.status=""===t.status?-1:t.status,o.a.getCourseTaskList(t).then(function(t){e.task.dataList=t.data,e.task.total=t.total,e.task.loading=!1})},getTempData:function(){var e=this;return this.temp.loading=!0,o.a.getCourseTaskTemplateList(this.temp.fetchParam).then(function(t){e.temp.dataList=t.data,e.temp.total=t._exts.total,e.temp.loading=!1})},templateViewFn:function(e){var t=this;this.temp.listDialog=!0,o.a.getCourseTaskTemplateEditDetail(e.id).then(function(a){1==e.task_type||3==e.task_type?(t.temp.count=a.data.courses.length,t.temp.name=t.TYPE[e.task_type],t.temp.courseList=a.data.courses):(t.temp.count=a.data.exam.categorys.length,t.temp.name="考试",t.temp.courseList=a.data.exam.categorys)})},dealStatus:function(e){var t=this,a=void 0,i="";1!=e.status?(a=o.a.revokeCourseTask,i="下线"):(a=o.a.publishCourseTask,i="上线"),xmview.showDialog("确定要执行"+i+"吗",function(){a({id:e.id}).then(function(){xmview.showTip("success","操作成功"),t.getTaskData()})})},timingDialogFn:function(e){this.timingDialog=!0,this.timingDialogSubmit=function(t){return o.a.timingPublish({id:e.id,start_time:t}).then(function(){e.status=2,e.start_time=t,xmview.showTip("success","操作成功")})}},deleteTask:function(e){var t=this;xmview.showDialog('确定要删除<span style="color:red;">'+e.title+"</span>",function(){o.a.deleteCourseTask({id:e.id}).then(function(){xmview.showTip("success","操作成功"),t.getTaskData()})})}}}},718:function(e,t,a){"use strict";function i(e){return null==e?String(e):{}.toString.call(e).slice(8,-1).toLowerCase()}function n(e){switch(i(e)){case"object":var t={};for(var a in e)t[a]=n(e[a]);return t;case"array":return e.map(n);default:return e}}t.a=n},741:function(e,t,a){t=e.exports=a(82)(!0),t.push([e.i,'.course-task-template-index .search>section{margin-left:10px;margin-bottom:14px;display:inline-block;margin-right:10px}.course-task-template-index .search>section>span,.course-task-template-index .search>section i{margin-right:2px}.course-task-template-index .search>section>*{vertical-align:middle;display:inline-block}.course-task-template-index .search .el-input{width:auto}.keyword-container{width:90%;margin-left:5%;margin-bottom:5px}.course-task-template-index{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}.course-task-template-index:after{content:"";clear:both;display:block}.course-task-template-index .pagin{float:right;margin-top:15px}.course-task-template-index .bottom-manage{margin-top:15px}.course-task-template-index .manage-container{position:absolute;right:0;top:-50px}.course-task-template-index .header-button.manage-container>.el-button i{margin-right:5px}.course-task-template-index .header-button.manage-container>.el-button i:before{position:relative;top:-1px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}.course-task-template-index .block{text-align:right;margin-top:10px}.course-task-template-index .temp-container{width:100%}.course-task-template-index .temp-container .temp-item{width:310px;margin-bottom:10px;margin-right:3%;position:relative;vertical-align:top;display:inline-block;border:1px solid #ededed;-ms-flex-preferred-size:30%;flex-basis:30%;height:310px;font-size:14px}.course-task-template-index .temp-container .temp-item .corner{position:absolute;right:0;width:0;height:0;border-left:70px solid transparent}.course-task-template-index .temp-container .temp-item .exam{border-top:70px solid #ff7042}.course-task-template-index .temp-container .temp-item .course{border-top:70px solid #4677d1}.course-task-template-index .temp-container .temp-item .learn{border-top:70px solid #46d169}.course-task-template-index .temp-container .temp-item .mark{position:absolute;top:11px;right:6px;color:#fff;font:normal 700 16px Microsoft YaHei;transform:rotate(45deg)}.course-task-template-index .temp-container .temp-item .content{height:210px;padding:10px 15px}.course-task-template-index .temp-container .temp-item .content h2{font-size:16px;padding-bottom:10px}.course-task-template-index .temp-container .temp-item .content img{width:100%}.course-task-template-index .temp-container .temp-item .content .study{height:16px}.course-task-template-index .temp-container .temp-item .content .study .fr{font-size:12px;color:#20a0ff;float:right}.course-task-template-index .temp-container .temp-item .content .study .fr i{color:red}.course-task-template-index .temp-container .temp-item .content .des{height:25px;line-height:25px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.course-task-template-index .temp-container .temp-item .bottom{position:absolute;bottom:0;background:#eee;left:0;width:100%;display:-ms-flexbox;display:flex}.course-task-template-index .temp-container .temp-item .bottom>div{margin-top:5px;margin-bottom:5px;text-align-last:center;text-align:center;width:50%}.course-task-template-index .temp-container .temp-item .bottom>div:first-of-type{border-right:1px solid #ddd}.course-task-template-index .el-dialog__body{padding:0 20px 20px}.course-task-template-index .course-section h3{padding:18px 20px;border-bottom:1px solid #ebeef5;box-sizing:border-box}.course-task-template-index .course-section ol{padding:18px 35px}',"",{version:3,sources:["/Users/zhaoyicheng/Documents/Code/yxt/PC-old/gov_ui/assets/src/views/server/courseTask/CoursetaskTemplate.vue"],names:[],mappings:"AACA,4CAA4C,iBAAiB,mBAAmB,qBAAqB,iBAAiB,CACrH,AACD,+FAA+F,gBAAgB,CAC9G,AACD,8CAA8C,sBAAsB,oBAAoB,CACvF,AACD,8CAA8C,UAAU,CACvD,AACD,mBAAmB,UAAU,eAAe,iBAAiB,CAC5D,AACD,4BAA4B,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CACpH,AACD,kCAAkC,WAAW,WAAW,aAAa,CACpE,AACD,mCAAmC,YAAY,eAAe,CAC7D,AACD,2CAA2C,eAAe,CACzD,AACD,8CAA8C,kBAAkB,QAAQ,SAAS,CAChF,AACD,yEAAyE,gBAAgB,CACxF,AACD,gFAAgF,kBAAkB,QAAQ,CACzG,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,mCAAmC,iBAAiB,eAAe,CAClE,AACD,4CAA4C,UAAU,CACrD,AACD,uDAAuD,YAAY,mBAAmB,gBAAgB,kBAAkB,mBAAmB,qBAAqB,yBAAyB,4BAA4B,eAAe,aAAa,cAAc,CAC9P,AACD,+DAA+D,kBAAkB,QAAQ,QAAQ,SAAS,kCAAkC,CAC3I,AACD,6DAA6D,6BAA6B,CACzF,AACD,+DAA+D,6BAA6B,CAC3F,AACD,8DAA8D,6BAA6B,CAC1F,AACD,6DAA6D,kBAAkB,SAAS,UAAU,WAAW,qCAAwC,uBAAuB,CAC3K,AACD,gEAAgE,aAAa,iBAAiB,CAC7F,AACD,mEAAmE,eAAe,mBAAmB,CACpG,AACD,oEAAoE,UAAU,CAC7E,AACD,uEAAuE,WAAW,CACjF,AACD,2EAA2E,eAAe,cAAc,WAAW,CAClH,AACD,6EAA6E,SAAS,CACrF,AACD,qEAAqE,YAAY,iBAAiB,mBAAmB,gBAAgB,sBAAsB,CAC1J,AACD,+DAA+D,kBAAkB,SAAS,gBAAgB,OAAO,WAAW,oBAAoB,YAAY,CAC3J,AACD,mEAAmE,eAAe,kBAAkB,uBAAuB,kBAAkB,SAAS,CACrJ,AACD,iFAAiF,2BAA2B,CAC3G,AACD,6CAA6C,mBAAmB,CAC/D,AACD,+CAA+C,kBAAkB,gCAAgC,qBAAqB,CACrH,AACD,+CAA+C,iBAAiB,CAC/D",file:"CoursetaskTemplate.vue",sourcesContent:["\n.course-task-template-index .search>section{margin-left:10px;margin-bottom:14px;display:inline-block;margin-right:10px\n}\n.course-task-template-index .search>section>span,.course-task-template-index .search>section i{margin-right:2px\n}\n.course-task-template-index .search>section>*{vertical-align:middle;display:inline-block\n}\n.course-task-template-index .search .el-input{width:auto\n}\n.keyword-container{width:90%;margin-left:5%;margin-bottom:5px\n}\n.course-task-template-index{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n.course-task-template-index:after{content:'';clear:both;display:block\n}\n.course-task-template-index .pagin{float:right;margin-top:15px\n}\n.course-task-template-index .bottom-manage{margin-top:15px\n}\n.course-task-template-index .manage-container{position:absolute;right:0;top:-50px\n}\n.course-task-template-index .header-button.manage-container>.el-button i{margin-right:5px\n}\n.course-task-template-index .header-button.manage-container>.el-button i:before{position:relative;top:-1px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n.course-task-template-index .block{text-align:right;margin-top:10px\n}\n.course-task-template-index .temp-container{width:100%\n}\n.course-task-template-index .temp-container .temp-item{width:310px;margin-bottom:10px;margin-right:3%;position:relative;vertical-align:top;display:inline-block;border:1px solid #ededed;-ms-flex-preferred-size:30%;flex-basis:30%;height:310px;font-size:14px\n}\n.course-task-template-index .temp-container .temp-item .corner{position:absolute;right:0;width:0;height:0;border-left:70px solid transparent\n}\n.course-task-template-index .temp-container .temp-item .exam{border-top:70px solid #FF7042\n}\n.course-task-template-index .temp-container .temp-item .course{border-top:70px solid #4677D1\n}\n.course-task-template-index .temp-container .temp-item .learn{border-top:70px solid #46d169\n}\n.course-task-template-index .temp-container .temp-item .mark{position:absolute;top:11px;right:6px;color:#fff;font:normal bold 16px \"Microsoft YaHei\";transform:rotate(45deg)\n}\n.course-task-template-index .temp-container .temp-item .content{height:210px;padding:10px 15px\n}\n.course-task-template-index .temp-container .temp-item .content h2{font-size:16px;padding-bottom:10px\n}\n.course-task-template-index .temp-container .temp-item .content img{width:100%\n}\n.course-task-template-index .temp-container .temp-item .content .study{height:16px\n}\n.course-task-template-index .temp-container .temp-item .content .study .fr{font-size:12px;color:#20a0ff;float:right\n}\n.course-task-template-index .temp-container .temp-item .content .study .fr i{color:red\n}\n.course-task-template-index .temp-container .temp-item .content .des{height:25px;line-height:25px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\n}\n.course-task-template-index .temp-container .temp-item .bottom{position:absolute;bottom:0;background:#eee;left:0;width:100%;display:-ms-flexbox;display:flex\n}\n.course-task-template-index .temp-container .temp-item .bottom>div{margin-top:5px;margin-bottom:5px;text-align-last:center;text-align:center;width:50%\n}\n.course-task-template-index .temp-container .temp-item .bottom>div:first-of-type{border-right:1px solid #ddd\n}\n.course-task-template-index .el-dialog__body{padding:0 20px 20px\n}\n.course-task-template-index .course-section h3{padding:18px 20px;border-bottom:1px solid #ebeef5;box-sizing:border-box\n}\n.course-task-template-index .course-section ol{padding:18px 35px\n}\n"],sourceRoot:""}])},786:function(e,t,a){var i=a(741);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(83)("24074b08",i,!0)},858:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("article",{staticClass:"course-task-template-index"},[a("section",{staticClass:"search"},[a("section",[a("i",[e._v("标题搜索")]),e._v(" "),a("el-input",{nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.getTempData(t)}},model:{value:e.temp.fetchParam.title,callback:function(t){e.temp.fetchParam.title=t},expression:"temp.fetchParam.title"}})],1),e._v(" "),a("section",[a("i",[e._v("栏目类型")]),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"未选择"},on:{change:e.selectCate},model:{value:e.temp.fetchParam.task_type,callback:function(t){e.temp.fetchParam.task_type=t},expression:"temp.fetchParam.task_type"}},[a("el-option",{attrs:{label:"课程任务",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"试题任务",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"学习任务",value:"3"}})],1)],1),e._v(" "),a("section",[a("i",[e._v("类别")]),e._v(" "),a("el-select",{staticClass:"select",attrs:{clearable:"",placeholder:"请选择类别","fetch-suggestions":e.querySearch},on:{change:e.getTempData},model:{value:e.temp.fetchParam.category_id,callback:function(t){e.temp.fetchParam.category_id=t},expression:"temp.fetchParam.category_id"}},e._l(e.category_list,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)]),e._v(" "),a("article",{directives:[{name:"loading",rawName:"v-loading",value:e.temp.loading,expression:"temp.loading"}],staticClass:"temp-container"},e._l(e.temp.dataList,function(t){return a("section",{key:t.id,staticClass:"temp-item"},[1==t.task_type?a("div",{staticClass:"corner course"}):2==t.task_type?a("div",{staticClass:"corner exam"}):3==t.task_type?a("div",{staticClass:"corner learn"}):e._e(),e._v(" "),a("div",{staticClass:"mark"},[e._v(e._s(e.TYPE[t.task_type]))]),e._v(" "),a("div",{staticClass:"content"},[a("h2",[e._v(e._s(t.title))]),e._v(" "),a("img",{attrs:{src:e._f("fillImgPath")(t.image),alt:t.image}}),e._v(" "),a("div",{staticClass:"study"},[1==t.task_type?a("span",{staticClass:"fr"},[e._v("课时 "),a("i",[e._v(e._s(Math.floor(t.study_duration/60)))]),e._v(" 分钟")]):e._e()]),e._v(" "),a("div",{staticClass:"des"},[e._v(e._s(t.description))])]),e._v(" "),a("div",{staticClass:"bottom"},[a("div",[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.templateViewFn(t)}}},[e._v(e._s(e.TYPE[t.task_type])+"列表")])],1),e._v(" "),a("div",[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.use(t)}}},[e._v("使用")])],1)]),e._v(" "),a("br")])})),e._v(" "),a("section",{staticClass:"block"},[a("el-pagination",{staticClass:"block",attrs:{"current-page":e.temp.fetchParam.page,"page-size":e.temp.fetchParam.pagesize,"page-sizes":[6,15,30,60,100],layout:"sizes,total, prev, pager, next",total:e.temp.total},on:{"size-change":function(t){e.temp.fetchParam.pagesize=t,e.getTempData()},"current-change":function(t){e.temp.fetchParam.page=t,e.getTempData()}}})],1),e._v(" "),a("el-dialog",{staticClass:"course-list",attrs:{"custom-class":"custom-el-dialog",title:e.temp.name+"列表",visible:e.temp.listDialog},on:{"update:visible":function(t){e.temp.listDialog=t}}},[null!==e.temp.courseList?a("section",{staticClass:"course-section"},[a("div",{staticClass:"list-item"},[e.temp.count?[a("h3",{staticClass:"list-title"},[e._v("此任务共包含"+e._s(e.temp.count)+"项"+e._s(e.temp.name)+"：")]),e._v(" "),"课程"==e.temp.name||"学习"==e.temp.name?a("ol",e._l(e.temp.courseList,function(t,i){return e.temp.type!==t.type&&t.type?e._e():a("li",{key:i},[e._v(e._s(t.course_name))])})):e._e(),e._v(" "),"考试"==e.temp.name?a("ol",e._l(e.temp.courseList,function(t,i){return e.temp.type!==t.type&&t.type?e._e():a("li",{key:i},[e._v(e._s(t.name))])})):e._e()]:e._e()],2)]):e._e()])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=27.0b338e06b8d22e8efe11.js.map