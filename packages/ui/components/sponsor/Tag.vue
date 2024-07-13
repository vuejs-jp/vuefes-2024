<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span class="tag-root" :style="{ background }"> {{ label }} </span>
</template>

<style scoped>
.tag-root {
  display: inline-block;
  padding: calc(var(--unit) * 1) calc(var(--unit) * 2);
  font-family: DIN;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-white);
  line-height: 1;
  white-space: nowrap;
}
</style>
