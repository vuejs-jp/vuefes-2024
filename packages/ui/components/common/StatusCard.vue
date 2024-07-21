<script setup lang="ts">
import { useColor } from '@vuejs-jp/composable'
import Icon from '../icon/Icon.vue'

interface StatusCardProps {
  hasError: boolean
  title: string
  content?: string
}

const props = defineProps<StatusCardProps>()

const { color } = useColor()
</script>

<template>
  <div
    class="status-card"
    :style="{
      background: hasError ? '#FFDAD6' : '#E7EFF7',
    }"
  >
    <div class="status-card-body">
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
    <div
      v-if="content"
      class="status-card-content"
      :style="{
        color: color('sangosyo/200'),
      }"
    >
      {{ content }}
    </div>
  </div>
</template>

<style scoped>
.status-card {
  display: grid;
  place-items: center;
  gap: calc(var(--unit) * 1.5);
  padding: calc(var(--unit) * 3) calc(var(--unit) * 4);
  max-width: 760px;
  color: var(--color-vue-blue);
  border-radius: 8px;
}

.status-card-body {
  display: flex;
  gap: calc(var(--unit) * 1);
}

.title {
  padding: 0;
  margin: 0;
  font-size: 18px;
}

.status-card-content {
  font-size: 18px;
  font-weight: 700;
}

@media screen and (max-width: 768px) {
  .status-card {
    width: 100%;
  }

  .status-card-content {
    text-align: center;
    white-space: pre-wrap;
  }
}
</style>
