<template>
  <el-breadcrumb class="custom-breadcrumb" separator="/">
    <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="item.path + index"
        :to="{ name: item.name }"
    >{{ item.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const { matched } = this.$route
      const tempList = []
      matched.forEach((item) => {
        if (item.name !== 'Layout') {
          tempList.push({
            title: item.meta.title,
            name: item.name,
            path: item.path
          })
        }
      })
      this.breadList = tempList
    }
  }
}
</script>
