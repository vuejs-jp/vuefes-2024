<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Color } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'

export type LogoProps = {
  color: Color
}

const props = defineProps<LogoProps>()

const svgComponent =
  defineAsyncComponent(
    () => import('../../assets/logo/vuefes_logo.svg?component'),
  )

const { color: fillColor } = useColor()
</script>

<template>
  <component
    :is="svgComponent"
    :fill="fillColor(props.color)"
  />
</template>
