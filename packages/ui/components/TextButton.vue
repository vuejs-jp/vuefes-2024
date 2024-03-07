<script setup lang="ts">
import type { Color } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'

type TextButtonProps = {
  href: string
  target?: '_blank'
  color: Color
}
const props = defineProps<TextButtonProps>()

const { color: textColor } = useColor()
</script>

<template>
  <a :href :target :style="{ color: textColor(props.color) }" class="text-button">
    <slot />
  </a>
</template>

<style scoped>
.text-button {
  cursor: pointer;
}

.text-button:hover {
  opacity: 0.6;
  transition: .2s;
}
</style>
