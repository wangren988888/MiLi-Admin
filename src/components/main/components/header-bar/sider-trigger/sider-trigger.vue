<template>
    <div class="funBtnBox">
        <div v-if="screenWidth<=600" class="sider-trigger-a"><img :src="minLogo" key="min-logo"/></div>
        <a @click="handleChange" type="text" class="sider-trigger-a">
            <Icon v-if="screenWidth>600" :custom="collapsed?'iconfont icon-fold1':'iconfont icon-fold'" :size="size"/>
            <Icon v-if="screenWidth<=600" :custom="collapsed?'iconfont icon-fold':'iconfont icon-fold1'" :size="size"/>
        </a>
        <a @click="reload" type="text" class="sider-trigger-a">
            <Icon custom="iconfont icon-icon_refresh" :size="size"/>
        </a>
    </div>
</template>
<script>
    import minLogo from '@/assets/images/minlogo.png'

    export default {
        name: 'siderTrigger',
        props: {
            collapsed: Boolean,
            screenWidth: Number,
            size: {
                type: Number,
                default: 20
            }
        },
        data() {
            return {
                minLogo
            }
        },
        methods: {
            handleChange() {
                this.$emit('on-change', !this.collapsed)
            },
            reload() {
                this.$emit('on-reload')
            }
        }
    }
</script>
<style lang="less">
    @import './sider-trigger.less';
</style>
