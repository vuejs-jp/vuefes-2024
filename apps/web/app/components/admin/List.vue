<script setup lang="ts">
import type { AdminPage } from '@vuejs-jp/model'

interface ListProps {
  page: AdminPage
}

const props = defineProps<ListProps>()

const pageText = props.page.replace(/^[a-z]/g, function (val) {
  return val.toUpperCase()
})
</script>

<template>
  <div class="tab-content">
    <h2>{{ pageText }}</h2>
  </div>
</template>

<style scoped>
.tab-content {
  margin: 0 1.5%;
}
</style>
