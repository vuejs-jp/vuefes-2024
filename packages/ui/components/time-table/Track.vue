<script setup lang="ts">
type Props = {
  color: 'hiwamoegi' | 'tohoh' | 'asagi' | 'sangosyo'
}

const props = defineProps<Props>()

const backgroundColor = `var(--color-${props.color}200)`
</script>

<template>
  <th class="track">
    <slot />
  </th>
</template>

<style scoped>
.track {
  padding: 22px 8px;
  color: var(--color-white);
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  background-color: v-bind(backgroundColor);
}
</style>
