<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
  setup() {},
});
</script>

<template>
  <div class="not-found">404 page not found</div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 30px;
  background-color: $main-bg;
  justify-content: center;
  align-items: center;
}
</style>
