import {
    getEssayClassifyListApi,
    createdEssayApi,
    updateEssayApi
} from '@/api/essayApis'

import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
import { mapMutations } from 'vuex'

export default {
    name: 'new_essay',
    components: {
        // UE
    },
    data () {
        return {
            formObj: {
                id: '',
                classifyId: '',
                title: '',
                subTitle: '',
                author: '',
                content: '',
                isDraft: 0
            },
            submitLoading: false,
            ifUpdata: false,
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                // serverUrl: 'http://35.201.165.105:8000/controller.php',
                serverUrl: baseUrl + 'editor/controller',

                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: process.env.NODE_ENV === 'development' ? '/UEditor/' : '/my-admin/UEditor/'
            },
            essayClassifyList: [],
        }
    },
    watch: {
        '$route' () {
            if (this.$route.params.id) {
                this.ifUpdata = true
                this.formObj = this.$route.params
            }
        }
    },
    created () {
        if (this.$route.params.id) {
            this.ifUpdata = true
            this.formObj = this.$route.params
        }
    },
    mounted () {
        this.$nextTick(() => {
            getEssayClassifyListApi({
                currentPage: 1,
                limit: 99999
            }).then(res => {
                console.log(res)
                this.essayClassifyList = res.data.rows
                this.formObj.classifyId = this.essayClassifyList[0].id
            })
        })
    },
    methods: {
        ...mapMutations([
            'closeTag'
        ]),
        close (params) {
            this.closeTag({
                name: 'new_essay',
                params: params
            })
        },
        submit () {
            this.submitLoading = true
            if (this.ifUpdata === true) {
                updateEssayApi(this.formObj).then(res => {
                    console.log(res)
                    this.submitLoading = false
                    this.formObj = {
                        id: '',
                        classifyId: '',
                        title: '',
                        subTitle: '',
                        author: '',
                        content: '',
                        isDraft: 0
                    }
                })
            } else {
                createdEssayApi(this.formObj).then(res => {
                    console.log(res)
                    this.submitLoading = false
                    this.$Notice.success({
                        title: '智在日常',
                        desc: res.data.message,
                        onClose: () => {
                            this.close({
                                title: '新增'
                            })
                            this.formObj = {
                                id: '',
                                classifyId: '',
                                title: '',
                                subTitle: '',
                                author: '',
                                content: '',
                                isDraft: 0
                            }
                        }
                    })
                })
            }
        }
    }
}
