<script setup lang="ts">
import Date from './Date.vue'
import Time from './Time.vue'
import type { DateProps } from './Date.vue'
import type { TimeProps } from './Time.vue'
import { Color } from '@vuejs-jp/model'

type DateTimeProps = {
  date: DateProps
  time: TimeProps
  color?: Color
}

withDefaults(defineProps<DateTimeProps>(), {
  color: 'vue-blue',
})
</script>

<template>
  <div class="date-time" :style="{ color }">
    <Date v-bind="{ ...date, color }" />
    <Time v-bind="{ ...time, color }" />
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
