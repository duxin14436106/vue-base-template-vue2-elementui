<template>
    <MenuItem :route="routesInfo"></MenuItem>
</template>

<script>
import MenuItem from './MenuItem.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        MenuItem,
    },
    data() {
        return {
            routesInfo: [
                {
                    id: '1475734975023190017',
                    icon: 'el-icon-s-home',
                    name: '首页',
                    routeUrl: '/home',
                    children: [],
                },
                {
                    id: '1475734975023190018',
                    icon: 'el-icon-s-home',
                    name: '表格',
                    routeUrl: '/table',
                    children: [
                        {
                            id: '1475734975023190020',
                            icon: 'el-icon-s-home',
                            name: '列表',
                            routeUrl: '/table/list',
                            children: [],
                        },
                        {
                            id: '1475734975023190021',
                            icon: 'el-icon-s-home',
                            name: '列表',
                            routeUrl: '/table/list1',
                            children: [],
                        },
                    ],
                },
                {
                    id: '1475734975023190019',
                    icon: 'el-icon-s-home',
                    name: '首页',
                    routeUrl: '/home1',
                    children: [],
                },
            ],
        }
    },
    computed: {
        ...mapGetters(['isCollapse']),
    },
}
</script>
