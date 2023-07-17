<script lang="ts" setup name="ClassicLayout">
import AsideMenu from '@/components/AsideMenu.vue'
import FooterLayout from '@/components/FooterLayout.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <AsideMenu />
        </el-aside>
        <el-container direction="vertical">
          <el-main>Main</el-main>
          <FooterLayout />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
