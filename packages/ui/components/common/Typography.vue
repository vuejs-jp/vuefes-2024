<script setup lang="ts">
import type { Color, Typography } from '@vuejs-jp/model'
import { useColor, useTypography } from '@vuejs-jp/composable'

type TypographyProps = {
  color: Color
  variant: Typography
  id?: string
}

const props = defineProps<TypographyProps>()

const { component, fontWeight, fontSize } = useTypography()
const { color: textColor } = useColor()
</script>

<template>
  <component
    :is="component(props.variant)"
    :id
    :style="{
      fontWeight: fontWeight(props.variant),
      fontSize: fontSize(props.variant),
      color: textColor(props.color),
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
h2, h3, h4, h5, h6, p, span {
  padding: 0;
  margin: 0;
}
</style>
