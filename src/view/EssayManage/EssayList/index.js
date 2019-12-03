import {getDate} from '@/libs/tools'
import {getEssayClassifyListApi, getEssayListForClassifyIdApi, delEssayApi} from '@/api/essayApis'

export default {
    name: 'essay_list',
    data() {
        return {
            essayClassifyList: [],
            total: 0,
            currentPage: 1,
            limit: 10,
            currentClassifyId: '',
            essayList: [],
            columns: [
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '副标题',
                    key: 'subTitle'
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '新建时间',
                    render: (h, params) => {
                        return h('div', {}, getDate(new Date(params.row.createdAt).getTime() / 1000, 'year'))
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return [h('Button', {
                            style: {
                                marginRight: '10px'
                            },
                            on: {
                                click: () => {
                                    const route = {
                                        name: 'new_essay',
                                        params: {
                                            id: params.row.id,
                                            classifyId: params.row.classifyId,
                                            title: params.row.title,
                                            subTitle: params.row.subTitle,
                                            content: params.row.content,
                                            author: params.row.author,
                                            isDraft: params.row.isDraft,
                                        },
                                        meta: {
                                            title: `文章编辑-${params.row.title}`
                                        }
                                    }
                                    this.$router.push(route)
                                }
                            }
                        }, '编辑'), h('Button', {
                            style: {
                                marginRight: '10px'
                            }
                        }, '预览'), h('Button', {
                            on: {
                                click: () => {
                                    delEssayApi({
                                        id: params.row.id,
                                        classifyId: params.row.classifyId
                                    }).then(res => {
                                        if (res) {
                                            this.getData();
                                            this.$Notice.success({
                                                title: '智在日常',
                                                desc: res.data.message
                                            })
                                        }
                                    })
                                }
                            }
                        }, '删除')]
                    }
                }
            ],
            tableData: []
        }
    },
    methods: {
        addEssay() {
            this.$router.push({
                name: 'new_essay',
                params: {
                    title: '新增'
                }
            })
        },
        pageChange(page) {
            console.log(page);
            this.currentPage = page;
            this.getData();
        },
        sizeChange(size) {
            this.currentPage = 1;
            this.limit = size;
            this.getData();
        },
        classifyChange() {
            this.currentPage = 1;
            this.getData();
        },
        getData() {
            getEssayListForClassifyIdApi({
                currentPage: this.currentPage,
                limit: this.limit,
                classifyId: this.currentClassifyId
            }).then(essayRes => {
                this.tableData = essayRes.data.rows;
                this.total = essayRes.data.count;
            })
        }
    },
    created() {
    },
    mounted() {
        getEssayClassifyListApi({
            currentPage: 1,
            limit: 99999
        }).then(res => {
            // console.log(res);
            this.essayClassifyList = res.data.rows;
            this.currentClassifyId = this.essayClassifyList[0].id;
            getEssayListForClassifyIdApi({
                currentPage: this.currentPage,
                limit: this.limit,
                classifyId: this.currentClassifyId
            }).then(essayRes => {
                // console.log(essayRes);
                this.tableData = essayRes.data.rows;
                this.total = essayRes.data.count;
            })
        })
    }
}
