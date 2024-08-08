<script setup lang="ts">
import Credit from './Credit.vue'

interface CreditsProps {
  list: string[]
  size?: 'small' | 'large'
}

const props = withDefaults(defineProps<CreditsProps>(), {
  size: 'small',
})
</script>

<template>
  <div
    :style="{
      '--credit-font-size': size === 'small' ? '14px' : '16px',
    }"
    class="credits-list"
  >
    <Credit v-for="l in list" :key="l" :name="l" :size />
  </div>
</template>

<style scoped>
.credits-list {
  display: flex;
  flex-wrap: wrap;
  padding-top: calc(var(--unit) * 2);
  gap: calc(var(--unit) * 1) calc(var(--unit) * 2);
}
</style>
