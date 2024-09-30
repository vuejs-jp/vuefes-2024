<script setup lang="ts">
import { computed } from 'vue'

type AvatarProps = {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  size?: 'large' | 'medium' | 'small'
}
const props = withDefaults(defineProps<AvatarProps>(), {
  loading: 'lazy',
  size: 'large',
})

const size = computed(() => {
  const size = props.size || 'large'
  return size === 'large' ? 600 : size === 'medium' ? 344 : 206
})
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :loading="loading"
    placeholder
    :width="size"
    :height="size"
    fit="cover"
  />
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
}
</style>
