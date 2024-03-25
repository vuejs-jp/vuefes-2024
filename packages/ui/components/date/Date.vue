<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'

export type DateProps = {
  year?: number
  date: string
  dayOfWeek: string
}

// eslint-disable-next-line no-unused-vars
const props = defineProps<DateProps>()

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <div class="date">
    <span
      v-if="year"
      :style="{
        fontSize: fontSize('heading/300'),
        color: color('vue-blue'),
      }"
      class="year"
    >
      {{ year }}
    </span>
    <span
      :style="{
        fontSize: fontSize('heading/700'),
        color: color('vue-blue'),
      }"
      class="date"
    >
      {{ date }}
    </span>
    <span
      :style="{
        fontSize: fontSize('other/200'),
        fontWeight: fontWeight('other/200'),
        background: color('vue-blue'),
        color: color('white'),
      }"
      class="day-of-week"
    >
      {{ dayOfWeek }}
    </span>
  </div>
</template>

<style scoped>
.date {
  .year {
    margin-right: 6px;
    font-size: 24px;
  }
  .date {
    font-size: 45px;
  }
  .day-of-week {
    padding: 4px;
    width: 20px;
    height: 20px;
    border-radius: 2px;
  }
}
</style>
