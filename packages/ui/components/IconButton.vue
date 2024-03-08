<script setup lang="ts">
import Icon from './Icon.vue'
import type { IconProps } from './Icon.vue'

type IconButtonProps = IconProps & {
  href: string
}

const props = defineProps<IconButtonProps>()
</script>

<template>
  <a
    :href="props.href"
    :aria-label="props.name"
    class="icon-wrapper"
  >
    <Icon v-bind="props" />
  </a>
</template>

<style scoped>
.icon-wrapper {
  cursor: pointer;
}
</style>
