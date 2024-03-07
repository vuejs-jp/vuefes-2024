<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { match } from 'ts-pattern'
import type { Color, IconName } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'

export type IconProps = {
  color: Color
  name: IconName
}

const props = defineProps<IconProps>()

const svgComponent =
  match<IconName>(props.name)
    .with('x', () => defineAsyncComponent(
      () => import('../assets/icon/x_logo.svg?component'),
    ))
    .with('note', () => defineAsyncComponent(
      () => import('../assets/icon/note_logo.svg?component'),
    ))
    .with('YouTube', () => defineAsyncComponent(
      () => import('../assets/icon/youtube_logo.svg?component'),
    ))
    .with('GitHub', () => defineAsyncComponent(
      () => import('../assets/icon/github_logo.svg?component'),
    ))
    .exhaustive()

const { color: fillColor } = useColor()
</script>

<template>
  <component
    :is="svgComponent"
    :fill="fillColor"
  />
</template>

<style scoped>
svg:hover {
  fill: #42b883;
  transition: .2s;
}
</style>
