<template>
  <h3 class="page-title">{{ pageTitle }}</h3>
</template>

<script>
export default {
  name: 'PageTitle',
  data() {
    return {
      pageTitle: ''
    }
  },
  mounted() {
    this.pageTitle = this.$route.meta.title
  }
}
</script>
