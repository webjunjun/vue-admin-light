<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    userInfo() {
      return this.$store.state.userInfo || null
    }
  },
  watch: {
    userInfo: {
      handler(val) {
        if (val) {
          this.renderWaterMark()
        }
      }
    }
  },
  mounted() {
    if (this.userInfo) {
      this.renderWaterMark()
    }
  },
  methods: {
    renderWaterMark() {
      const watermakr = document.createElement('div')
      watermakr.className = 'watermark'
      watermakr.style.backgroundImage = `url(${this.createWaterMark()})`
      // document.body.appendChild(watermakr)
      document.querySelector('#app').appendChild(watermakr)
    },
    createWaterMark() {
      const angle = -20
      const txt = this.userInfo.userName || '游客'
      const canvas = document.createElement('canvas')
      canvas.width = 240
      canvas.height = 120
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 240, 120)
      ctx.fillStyle = '#000'
      ctx.globalAlpha = 0.15
      ctx.font = '18px serif'
      ctx.rotate((Math.PI / 180) * angle)
      ctx.fillText(txt, 0, 50)
      return canvas.toDataURL()
    }
  }
}
</script>

<style lang="scss">
@import url("../static/style/index.scss");
</style>
