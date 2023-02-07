<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="v-breadcrumb">
        <template v-for="v in breadcrumbList">
            <el-breadcrumb-item v-if="v.route" :key="v.id" :to="{ path: v.route }">{{
                v.name
            }}</el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="v.id">{{ v.name }}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
import { nanoid } from 'nanoid'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {}
    },
    watch: {
        $route(n) {
            this.handleGenBreadcrumb(n.path)
        },
    },
    mounted() {
        this.handleGenBreadcrumb(this.$router.currentRoute.path)
    },
    computed: {
        ...mapGetters(['breadcrumbList']),
    },
    methods: {
        ...mapActions(['setBreadcrumbList']),
        handleGenBreadcrumb(path) {
            const arr = this.$router.getRoutes()
            const pathArr = path.split('/')
            pathArr.shift()

            let curPath = ''
            const breadcrumbList = []
            while (pathArr.length > 0) {
                curPath += '/' + pathArr.shift()
                const curRoute = arr.find(item => item.path === curPath)
                if (curRoute) {
                    // 如果对应的组件是视窗组件或者是最后一个面包屑菜单，不给予跳转链接，避免vue-router重复跳转的警告
                    breadcrumbList.push({
                        id: nanoid(),
                        name: curRoute.meta.title,
                        route:
                            curRoute.components.default.name === 'ViewLayout' ||
                            pathArr.length === 0
                                ? ''
                                : curRoute.path,
                    })
                }
            }
            this.setBreadcrumbList(breadcrumbList)
        },
    },
}
</script>

<style lang="scss">
.v-breadcrumb {
    .el-breadcrumb__inner {
        color: #fff !important;
    }
    .is-link {
        text-decoration: underline !important;
    }
}
</style>
