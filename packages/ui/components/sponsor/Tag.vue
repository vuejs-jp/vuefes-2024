<script setup lang="ts">
import { useColor } from '@vuejs-jp/composable'
import { Color } from '@vuejs-jp/model'

interface TagProps {
  label: string
  background: Color
}

const props = defineProps<TagProps>()

const { color } = useColor()
</script>

<template>
  <span
    class="tag-root"
    :style="{ '--tag-background-color': color(background) }"
  >
    {{ label }}
  </span>
</template>

<style scoped>
.tag-root {
  display: inline-block;
  padding: calc(var(--unit) * 1) calc(var(--unit) * 2);
  font-family: DIN;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-white);
  background: var(--tag-background-color);
  line-height: 1;
  white-space: nowrap;

  @media (width <= 480px) {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap : break-word;
  }
}
</style>
