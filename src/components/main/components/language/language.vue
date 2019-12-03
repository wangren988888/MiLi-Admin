<template>
    <a class="sider-trigger-a">
        <Dropdown trigger="click" @on-click="selectLang">
            <Icon :size="20" custom="iconfont icon-yuyan"/>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(value, key) in localList" :name="key" :key="`lang-${key}`">{{ value }}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </a>
</template>

<script>
    export default {
        name: 'Language',
        props: {
            lang: String
        },
        data() {
            return {
                langList: {
                    'zh-CN': '语言',
                    'fr-FR': 'language',
                    'en-US': 'Lang'
                },
                localList: {
                    'zh-CN': '中文简体',
                    'fr-FR': 'French',
                    'en-US': 'English'
                }
            }
        },
        watch: {
            lang(lang) {
                this.$i18n.locale = lang
            }
        },
        computed: {
            // title () {
            //   return this.langList[this.lang]
            // }
        },
        methods: {
            selectLang(name) {
                this.$VantLocal(name)
                this.$emit('on-lang-change', name)
            }
        }
    }
</script>
