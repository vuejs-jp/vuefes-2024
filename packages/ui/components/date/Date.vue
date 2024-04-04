<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'

export type DateProps = {
  year?: number
  date: string
  dayOfWeek?: string
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
        marginRight: dayOfWeek ? '18px' : '0',
      }"
      class="day"
    >
      {{ date }}
      <span
        v-if="dayOfWeek"
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
    </span>
  </div>
</template>

<style scoped>
.date {
  height: 45px;
  .year {
    margin-right: 6px;
    font-size: 24px;
  }
  .day {
    font-size: 45px;
    position: relative;
    .day-of-week {
      position: absolute;
      top: 50%;
      right: -24px;
      text-align: center;
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
  }
}
</style>
