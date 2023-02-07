<template>
    <KeepAlive :include="keepAliveList">
        <router-view></router-view>
    </KeepAlive>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ViewLayout',
    computed: {
        ...mapGetters(['keepAliveList']),
    },
}
</script>
