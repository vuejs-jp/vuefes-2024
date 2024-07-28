<script setup lang="ts">
import type { Event } from '@vuejs-jp/model'

interface EventMultipleAssetsProps {
  title?: Extract<Event, 'vuejs-handson'>
}

const props = withDefaults(defineProps<EventMultipleAssetsProps>(), {
  title: 'vuejs-handson',
})
</script>

<template>
  <div class="eventcard-images">
    <img :src="`/event/${title}-1.png`" alt="" />
    <img :src="`/event/${title}-2.png`" alt="" />
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.eventcard-images {
  display: flex;
  gap: calc(var(--unit) * 1.5);
  grid-template-columns: auto 1fr;
  padding: 0 calc(var(--unit) * 2) calc(var(--unit) * 5);

  @media (--mobile) {
    flex-direction: column;
  }
}

.eventcard-images ::v-deep(img) {
  --head-img-height: 256px;

  padding: 0;
  margin: 0 auto;
  height: var(--head-img-height);
}
</style>
