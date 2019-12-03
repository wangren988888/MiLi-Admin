<template>
    <Modal
        class="previewModal"
        v-model="previewModal"
        :fullscreen="true"
        title="预览"
        width="60">
        <div class="orderQRCode">
            <h2 class="title">扫码通过手机预览</h2>
            <qr-code ref="previewQrcode" :config="qrCodeConfig" :text="previewUrl"></qr-code>
        </div>
        <div class="previewContent">
            <div class="mainContent">
                <div class="titleBox">
                    <div class="closeBox" @click="previewModalOk">
                        <Icon size="22" type="md-close"/>
                    </div>
                    {{previewTitle}}
                </div>
                <div class="iframeBox">
                    <iframe :src="previewUrl" frameborder="0" ref="previewIframe"></iframe>
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button @click="previewModalOk">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import qrCode from '_c/qr-code/qr-code.vue'
    import {getToken, handleFullscreen} from '@/libs/util'

    export default {
        name: 'previewModal',
        components: {
            qrCode
        },
        props: {},
        data() {
            return {
                previewTitle: '',
                previewUrl: '',
                previewModal: false,
                token: getToken(),
                qrCodeConfig: {
                    w: 150,
                    h: 150,
                    colorDark: '#000000',
                    colorLight: '#ffffff'
                }
            }
        },
        methods: {
            _showPreview(data) {
                this.previewTitle = data.previewTitle;
                this.previewUrl = data.previewUrl;
                this.$refs.previewQrcode.upDateQr(this.previewUrl);
                // let previewIframe = this.$refs['previewIframe'];
                // if (previewIframe.attachEvent) {
                //     //兼容IE7、IE8浏览器
                //     previewIframe.attachEvent('onload', () => {
                //         let iframeWin = previewIframe.contentWindow;
                //         iframeWin.postMessage({
                //             method: 'previewToken',
                //             token: getToken()
                //         }, '*')
                //     })
                // } else {
                //     previewIframe.onload = () => {
                //         let iframeWin = previewIframe.contentWindow;
                //         iframeWin.postMessage({
                //             method: 'previewToken',
                //             token: getToken()
                //         }, '*')
                //     }
                // }
                handleFullscreen(true);
                this.previewModal = true;
            },
            previewModalOk() {
                this.previewModal = false;
                this.previewUrl = '';
                setTimeout(() => {
                    handleFullscreen(false);
                }, 200)
            }
        }
    }
</script>
<style lang="less" scoped>
    .previewModal {
        .orderQRCode {
            position: absolute;
            left: 50px;
            top: 50px;

            .title {
                text-align: center;
                margin-bottom: 10px;
            }
        }

        .previewContent {
            width: 433px;
            height: 881px;
            margin: 0 auto;
            background-image: url("../../assets/images/previewPhoneBg.png");
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;

            .mainContent {
                width: 375px;
                height: 643px;
                margin: 132px auto 0;
                /*background-color: #f00;*/

                .titleBox {
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    background-color: #fff;
                    position: relative;
                    font-size: 16px;
                    font-weight: bold;
                    border-bottom: 1px solid #f5f5f5;

                    .closeBox {
                        position: absolute;
                        left: 13px;
                        top: -2px;
                    }
                }

                .iframeBox {
                    position: relative;
                    width: 100%;
                    height: calc(~'100% - 45px');

                    iframe {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
