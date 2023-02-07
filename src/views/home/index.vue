<template>
    <div class="bg">
        <div class="home-content">
            <img src="../../assets/img/logo.png" alt="" />
            <span
                >{{ appName }}<i>{{ appVersion }}</i></span
            >
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['appVersion', 'appName']),
    },
}
</script>

<style lang="scss">
.bg {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: inherit;
    .home-content {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        span {
            font-size: 32px;
            color: #666;
            i {
                font-style: normal;
                font-size: 18px;
            }
        }
    }
}
</style>
