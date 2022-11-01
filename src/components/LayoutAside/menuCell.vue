<template>
    <div class="menu-cell">
        <el-menu-item v-if="!menu.children" :index="menu.path">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
        <el-submenu v-else :index="menu.path">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
            </template>
            <menu-cell v-for="route in menu.children" :key="route.path" :menu="route"></menu-cell>
        </el-submenu>
    </div>
</template>

<script>
export default {
  name: 'menuCell',
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
