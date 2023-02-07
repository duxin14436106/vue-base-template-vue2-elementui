<template>
    <div class="table-con">
        <el-table
            :data="data"
            style="width: 100%"
            :height="height"
            border
            :header-cell-class-name="headerCellClassName"
            :header-row-style="headerRowStyle"
            :header-cell-style="headerRowStyle"
        >
            <slot></slot>
        </el-table>
        <div v-if="showPage" class="page-con">
            <el-pagination
                :current-page="page"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="size"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'
/**
 * 提供外部访问方法
 * setPage(page) 设置当前页
 * setPageSize(pageSize) 设置当前页数量
 */

export default defineComponent({
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        height: {
            type: String,
            default: null,
        },
        total: {
            type: Number,
            default: 0,
        },
        showPage: {
            type: Boolean,
            default: true,
        },
        page: {
            type: Number,
            default: 1,
        },
        size: {
            type: Number,
            default: 10,
        },
        headerCellClassName: {
            type: [String, Function],
            default: '',
        },
    },
    setup(props, { emit }) {
        const headerRowStyle = ref({
            background: '#F5F7FA',
        })

        const page = toRef(props, 'page')
        const size = toRef(props, 'size')

        const setPage = cPage => {
            emit('update:page', cPage)
        }

        const setPageSize = cSize => {
            emit('update:size', cSize)
        }

        const handleSizeChange = val => {
            emit('update:size', val)
            emitChange()
        }

        const handleCurrentChange = val => {
            emit('update:page', val)
            emitChange()
        }

        const emitChange = () => {
            emit('change', {
                currentPage: page.value,
                pageSize: size.value,
            })
        }

        return {
            headerRowStyle,
            setPage,
            setPageSize,
            handleSizeChange,
            handleCurrentChange,
        }
    },
})
</script>

<style lang="scss">
.table-con {
    height: 100%;
    width: 100%;
    .page-con {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }
    .empty-con {
        width: 100px;
    }
}
</style>
