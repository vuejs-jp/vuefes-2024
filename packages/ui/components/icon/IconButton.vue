<script setup lang="ts">
import Icon from './Icon.vue'
import type { IconProps } from './Icon.vue'

type IconButtonProps = IconProps & {
  href: string
  targetBlank?: boolean
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  canHover: false,
})
</script>

<template>
  <NuxtLink :to="href" :target="targetBlank && '_blank'" :aria-label="name" class="icon-wrapper">
    <Icon v-bind="props" />
  </NuxtLink>
</template>

<style scoped>
.icon-wrapper {
  cursor: pointer;
}
</style>
