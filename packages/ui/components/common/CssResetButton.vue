<script setup lang="ts" generic="ButtonHTMLAttributes">
const props = defineProps()
</script>

<template>
  <button v-bind="props">
    <slot />
  </button>
</template>

<style scoped>
button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}
button:disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
