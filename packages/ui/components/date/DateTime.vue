<script setup lang="ts">
import Date from './Date.vue'
import Time from './Time.vue'
import type { DateProps } from './Date.vue'
import type { TimeProps } from './Time.vue'

type DateTimeProps = {
  date: DateProps
  time: TimeProps
}

defineProps<DateTimeProps>()
</script>

<template>
  <div class="date-time">
    <Date v-bind="{ ...date }" />
    <Time v-bind="{ ...time }" />
  </div>
</template>

<style scoped>
.date-time {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
}
</style>
