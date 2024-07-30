<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'
import { Color } from '@vuejs-jp/model'

type TitleProps = {
  id: string
  color?: Color
}

const props = withDefaults(defineProps<TitleProps>(), {
  color: 'vue-blue',
})

const { fontWeight } = useTypography()
const { color: updateColor } = useColor()
</script>

<template>
  <h2
    :id
    :style="{
      fontWeight: fontWeight('heading/700'),
      color: updateColor(color ?? 'vue-blue'),
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
