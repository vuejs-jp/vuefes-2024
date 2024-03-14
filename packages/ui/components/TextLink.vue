<script setup lang="ts">
import type { Color } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'
import { AnchorHTMLAttributes } from 'vue'

interface TextLinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  /* Text Color */
  color: Color
}
const props = defineProps<TextLinkProps>()

const { color: textColor } = useColor()
</script>

<template>
  <a :href :target :style="{ color: textColor(props.color) }" class="text-link">
    <slot />
  </a>
</template>

<style scoped>
.text-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
