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
      <MarkdownText :path="title.replaceAll('-', '_')" />
    </template>
    <template #default>
      Test
    </template>
  </VFEventFrame>
</template>
