<!--<UEditor ref="ue" v-model="model.content"></UEditor>-->
<template>
    <div style="line-height: 1.4em; display: inline-block" v-loading="loading" element-loading-text="编辑器加载中...">
        <textarea :id="randomId" name="content" style="height: 400px" ></textarea>
    </div>
</template>

<script>
    export default {
        name: 'VueUEditor',
        props: {
            ueditorPath: {
                // UEditor 代码的路径
                type: String,
                default: '/vendor/ueditor/'
            },
            ueditorConfig: {
                // UEditor 配置项
                type: Object,
                default: function () {
                    return {}
                }
            },
            value: String
        },
        data () {
            return {
                // 为了避免麻烦，每个编辑器实例都用不同的 id
                randomId: 'editor_' + (Math.random() * 1e16),
                instance: null,
                // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
                scriptTagStatus: 0,
                currVal: '',
                loading: true
            }
        },
        created () {
            this.currVal = this.value
            console.log(window.UE)
            if (window.UE !== undefined) {
                // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
                this.scriptTagStatus = 2
                this.initEditor()
                this.loading = false
            } else {
                // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
                this.insertScriptTag()
            }
        },
        beforeDestroy () {
            // 组件销毁的时候，要销毁 UEditor 实例
            if (this.instance !== null && this.instance.destroy) {
                this.instance.destroy()
            }
        },
        methods: {
            insertScriptTag () {
                let editorScriptTag = document.getElementById('editorScriptTag')
                let configScriptTag = document.getElementById('configScriptTag')
                // 如果这个tag不存在，则生成相关代码tag以加载代码
                if (editorScriptTag === null) {
                    configScriptTag = document.createElement('script')
                    configScriptTag.type = 'text/javascript'
                    configScriptTag.src = this.ueditorPath + 'ueditor.config.js'
                    configScriptTag.id = 'configScriptTag'
                    editorScriptTag = document.createElement('script')
                    editorScriptTag.type = 'text/javascript'
                    editorScriptTag.src = this.ueditorPath + 'ueditor.all.js'
                    editorScriptTag.id = 'editorScriptTag'
                    let s = document.getElementsByTagName('head')[0]
                    s.appendChild(configScriptTag)
                    s.appendChild(editorScriptTag)
                }
                // 等待代码加载完成后初始化编辑器
                if (configScriptTag.loaded) {
                    this.scriptTagStatus++
                } else {
                    configScriptTag.addEventListener('load', () => {
                        this.scriptTagStatus++
                        configScriptTag.loaded = true
                        this.initEditor()
                    })
                    
                    configScriptTag.onerror = () => {
                        xmview.showTip('error', '加载编辑器失败, 请刷新重试!')
                    }
                }
                if (editorScriptTag.loaded) {
                    this.scriptTagStatus++
                } else {
                    editorScriptTag.addEventListener('load', () => {
                        this.scriptTagStatus++
                        editorScriptTag.loaded = true
                        this.initEditor()
                    })
                    editorScriptTag.onerror = () => {
                        xmview.showTip('error', '加载编辑器失败, 请刷新重试!')
                    }
                }
                this.initEditor()
            },
            initEditor () {
                // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
                console.log(this.scriptTagStatus)
                if (this.scriptTagStatus === 2 && this.instance === null) {
                    this.loading = false
                    // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
                    // 所以，我们只能在 nextTick 里面初始化 UEditor
                    this.$nextTick(() => {
                        this.instance = window.UE.getEditor(this.randomId, Object.assign({}, this.ueditorConfig, {
                            autoHeightEnabled: false,
                            initialFrameHeight: 400
                        }))
                        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                        this.instance.addListener('ready', () => {
                            this.$emit('ready', this.instance)
                            this.setContent(this.currVal || this.value)
                            // 监听文本变化
                            this.instance.addListener('contentChange', () => {
                                this.$emit('input', this.instance.getContent())
                            })
                        })
                    })
                }
            },
            // 设置文本内的信息
            setContent (val = '') {
                this.instance && this.instance.setContent(val)
            },
            // 获取文本内的信息
            getContent () {
                this.instance && this.instance.getContent()
            },
            setCurrVal (val) {
                if (val === this.currVal) return

                this.currVal = val
                this.$emit('input', val)
            }
        }
    }
</script>
