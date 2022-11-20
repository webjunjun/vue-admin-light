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
        <el-main>
          <!-- 面包屑导航打开注释即可 -->
          <bread-crumb />
          <router-view />
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
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    BreadCrumb,
    // LayoutFooter,
    LayoutAside
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['leftWidth'])
  },
  created() {}
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
