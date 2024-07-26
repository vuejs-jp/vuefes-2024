<script setup lang="ts"></script>

<template>
  <td class="session-content">
    <slot />
  </td>
</template>

<style scoped>
.session-content {
  background-color: var(--color-white);
  color: var(--vue-blue, #35495e);
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}
</style>
