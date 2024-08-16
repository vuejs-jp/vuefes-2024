<script setup lang="ts">
interface CreditProps {
  name: string
  size?: 'small' | 'large'
}

const props = withDefaults(defineProps<CreditProps>(), {
  size: 'small',
})
</script>

<template>
  <span
    :style="{
      '--credit-font-size': size === 'small' ? '14px' : '16px',
    }"
  >
    {{ name }}
  </span>
</template>

<style scoped>
.credit {
  color: var(--color-vue-blue);
  font-size: var(--credit-font-size);
  font-weight: 500;
}
</style>
