<template>
  <div class="main-page">
    <page-title />
    <div>
      <h3>权限按钮</h3>
      <el-link v-permission="'SystemRole-Add'">新增</el-link>
      <el-link v-permission="'SystemRole-Edit'">编辑</el-link>
      <el-link v-permission="'SystemRole-Del'">删除</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemRole'
}
</script>
