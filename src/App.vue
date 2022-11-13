<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  // created() {
  //   // 页面加载时读取缓存数据
  //   // 挂载监听页面刷新
  //   window.addEventListener("beforeunload",() => {
  //     //
  //   })
  // }
}
</script>

<style lang="scss">
@import url("../static/style/reset.css");
@import url("../static/iconfont/iconfont.css");

#nprogress .bar {
  height: 4px !important;
  background: #66b1ff !important;
}
</style>
