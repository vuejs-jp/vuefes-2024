<script setup lang="ts">
import type { Event } from '@vuejs-jp/model'

interface EventCardProps {
  title: Event
  fontClass?: string
  paddingClass?: string
  id?: string
}

const props = defineProps<EventCardProps>()
</script>

<template>
  <VFEventFrame
    :id="id"
    :title="$t(`event.${title.replaceAll('-', '_')}`)"
    :font-class
    :padding-class
  >
    <template #content>
      <div class="eventcard-content">
        <MarkDownText :path="title.replaceAll('-', '_')" />
      </div>
    </template>
    <template #default>
      <div class="eventcard-default">
        <slot />
      </div>
    </template>
  </VFEventFrame>
</template>

<style scoped>
@import url('~/assets/media.css');

.eventcard-content {
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  color: var(--color-vue-blue);
}

.eventcard-content ::v-deep(p) {
  --body-p-margin-bottom: calc(var(--unit) * 4);
  margin-bottom: var(--body-p-margin-bottom);
  line-height: 1.8;
}

.eventcard-content ::v-deep(a) {
  color: var(--color-vue-green200);
  text-decoration: underline;
}

.eventcard-content ::v-deep(a:hover) {
  opacity: 0.4;
  transition: 0.2s;
}

.eventcard-default {
  border-radius: 0 0 calc(var(--unit) * 3) calc(var(--unit) * 3);
  overflow: hidden;

  @media (--mobile) {
    border-radius: 0 0 calc(var(--unit) * 1.5) calc(var(--unit) * 1.5);
  }
}
</style>
