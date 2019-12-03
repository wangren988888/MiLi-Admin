<template>
    <div>
        <Button @click="exportData" type="primary" style="margin: 0 10px 10px 0;">导出日志记录</Button>
        <Table ref="table" :columns="columns" :data="errorList"></Table>
        <div style="text-align: center; margin-top: 16px;">
            <Page :total="total" :page-size="limit" show-sizer show-total @on-change="pageChange"
                  @on-page-size-change="sizeChange"/>
        </div>
    </div>
</template>

<script>
    import {getAdminErrorApi} from "@/api/user";
    import dayjs from 'dayjs';
    import {mapMutations} from 'vuex';

    export default {
        name: 'error_logger_page',
        data() {
            return {
                currentPage: 1,
                limit: 10,
                errorList: [],
                total: 0,
                columns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 100
                    },
                    {
                        key: 'type',
                        title: '类型',
                        width: 100,
                        render: (h, {row}) => {
                            return h('icon', {
                                props: {
                                    size: 16,
                                    type: row.type === 'ajax' ? 'md-link' : 'md-code-working'
                                }
                            }, '')
                        }
                    },
                    {
                        key: 'code',
                        title: '编码',
                        render: (h, {row}) => {
                            return h('span', {}, row.code === 0 ? '-' : row.code)
                        }
                    },
                    {
                        key: 'osInfo',
                        title: '系统信息'
                    },
                    {
                        key: 'browserInfo',
                        title: '浏览器信息'
                    },

                    {
                        key: 'mes',
                        title: '信息'
                    },
                    {
                        key: 'url',
                        title: 'URL'
                    },
                    {
                        key: 'createdAt',
                        title: '时间',
                        render: (h, {row}) => {
                            return h('span', {}, dayjs(new Date(row.createdAt).getTime()).format('YYYY-MM-DD HH:mm:ss'))
                        },
                        sortable: true,
                        sortType: 'desc'
                    }
                ]
            }
        },
        computed: {},
        methods: {
            ...mapMutations([
                'setHasReadErrorLoggerStatus'
            ]),
            exportData() {
                this.$refs.table.exportCsv({
                    filename: '错误日志.csv'
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
                getAdminErrorApi({
                    currentPage: this.currentPage,
                    limit: this.limit
                }).then(res => {
                    console.log(res);
                    this.errorList = res.data.rows;
                    this.total = res.data.count;
                })
            }
        },
        activated() {
            this.setHasReadErrorLoggerStatus()
        },
        mounted() {
            this.setHasReadErrorLoggerStatus();
            this.getData();
        }
    }
</script>

<style>

</style>
