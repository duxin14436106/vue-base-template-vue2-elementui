<template>
    <div class="table-outer">
        <VTable :data="tableData">
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="测试"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleToDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </VTable>
    </div>
</template>

<script>
import VTable from '@/components/VTable.vue'
export default {
    components: { VTable },
    data() {
        return {
            tableData: [{}],
        }
    },
    methods: {
        handleToDetail() {
            this.$router.push({ path: '/table/list/detail' })
        },
    },
}
</script>

<style lang="scss">
.table-outer {
    width: 100%;
}
</style>
