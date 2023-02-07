<template>
    <div class="layout__page">
        <div class="layout__side" :class="{ 'layout__side--collapse': isCollapse }">
            <div class="system-info">
                <div class="logo-con">
                    <img class="icon-logo" src="../assets/img/logo.png" alt="系统logo" />
                </div>
                <div class="system-name" :class="{ 'system-name--collapse': isCollapse }">
                    {{ appName }} <span>{{ appVersion }}</span>
                </div>
            </div>
            <div class="side-scroll">
                <VueScroll>
                    <Sidebar></Sidebar>
                </VueScroll>
            </div>
        </div>
        <div class="layout__content" :class="{ 'layout__content--collapse': isCollapse }">
            <div class="layout__header">
                <VHeader></VHeader>
            </div>
            <div class="layout__view">
                <div class="layout__view-inner">
                    <VueScroll>
                        <div class="scroll-inner" :class="{ 'scroll-inner--collapse': isCollapse }">
                            <router-view></router-view>
                        </div>
                    </VueScroll>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from './component/Sidebar.vue'
import VHeader from './component/VHeader.vue'
export default {
    components: { VHeader, Sidebar },
    computed: {
        ...mapGetters(['isCollapse', 'keepAliveList', 'appVersion', 'appName']),
    },
}
</script>

<style lang="scss">
.list-co {
    height: 10000px;
}
body {
}
$prefix: layout__;
.#{$prefix}page {
    width: 100%;
    height: 100%;
    display: flex;

    .#{$prefix}side {
        background-color: $side-bg-color;
        width: $side-full-width;
        flex-shrink: 0;
        transition: all 0.5s;
        .system-info {
            height: $header-height;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .logo-con {
                width: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                .icon-logo {
                    width: 40px;
                    display: block;
                }
            }
            .system-name {
                color: #fff;
                font-size: 16px;
                width: 205px;
                overflow: hidden;
                white-space: nowrap;
                transition: all 0.5s;
            }
            .system-name--collapse {
                width: 0px;
            }
        }
        .side-scroll {
            height: $side-scroll-height;
        }
    }
    .#{$prefix}side--collapse {
        width: $side-collapse-width;
    }
    .#{$prefix}content {
        background-color: $header-bg-color;
        width: $content-full-width;
        transition: all 0.5s;
        .#{$prefix}header {
            padding: $header-padding;
            height: $header-height;
            background-color: $header-bg-color;
        }
        .#{$prefix}view {
            border-radius: $content-border-radius;
            background-color: $content-bg-color;
            height: $content-height;
            padding: $content-padding;
            .#{$prefix}view-inner {
                background-color: #fff;
                height: 100%;
                width: 100%;
                overflow: auto;
            }
        }
    }
    .#{$prefix}content--collapse {
        width: $content-collapse-width;
    }
    .scroll-inner {
        padding: $view-padding;
        width: $scroll-full-width;
        transition: all 0.5s;
        min-width: $scroll-min-width;
        min-height: $scroll-min-height;
    }
    .scroll-inner--collapse {
        width: $scroll-collapse-width;
    }
}
</style>
