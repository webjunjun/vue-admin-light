<template>
  <div class="menu-cell">
    <el-menu-item v-if="!menu.children" :index="menu.path">
      <i class="wxiconfont" :class="menu.icon"></i>
      <span slot="title">{{ menu.title }}</span>
    </el-menu-item>
    <el-submenu v-else :index="menu.path">
      <template slot="title">
        <i class="wxiconfont" :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </template>
      <menu-cell v-for="route in menu.children" :key="route.path" :menu="route"></menu-cell>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuCell',
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.el-submenu__title > i, .menuitem > i, .el-menu-item i {
  margin-right: 6px;
  vertical-align: -1px;
}
</style>
