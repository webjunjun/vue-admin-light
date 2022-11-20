<template>
  <el-container direction="vertical">
    <layout-header />
    <el-container>
      <layout-aside />
      <el-container
        class="main-container-wrap"
        direction="vertical"
        :style="'width: calc(100% - ' + leftWidth + ');left: ' + leftWidth"
      >
        <!-- 标签页 -->
        <tags-view
          v-if="defaultSetting.multipleTabs"
          ref="aliveTab"
          :keep-alive-component-instance="keepAliveComponentInstance"
        />
        <el-main>
          <template v-if="defaultSetting.multipleTabs">
            <bread-crumb />
            <div ref="keepAliveContainer">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive" />
            </div>
          </template>
          <template v-else>
            <bread-crumb />
            <router-view />
          </template>
        </el-main>
        <!-- <layout-footer /> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import LayoutHeader from '@/components/LayoutHeader'
import LayoutAside from '@/components/LayoutAside'
import BreadCrumb from '@/components/BreadCrumb'
// import LayoutFooter from '@/components/LayoutFooter'
import TagsView from '@/components/TagsView'
import defaultSetting from '@/utils/setting'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    BreadCrumb,
    // LayoutFooter,
    TagsView,
    LayoutAside
  },
  data() {
    return {
      keepAliveComponentInstance: null
    }
  },
  computed: {
    ...mapGetters(['leftWidth']),
    defaultSetting() {
      return defaultSetting
    }
  },
  mounted() {
    if (this.$refs.keepAliveContainer) {
      // 获取keep-alive的控件实例对象
      this.keepAliveComponentInstance = this.$refs.keepAliveContainer.childNodes[0].__vue__
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container-wrap {
  position: absolute;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  transition: all .3s ease;

  .el-main {
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    background-color: $mainBg;
    box-sizing: border-box;
  }
}
</style>
