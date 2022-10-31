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
#nprogress .bar {
 background: #66B1FF!important;
 height: 4px!important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body,#app{
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.clearfix:after{
  content: ' ';
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.clearfix{
  zoom: 1;
}
</style>
