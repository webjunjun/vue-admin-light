<template>
  <el-aside class="sidebar" :width="leftWidth">
    <!-- 侧栏菜单 -->
    <el-menu
      :default-active="onRoutes"
      :router="true"
      class="el-menu-vertical"
      :background-color="themeVariable.menuBg"
      :text-color="themeVariable.menuText"
      :active-text-color="themeVariable.menuActiveText"
      :collapse="isCollapse"
    >
      <menu-cell
        v-for="route in asideMenu"
        :key="route.path"
        :menu="route"
      ></menu-cell>
    </el-menu>
    <div
      class="collapse_btn"
      :style="'width:' + leftWidth"
      @click="handleCollapse"
    >
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
  </el-aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import variables from '@/theme/default.scss'
import menuCell from './menuCell.vue'

export default {
  name: 'LayoutAside',
  components: {
    menuCell
  },
  data() {
    return {
      isCollapse: false // 是否折叠
    }
  },
  computed: {
    ...mapGetters(['asideMenu', 'leftWidth']),
    themeVariable() {
      return variables
    },
    onRoutes() {
      return this.$route.path
    }
  },
  methods: {
    ...mapMutations(['SET_LEFTWIDTH']),
    handleCollapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.SET_LEFTWIDTH('64px')
      } else {
        this.SET_LEFTWIDTH('200px')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background-color: transparent;
  padding-bottom: 40px;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
  border-right: none;
  transition: all 0.3s ease;
  overflow-y: auto;
}
.collapse_btn {
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 40px;
  background-color: $light-blue;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  i {
    font-size: 24px;
    line-height: 40px;
    color: #fff;
  }
}
</style>
