<script setup lang="ts"></script>

<template>
  <td class="session-time">
    <slot />
  </td>
</template>

<style scoped>
.session-time {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  min-width: 80px;
  padding: 21px 4px;
  background-color: var(--color-vue-green200);
  color: var(--color-white);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
}
</style>
