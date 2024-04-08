<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'

type TitleProps = {
  id: string
}

const props = defineProps<TitleProps>()

const { fontWeight } = useTypography()
const { color } = useColor()
</script>

<template>
  <h2
    :id
    :style="{
      fontWeight: fontWeight('heading/700'),
      color: color('vue-blue'),
    }"
    class="typography"
  >
    <slot />
  </h2>
</template>

<style scoped>
.typography {
  font-size: 45px;
}
@media (width <=768px) {
  .typography {
    font-size: 28px;
  }
}
</style>
