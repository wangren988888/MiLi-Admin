<template>
    <div class="header-bar">
        <sider-trigger :screenWidth="screenWidth" :collapsed="collapsed" @on-change="handleCollpasedChange"
                       @on-reload="handleReload"></sider-trigger>
        <custom-bread-crumb show-icon style="margin-left: 30px;" :screenWidth="screenWidth"
                            :list="breadCrumbList"></custom-bread-crumb>
        <div class="custom-content-con">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import siderTrigger from './sider-trigger'
    import customBreadCrumb from './custom-bread-crumb'
    import './header-bar.less'

    export default {
        name: 'HeaderBar',
        components: {
            siderTrigger,
            customBreadCrumb
        },
        props: {
            collapsed: Boolean,
            screenWidth: Number
        },
        computed: {
            breadCrumbList() {
                return this.$store.state.app.breadCrumbList
            }
        },
        methods: {
            handleCollpasedChange(state) {
                this.$emit('on-coll-change', state)
            },
            handleReload() {
                this.$emit('on-coll-reload')
            }
        }
    }
</script>
