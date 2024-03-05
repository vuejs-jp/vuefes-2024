<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { match } from 'ts-pattern'
import type { Color, IconName } from '@vuejs-jp/model'

type IconButtonProps = {
  href: string
  color: Color
  name: IconName
}

const props = defineProps<IconButtonProps>()

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

const color =
  match<Color>(props.color)
    .with('white', () => '#ffffff')
    .with('vue-blue', () => '#35495e')
    .with('vue-green', () => '#42b883')
    .exhaustive()
</script>

<template>
  <a
    :href="props.href"
    :aria-label="props.name"
    class="icon-wrapper"
  >
    <component
      :is="svgComponent"
      :fill="color"
    />
  </a>
</template>

<style scoped>
.icon-wrapper svg:hover {
  fill: #42b883;
  transition: .2s;
}
</style>
