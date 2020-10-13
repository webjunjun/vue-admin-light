<template>
    <div class="base-tree">
        <el-tree ref="basetree" 
            v-loading="loading" 
            :data="treeData" 
            :props="defaultProps" 
            :node-key="nodekey" 
            :lazy="lazy" 
            :load="loadNode" 
            :default-checked-keys="defaultCheckedArr" 
            :show-checkbox="showCheckbox" 
            :check-strictly="checkStrictly" 
            :default-expanded-keys="defaultExpandedKeys" 
            @node-click="handleNodeClick" 
            highlight-current>
        </el-tree>
    </div>
</template>

<script>
/**
 * treeData: 树的数据 Array
 * nodekey: 树节点的唯一标识 string
 * lazy: 是否支持懒加载 boolean 默认false
 * loading: 是否树在显示加载中 boolean 默认false
 * showCheckbox: 是否在节点前显示复选框 boolean 默认false
 * loadNode: 加载子树数据的方法，lazy为true时生效
 * defaultCheckedArr: 默认选中的节点数组 array
 * checkStrictly: 是否打断复选框父子节点不关联 boolean 默认false
 * defaultExpandedKeys: 默认展开的节点数组 array
 * 
 * 事件：
 * handleNodeClick: 当前节点被点击
 */
export default {
    name: "BaseTree",
    props: {
        treeData: {
            type: Array,
            default: () => []
        },
        nodekey: {
            type: String,
            default: () => ''
        },
        lazy: {
            type: Boolean,
            default: () => false
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        showCheckbox: {
            type: Boolean,
            default: () => false
        },
        loadNode: {
            type: Function,
            default: () => {}
        },
        defaultCheckedArr: {
            type: Array,
            default: () => []
        },
        checkStrictly: {
            type: Boolean,
            default: () => false
        },
        defaultExpandedKeys: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            defaultProps: {
                label: 'label',
                children: 'children',
                isLeaf: 'leaf'
            }
        }
    },
    watch: {
        treeData: {
            deep: true,
            handler(val, oldVal) {
                this.treeData = val
            }
        },
        showCheckbox: {
            deep: true,
            handler(val, oldVal) {
                this.showCheckbox = val
            }
        },
        defaultCheckedArr: {
            deep: true,
            handler(val, oldVal) {
                this.defaultCheckedArr = val
            }
        },
        defaultExpandedKeys: {
            deep: true,
            handler(val, oldVal) {
                this.defaultExpandedKeys = val
            }
        }
    },
    methods: {
        handleNodeClick(data,node,nodeComponent) {
            // 触发自定义事件，将节点被点击后的该节点对应的data和node节点
            this.$emit('node-click', {data,node})
        },
        handlerCheckedNode() {
            return this.$refs.basetree.getCheckedKeys()
        }
    }
}
</script>
