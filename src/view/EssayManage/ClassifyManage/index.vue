<template>
    <div class="classifyManage">

        <Card>
            <p slot="title">
                分类列表
            </p>
            <Row>
                <Col span="16">
                    <Table :columns="columns" :data="tableData"></Table>
                    <div style="text-align: center; margin-top: 16px;">
                        <Page :total="total" :page-size="limit" show-sizer show-total @on-change="pageChange"
                              @on-page-size-change="sizeChange"/>
                    </div>
                </Col>
                <Col span="8">
                    <Form :model="classifyModel" :label-width="80">
                        <FormItem label="分类名">
                            <Input v-model="classifyModel.classifyName" placeholder="请输入分类名"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="submit">确定新建</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>

        </Card>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
