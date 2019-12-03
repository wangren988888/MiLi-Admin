<template>
    <Layout style="height: 100%" class="main">
        <Sider v-if="screenWidth>600" hide-trigger collapsible :width="256" :collapsed-width="80" v-model="collapsed"
               class="left-sider" :style="{overflow: 'hidden'}">
            <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
            <div class="logo-con">
                <img v-show="!collapsed" :src="maxLogo" class="maxLogo" key="max-logo"/>
                <img v-show="collapsed" :src="minLogo" class="minLogo" key="min-logo"/>
            </div>
            <div class="my-menu-box">
                <side-menu ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                           @on-select="turnToPage" :menu-list="menuList">
                </side-menu>
            </div>
        </Sider>
        <div class="maskBox" v-if="screenWidth<=600&&siderShow" @click="siderShow=false"></div>
        <Sider v-if="screenWidth<=600" :width="256" class="left-sider2" :class="siderShow?'show':''"
               :style="{overflow: 'hidden'}">
            <div class="logo-con">
                <img :src="maxLogo" class="maxLogo" key="max-logo"/>
            </div>
            <div class="my-menu-box">
                <side-menu ref="sideMenu" :active-name="$route.name" @on-select="turnToPage"
                           :menu-list="menuList">
                </side-menu>
            </div>
        </Sider>
        <Layout>
            <Header class="header-con" :style="immersedStatusbarStyle.headerConStyle">
                <header-bar :screenWidth="screenWidth" :collapsed="screenWidth<600?siderShow:collapsed"
                            @on-coll-change="handleCollapsedChange" @on-coll-reload="handleCollReload">
                    <fullscreen v-model="isFullscreen"/>
                    <language v-if="$config.useI18n" @on-lang-change="setLocal" :lang="local"/>
                    <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
                                 :has-read="hasReadErrorPage" :count="errorCount"></error-store>
                    <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
                </header-bar>
            </Header>
            <Content class="main-content-con">
                <div class="tag-nav-wrapper">
                    <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                </div>
                <div class="content-wrapper">
                    <keep-alive :include="cacheList">
                        <router-view ref="viewArea" />
                    </keep-alive>
                    <ABackTop :height="100" :bottom="80" :right="20" container=".content-wrapper"></ABackTop>
                </div>
            </Content>
        </Layout>
    </Layout>
</template>
<script src="./main.js"></script>
