<script setup lang="ts">
import type { Color } from '@vuejs-jp/model'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { AnchorHTMLAttributes } from 'vue'

type _Color = 'white' | 'vue-green'

interface TextLinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  /* Text Color */
  color: Extract<Color, _Color>
}

const props = defineProps<TextLinkProps>()

const COLOR_WHITE = 'white' as const
const COLOR_GREEN = 'vue-green' as const

const { color: textColor } = useColor()
const { fontSize } = useTypography()

const getModifyClassName = (color: _Color) => {
  switch (color) {
    case COLOR_WHITE:
      return 'text-link-white'
    case COLOR_GREEN:
      return 'text-link-green'
  }
}
</script>

<template>
  <a :href :target class="text-link" :class="getModifyClassName(props.color)">
    <slot />
  </a>
</template>

<style scoped>
.text-link {
  text-decoration: underline;
  cursor: pointer;
  color: v-bind(textColor(props.color));
  font-size: v-bind(fontSize('link/100'));
}
.text-link-white:hover {
  color: v-bind(textColor('vue-green'));
  transition: 0.2s;
}
.text-link-green:hover {
  opacity: 0.4;
  transition: 0.2s;
}
</style>
