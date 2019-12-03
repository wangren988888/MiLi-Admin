<template>
    <div class="loginView">
        <Card class="loginCard" title="Weshop-X Admin Login">
            <div m-t-10></div>
            <van-cell-group>
                <div class="myCell">
                    <van-field v-model="loginForm.userName" input-align="right" label="输入账号" type="text" size="large"/>
                </div>
                <div m-t-10></div>
                <div class="myCell">
                    <van-field v-model="loginForm.password" input-align="right" label="输入密码" type="password"
                               size="large"/>
                </div>
            </van-cell-group>
            <div class="submitBtn" m-t-10>
                <van-button round type="primary" size="large" color="#1989fa" @click="submit">登录</van-button>
            </div>
        </Card>
    </div>
</template>

<script src="./Login.js"></script>
<style lang="less" src="./Login.less" scoped></style>
<style lang="less">
    .loginView {
        .loginCard {
            .van-cell {
                background-color: unset;
            }
        }
    }
</style>
