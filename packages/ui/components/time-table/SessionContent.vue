<script setup lang="ts">
import { computed } from 'vue'
import type { Track } from '@vuejs-jp/model'

const props = defineProps<{
  isClose: boolean
  track: Track
}>()

// eslint-disable-next-line vue/return-in-computed-property
const accentColorName = computed(() => {
  switch (props.track) {
    case 'medpeer':
      return 'hiwamoegi'
    case 'mntsq':
      return 'tohoh'
    case 'kickflow':
      return 'asagi'
    case 'vue':
      return 'sangosyo'
  }
})
const accentColor = `var(--color-${accentColorName.value}100)`
</script>

<template>
  <td class="session-content" :class="{ _close: isClose }">
    <slot />
  </td>
</template>

<style scoped>
.session-content {
  position: relative;
  color: var(--color-vue-blue);
  background-color: var(--color-white);
  padding: 20px;
}
.session-content::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  background-color: v-bind(accentColor);
  clip-path: polygon(0 0, 100% 100%, 100% 0%);
}
._close {
  background-color: #efefef;
}
</style>
