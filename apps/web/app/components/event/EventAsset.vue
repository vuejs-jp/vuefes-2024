<script setup lang="ts">
import type { Event } from '@vuejs-jp/model'

interface EventAssetProps {
  title: Extract<Event, 'creative-wall' | 'refreshment-space' | 'tattoo-booth'>
}

const props = defineProps<EventAssetProps>()
</script>

<template>
  <div class="eventcard-image">
    <img :src="`/event/${title}.png`" alt="" />
  </div>
</template>

<style scoped>
.eventcard-image {
  --head-img-width: 292px;
}

.eventcard-image ::v-deep(img) {
  width: var(--head-img-width);

  @media (--mobile) {
    --head-img-width: 100%;
  }
}
</style>
