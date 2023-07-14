<script lang="ts" setup name="LayoutView">
// 布局模板
import { useLayoutStore } from '@/stores/modules/layout'
import ClassicLayout from './classic/index.vue'
import ColumnsLayout from './columns/index.vue'
import TransverseLayout from './transverse/index.vue'

const LayoutConfig = {
  classic: ClassicLayout,
  columns: ColumnsLayout,
  transverse: TransverseLayout
}
const layoutVal = useLayoutStore()
</script>

<template>
  <div class="layout-main">
    <component :is="LayoutConfig[layoutVal.currentLayoutValue]" />
  </div>
</template>
