<script setup lang="ts">
import type { Event } from '@vuejs-jp/model'

interface EventSectionProps {
  title: Event
}

const props = defineProps<EventSectionProps>()
</script>

<template>
  <VFEventFrame :title="$t(`event.${title.replaceAll('-', '_')}`)">
    <template #content>
      <MarkdownText :path="title.replaceAll('-', '_')" />
    </template>
    <template #default>
      Test
    </template>
  </VFEventFrame>
</template>
