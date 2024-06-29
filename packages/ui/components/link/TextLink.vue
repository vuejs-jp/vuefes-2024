<script setup lang="ts">
import { match } from 'ts-pattern'
import type { Color } from '@vuejs-jp/model'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { AnchorHTMLAttributes } from 'vue'

type _Color = 'white' | 'vue-green' | 'vue-blue'

interface TextLinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  /* Text Color */
  color: Extract<Color, _Color>
}

const props = defineProps<TextLinkProps>()

const COLOR_WHITE = 'white' as const
const COLOR_GREEN = 'vue-green' as const
const COLOR_BLUE = 'vue-blue' as const
const OPACITY_HOVER = 0.4 as const

const { color: textColor } = useColor()
const { fontSize } = useTypography()

const getCustomProperties = () => {
  const style = match<_Color>(props.color)
    .with(COLOR_WHITE, () => getCustomPropertyColorWhite())
    .with(COLOR_GREEN, () => getCustomPropertyColorGreen())
    .with(COLOR_BLUE, () => getCustomPropertyColorGreen())
    .exhaustive()

  return style
}

const getCustomPropertyColorWhite = () => {
  return {
    '--color-hover-text': textColor(COLOR_GREEN),
  }
}

const getCustomPropertyColorGreen = () => {
  return {
    '--opacity-hover': OPACITY_HOVER,
  }
}
</script>

<template>
  <a
    :href
    :target
    class="text-link"
    :style="{
      '--color-text': textColor(props.color),
      '--size-font': fontSize('link/100'),
      ...getCustomProperties(),
    }"
  >
    <slot />
  </a>
</template>

<style scoped>
.text-link {
  text-decoration: underline;
  cursor: pointer;
  color: var(--color-text);
  font-size: var(--size-font);
  &:hover {
    color: var(--color-hover-text, currentColor);
    opacity: var(--opacity-hover, 1);
    transition: 0.2s;
  }
}
</style>
