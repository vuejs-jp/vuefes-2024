<script setup lang="ts">
import Date from './Date.vue'
import type { DateProps } from './Date.vue'
import { useColor, useTypography } from '@vuejs-jp/composable'

type DatePeriodProps = {
  start: DateProps
  end: DateProps
}

// eslint-disable-next-line no-unused-vars
const props = defineProps<DatePeriodProps>()

const { fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <div class="date-period">
    <Date v-bind="{ ...start }" />
    <div
      :style="{
        fontSize: fontSize('heading/100'),
        color: color('vue-blue'),
      }"
      class="separator"
    >
      ー
    </div>
    <Date v-bind="{ ...end }" />
  </div>
</template>

<style scoped>
.date-period {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
