<template>
  <el-aside class="sidebar" :width="leftWidth">
    <!-- 侧栏菜单 -->
    <el-menu
      :default-active="onRoutes"
      :router="true"
      class="el-menu-vertical"
      :background-color="themeVariable.menubg"
      :text-color="themeVariable.menutext"
      :active-text-color="themeVariable.menuactivetext"
      :collapse="isCollapse"
    >
      <menu-cell
        v-for="route in asideMenu"
        :key="route.path"
        :menu="route"
      ></menu-cell>
    </el-menu>
    <div
      class="collapse-btn"
      :style="'width:' + leftWidth"
      @click="handleCollapse"
    >
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
  </el-aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import variables from '@/theme/default.module.scss'
import MenuCell from './menuCell'

export default {
  name: 'LayoutAside',
  components: {
    MenuCell
  },
  data() {
    return {
      isCollapse: false // 是否折叠
    }
  },
  computed: {
    ...mapGetters(['asideMenu', 'leftWidth']),
    themeVariable() {
      console.log(variables)
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
  top: 60px;
  bottom: 0;
  left: 0;
  padding-bottom: 40px;
  background-color: $menuBg;
  box-sizing: border-box;
  transition: all .3s ease;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar > ul {
  height: 100%;
  overflow-y: auto;
  border-right: none;
  transition: all .3s ease;
}

.collapse-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 40px;
  text-align: center;
  cursor: pointer;
  background-color: $light-blue;
  transition: all .3s ease;

  i {
    font-size: 24px;
    line-height: 40px;
    color: #fff;
  }
}
</style>
