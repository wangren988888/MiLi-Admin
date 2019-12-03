<template>
    <div class="essayList">
        <Card>
            <div slot="title">
                选择分类：
                <Select v-model="currentClassifyId" style="width:200px" @on-change="classifyChange">
                    <Option v-for="item in essayClassifyList" :value="item.id" :key="item.name">{{ item.name }}</Option>
                </Select>
            </div>
            <a href="#" slot="extra" @click.prevent="addEssay">
                <Icon type="md-add-circle"/>
                新增
            </a>
            <Table :columns="columns" :data="tableData"></Table>
            <div style="text-align: center; margin-top: 16px;">
                <Page :total="total" :page-size="limit" show-sizer show-total @on-change="pageChange"
                      @on-page-size-change="sizeChange"/>
            </div>
        </Card>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
