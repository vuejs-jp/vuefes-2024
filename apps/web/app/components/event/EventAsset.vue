<script setup lang="ts">
import type { Event } from '@vuejs-jp/model'

interface EventAssetProps {
  title: Extract<
    Event,
    'creative-wall' | 'free-drinks-and-snacks' | 'tattoo-space' | 'cocktail-bash'
  >
  marginTop?: number
}

const props = defineProps<EventAssetProps>()
</script>

<template>
  <NuxtImg
    :src="`/event/${title}.png`"
    alt=""
    class="eventcard-image"
    :style="{ marginTop: `${marginTop}px` }"
    width="920"
    height="444"
    fit="cover"
    preload
    loading="lazy"
  />
</template>

<style scoped>
.eventcard-image {
  --head-img-height: 192px;

  width: 100%;
  height: var(--head-img-height);
  min-height: 222px;
  object-fit: cover;
}
</style>
