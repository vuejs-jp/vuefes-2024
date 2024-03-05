<script setup lang="ts">
import { match } from 'ts-pattern'
import type { Color, Typography } from '@vuejs-jp/model'

type TypographyProps = {
  color: Color
  variant: Typography
}

const props = defineProps<TypographyProps>()

const typographyComponent =
  match<Typography>(props.variant)
    .with('heading/400', () => 'h2')
    .with('heading/300', () => 'h3')
    .with('heading/200', () => 'h4')
    .with('subtitle', () => 'h5')
    .with('body/400', () => 'p')
    .with('body/300', () => 'p')
    .exhaustive()

const fontWeight =
  match<Typography>(props.variant)
    .with('heading/400', () => '800')
    .with('heading/300', 'heading/200', () => '700')
    .with('subtitle', () => '600')
    .with('body/400', 'body/300', () => '500')
    .exhaustive()

const fontSize =
  match<Typography>(props.variant)
    .with('heading/400', () => '5.625rem')
    .with('heading/300', () => '2.813rem')
    .with('heading/200', () => '1.5rem')
    .with('subtitle', () => '1.25rem')
    .with('body/400', () => '1.125rem')
    .with('body/300', () => '1rem')
    .exhaustive()

const color =
  match<Color>(props.color)
    .with('white', () => '#ffffff')
    .with('vue-blue', () => '#35495e')
    .with('vue-green', () => '#42b883')
    .exhaustive()
</script>

<template>
  <component :is="typographyComponent" :style="{ fontWeight, fontSize, color }">
    <slot />
  </component>
</template>

<style scoped>
h2, h3, h4, h5, p {
  padding: 0;
  margin: 0;
}
</style>
