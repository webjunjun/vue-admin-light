<template>
    <div class="base-table">
        <el-table
            border
            tooltip-effect="dark"
            :data="tableData"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            style="width: 100%">
            <el-table-column
                v-if="isMultiCheck"
                type="selection"
                :selectable="checkSelectable"
                width="55"
                fixed="left">
            </el-table-column>
            <el-table-column v-for="(colItem, colIndex) in columns" :key="colIndex"
                :prop="colItem.prop"
                :label="colItem.label"
                :width="colItem.width ? colItem.width : ''"
                :show-overflow-tooltip="colItem.isTip ? colItem.isTip : false"
                :fixed="colItem.fixed">
                <template slot-scope="scope">
                    <template v-if="colItem.prop">
                        <div v-if="!colItem.isTag" class="cell" :class="colItem.isTip ? 'el-tooltip' : ''">{{scope.row[colItem.prop]}}</div>
                        <el-tag v-else :type="colItem.type">{{scope.row[colItem.prop]}}</el-tag>
                    </template>
                    <template v-if="colItem.btnArr">
                        <slot :row="scope.row" :index="scope.$index"></slot>
                        <!-- <el-button 
                        v-for="(btnItem, btnIndex) in colItem.btnArr"
                        :key="btnIndex"
                        size="mini" 
                        :type="btnItem.type || 'primary'"
                        @click="btnItem.handleEvent(scope.$index, scope.row)">{{btnItem.name}}</el-button> -->
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box" v-if="isShowPages">
            <el-pagination
                v-if="dispalyPagination"
                background
                :page-size="pageSize"
                :current-page.sync="currentPage"
                :total="total"
                @current-change="handleCurrentChange"
                layout="prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script>
/**
 * columns: 列名
 *     prop: 列里要填入的表格字段 string
 *     label: 列显示的名字 string
 *     width: 列宽 number
 *     isTip: 该列是否开启溢出截断省略提示 boolean
 *     isTag: 是否标记为tag boolean
 *     type: tag类型 string 具体参见element的tag组件文档，isTag为true时生效
 *     btnArr: 是否操作列 boolean
 *     fixed: 是否固定列
 * tableData: 表格数据
 * isMark: 是否高亮第一行
 * isMultiCheck: 是否开启多选
 * isShowPages: 是否显示分页按钮
 * 
 * 事件：
 * current-change: 当前页
 * selection-change: 多选数据
 */
export default {
    name: 'BaseTable',
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        tableData: {
            type: Array,
            default: () => []
        },
        isMark: {
            type: Boolean,
            default: () => false
        },
        isMultiCheck: {
            type: Boolean,
            default: () => false
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        pageSize: {
            type: Number,
            default: () => 20
        },
        total: {
            type: Number,
            default: () => 20
        },
        isShowPages: {
            type: Boolean,
            default: () => true
        },
        defaultPage: {
            type: Number,
            default: () => 1
        }
    },
    watch: {
        tableData: {
            deep: true,
            handler(val, oldVal) {
                this.tableData = val
            }
        },
        loading: {
            deep: true,
            handler(val, oldVal) {
                this.loading = val
            }
        },
        total: {
            deep: true,
            handler(val, oldVal) {
                this.total = val
                if (this.defaultPage !== this.currentPage) {
                    this.currentPage = this.defaultPage
                }
            }
        },
        defaultPage: {
            deep: true,
            handler(val, oldVal) {
                this.defaultPage = val
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            dispalyPagination: true
        }
    },
    methods: {
        handleCurrentChange(val) {
            // 触发自定义事件，将页码传给父组件
            this.$emit('current-change', val)
        },
        handleSelectionChange(val) {
            // 触发自定义事件，将选中行传给父组件
            this.$emit('selection-change', val);
        },
        tableRowClassName({row, rowIndex}) {
            if (this.isMark && rowIndex === 0) {
                return 'success-row';
            }
            return '';
        },
        checkSelectable(row, index) {
            if (row.forbidSelected) {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style lang="scss">
.base-table{
    .success-row{
        background: #f0f9eb;
    }
    .pagination-box{
        margin-top: 20px;
        text-align: right;
    }
}
</style>
