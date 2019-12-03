<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
            <Select v-model="form.userName" prefix="ios-person" placeholder="请选择可登录用户">
                <Option v-for="item in terminalUsers" :value="item._id" :key="item._id">{{ item.login }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit" type="primary" long>登录</Button>
        </FormItem>
    </Form>
</template>
<script>

    import {mapGetters} from 'vuex'

    export default {
        name: 'LoginForm',
        props: {
            userNameRules: {
                type: Array,
                default: () => {
                    return [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ]
                }
            },
            passwordRules: {
                type: Array,
                default: () => {
                    return [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        data() {
            return {
                userList: [],
                form: {
                    userName: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapGetters([
                'terminalUsers'
            ]),
            rules() {
                return {
                    userName: this.userNameRules,
                    password: this.passwordRules
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$emit('on-success-valid', {
                            userName: this.form.userName,
                            password: this.form.password
                        })
                    }
                })
            }
        }
    }
</script>
