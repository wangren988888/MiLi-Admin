<template>
    <div class="myScroll" :style="myScrollStyle">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'


    export default {
        name: 'MyScroll',
        data() {
            return {
                myScrollStyle: {
                    width: '100%',
                    height: 0
                },
                bs: null
            }
        },
        mounted() {
            this.myScrollStyle = {
                width: '100%',
                height: document.getElementsByClassName('myScroll')[0].parentNode.offsetHeight + 'px'
            }
            setTimeout(() => {
                this.bs = new BScroll('.myScroll', {
                    scrollY: true,
                    click: true
                })
            }, 100)
        },
        methods: {
            refresh() {
                this.bs.refresh();
            }
        }
    }
</script>
