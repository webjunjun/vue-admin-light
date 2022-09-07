<template>
  <el-container direction="vertical">
    <layout-header />
    <el-container>
      <LayoutAside></LayoutAside>
      <el-container
        class="main_container_wrap"
        direction="vertical"
        :style="'width: calc(100% - ' + leftWidth + ');left: ' + leftWidth"
      >
        <el-main>
          <router-view />
        </el-main>
        <!-- <layout-footer /> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import LayoutHeader from '@/components/LayoutHeader/index.vue'
import LayoutAside from '@/components/LayoutAside/index.vue'
// import LayoutFooter from '@/components/LayoutFooter/index.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutAside
    // LayoutFooter
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
.main_container_wrap {
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow-y: scroll;
  transition: all 0.3s ease;
  .el-main {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: $mainBg;
    overflow-y: scroll;
  }
}
</style>
