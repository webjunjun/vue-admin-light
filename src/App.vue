<script setup lang="ts" name="AppView">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'

// 设置页面最多可显示的消息个数
const showMessageMax = reactive<{
  max: number
}>({
  max: 3
})
</script>

<template>
  <!-- :locale="locale" -->
  <el-config-provider :message="showMessageMax">
    <RouterView />
  </el-config-provider>
</template>
