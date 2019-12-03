import {getDate} from '@/libs/tools'
import {getEssayClassifyListApi, createdEssayClassifyApi} from '@/api/essayApis'

export default {
    name: 'classify_manage',
    data() {
        return {
            columns: [
                {
                    title: '分类名',
                    key: 'name'
                },
                {
                    title: '文章数',
                    key: 'essayNumber'
                },
                {
                    title: '新建时间',
                    render: (h, params) => {
                        return h('div', {}, getDate(new Date(params.row.createdAt).getTime() / 1000, 'year'))
                    }
                }
            ],
            tableData: [],
            currentPage: 1,
            limit: 10,
            total: 0,
            classifyModel: {
                classifyName: ''
            }
        }
    },
    methods: {
        submit() {
            createdEssayClassifyApi(this.classifyModel).then(res => {
                console.log(res);
                if (!res) return;
                this.getData();
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
        getData() {
            getEssayClassifyListApi({
                currentPage: this.currentPage,
                limit: this.limit
            }).then(res => {
                console.log(res);
                this.total = res.data.count;
                this.tableData = res.data.rows;
            })
        }
    },
    created() {
    },
    mounted() {
        this.getData();
    }
}
