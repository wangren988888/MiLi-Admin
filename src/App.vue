<template>
    <div id="app">
        <router-view v-if="toggleFlag"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide() { // 在app组件这提供一个方法
            return {
                i18nReload: this.i18nReload
            }
        },
        data() {
            return {
                toggleFlag: true
            }
        },
        methods: {
            i18nReload() {
                this.toggleFlag = false
                //等v-if重载渲染后再把值赋值回来重新再渲染【关了界面再开。大家如果有更好的方法欢迎留言讨论】
                this.$nextTick(function () {
                    this.toggleFlag = true
                })
            }
        }
    }
</script>

<style lang="less">
    .size {
        width: 100%;
        height: 100%;
    }

    html, body {
        .size;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #app {
        .size;
    }
</style>
