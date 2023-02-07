<template>
    <div class="not-found">
        <el-result title="404" sub-title="抱歉~，页面不存在">
            <template slot="icon">
                <el-empty description=" "></el-empty>
            </template>
            <template slot="extra">
                <el-button type="primary" size="medium" @click="handleBack">返回上一页</el-button>
            </template>
        </el-result>
    </div>
</template>

<script>
export default {
    methods: {
        handleBack() {
            this.$router.back()
        },
    },
}
</script>

<style lang="scss">
.not-found {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-bg;
    .el-empty__image {
        width: 300px;
    }
    .el-result__icon svg {
        width: 250px;
        height: 250px;
    }
}
</style>
