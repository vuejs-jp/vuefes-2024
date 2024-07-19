<script setup lang="ts">
import Icon from '../icon/Icon.vue'

interface StatusCardProps {
  hasError: boolean
  title: string
}

const props = defineProps<StatusCardProps>()
</script>

<template>
  <div
    class="status-card"
    :style="{
      background: hasError ? '#FFDAD6' : '#E7EFF7',
    }"
  >
    <Icon v-if="hasError" :style="{ width: '80px' }" color="vue-blue" name="alert" />
    <p
      class="title"
      :style="{
        fontWeight: hasError ? 700 : 500,
      }"
    >
      {{ title }}
    </p>
  </div>
</template>

<style scoped>
.status-card {
  display: flex;
  gap: calc(var(--unit) * 1);
  padding: calc(var(--unit) * 3) calc(var(--unit) * 4);
  max-width: 760px;
  color: var(--color-vue-blue);
  border-radius: 8px;
}

.title {
  padding: 0;
  margin: 0;
  font-size: 18px;
}

@media screen and (max-width: 768px) {
  .status-card {
    width: 100%;
  }
}
</style>
