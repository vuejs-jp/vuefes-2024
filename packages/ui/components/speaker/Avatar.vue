<script setup lang="ts">
type AvatarProps = {
  src: string
  alt: string
}

defineProps<AvatarProps>()
</script>

<template>
  <img :src="src" :alt="alt" />
</template>

<style scoped>
img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
}
</style>
