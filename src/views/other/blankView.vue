<script lang="ts" setup name="BlankView">
// 内容不能为空 注释都可以 否则name不生效
import { useRoute, useRouter } from 'vue-router'

const currentRoute = useRoute()
const router = useRouter()
const { params, query } = currentRoute
const { pathMatch } = params
router.replace({ path: '/' + pathMatch[0], query })
</script>

<template>
  <div class="blank-view"></div>
</template>
