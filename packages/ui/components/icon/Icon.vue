<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { match } from 'ts-pattern'
import type { Color, IconName } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'

export type IconProps = {
  color: Color
  name: IconName
  canHover: boolean
}

const props = withDefaults(defineProps<IconProps>(),{
  canHover: true
})

const svgComponent =
  match<IconName>(props.name)
    .with('x', () => defineAsyncComponent(
      () => import('../../assets/icon/x_icon.svg?component'),
    ))
    .with('note', () => defineAsyncComponent(
      () => import('../../assets/icon/note_icon.svg?component'),
    ))
    .with('YouTube', () => defineAsyncComponent(
      () => import('../../assets/icon/youtube_icon.svg?component'),
    ))
    .with('GitHub', () => defineAsyncComponent(
      () => import('../../assets/icon/github_icon.svg?component'),
    ))
    .exhaustive()

const { color: fillColor } = useColor()
</script>

<template>
  <component
    :is="svgComponent"
    :fill="fillColor(props.color)"
    :class="{'icon_svg' : props.canHover}"
  />
</template>

<style scoped>
.icon_svg:hover {
  fill: #42b883;
  transition: .2s;
}
</style>
