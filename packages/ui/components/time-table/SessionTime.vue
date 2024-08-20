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
  height: 100%;
  padding: 21px 4px;
  background: var(--color-vue-green-gradation200);
  color: var(--color-white);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;

  @media (width <= 768px) {
    padding: 5px 4px;
  }
}
</style>
