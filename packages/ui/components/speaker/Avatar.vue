<script setup lang="ts">
type AvatarProps = {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
}
withDefaults(defineProps<AvatarProps>(), {
  loading: 'lazy',
})
</script>

<template>
  <img :src="src" :alt="alt" :loading="loading" />
</template>

<style scoped>
img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
}
</style>
