<script setup lang="ts">
import type { Event } from '@vuejs-jp/model'

interface EventCardProps {
  title: Event
}

const props = defineProps<EventCardProps>()
</script>

<template>
  <VFEventFrame :title="$t(`event.${title.replaceAll('-', '_')}`)">
    <template #content>
      <div class="eventcard-content">
        <MarkDownText :path="title.replaceAll('-', '_')" />
      </div>
    </template>
    <template #default>
      <slot />
    </template>
  </VFEventFrame>
</template>

<style scoped>
.eventcard-content {
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  color: var(--color-vue-blue);
}

.eventcard-content ::v-deep(a) {
  color: var(--color-vue-green200);
  text-decoration: underline;
}

.eventcard-content ::v-deep(a:hover) {
  opacity: 0.4;
  transition: .2s;
}

</style>
