<template>
    <div ref="qrcode" style="text-align:center;"></div>
</template>

<script>
    import QRCode from 'qrcodejs2';

    export default {
        data(){
            return {
                qrcode: null
            };
        },
        props: ['config', 'text'],
        mounted(){
        },
        methods: {
            upDateQr(text){
                if (this.qrcode != null) {
                    this.$refs.qrcode.innerHTML = '';
                }
                let config = this.config;
                this.qrcode = new QRCode(this.$refs.qrcode, {
                    text: text,
                    width: config.w,
                    height: config.h,
                    colorDark: config.colorDark,
                    colorLight: config.colorLight,
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
        }
    };
</script>

<style>
</style>
