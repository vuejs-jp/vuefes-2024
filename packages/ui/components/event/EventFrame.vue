<script setup lang="ts">
interface EventFrameProps {
  title: string
}

const props = defineProps<EventFrameProps>()
</script>

<template>
  <div class="event-frame-root">
    <h3>{{ title }}</h3>
    <slot name="content" />
    <slot />
  </div>
</template>

<style scoped>
.event-frame-root {
  display: grid;
  gap: calc(var(--unit) * 1);
  padding: calc(var(--unit) * 2);
  width: var(--head-width);
  background-color: #E7EFF7;
  border-radius: calc(var(--unit) * 3);
}
</style>
