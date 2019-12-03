<template>
    <Row class="new_essay">
        <Col span="22">
            <Card>
                <p slot="title">{{ifUpdata===true?'编辑文章':'新建文章'}}</p>
                <Form :label-width="80">
                    <FormItem label="文章标题">
                        <Input type="text" size="large" v-model="formObj.title" placeholder="请输入文章标题">
                            <Icon type="ios-albums-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem label="文章描述">
                        <Input type="text" size="large" v-model="formObj.subTitle" placeholder="请输入文章副标题">
                            <Icon type="ios-albums-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem label="作者">
                        <Input type="text" size="large" v-model="formObj.author" placeholder="请输入文章副标题">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem class="ueditorItem" label="文章内容">
                        <vue-ueditor-wrap v-model="formObj.content" :config="myConfig"></vue-ueditor-wrap>
                    </FormItem>
                    <FormItem label="文章分类">
                        <Select v-model="formObj.classifyId" style="width:200px">
                            <Option v-for="item in essayClassifyList" :value="item.id" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="存草稿箱">
                        <i-switch v-model="formObj.isDraft" :true-value="1" :false-value="0" size="large"
                                  style="margin-right: 10px;">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                    <FormItem>
                        <Button :loading="submitLoading" size="large" type="primary" @click="submit">
                            {{formObj.isDraft===0?'确定发布':'保存到草稿箱'}}
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
    </Row>
</template>

<script src="./index.js"></script>
<style lang="less">
    .new_essay {
        .ueditorItem {
            .ivu-form-item-content {
                line-height: unset;
            }
        }

        .ivu-select-dropdown {
            z-index: 1000;
        }
    }
</style>
