<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'

export type DateProps = {
  prefixYear?: string
  suffixYear?: string
  date: string
  dayOfWeek?: string
}

defineProps<DateProps>()

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <div class="datewrapper">
    <!-- prefix year -->
    <span
      v-if="prefixYear"
      :style="{
        fontSize: fontSize('heading/300'),
        color: color('vue-blue'),
      }"
      class="year prefix-year"
    >
      {{ prefixYear }}
    </span>
    <!-- date -->
    <span
      :style="{
        fontSize: fontSize('heading/700'),
        color: color('vue-blue'),
      }"
      class="date"
    >
      {{ date }}
    </span>
    <!-- day -->
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
    <!-- suffix year -->
    <span
      v-if="suffixYear"
      :style="{
        fontSize: fontSize('heading/300'),
        color: color('vue-blue'),
      }"
      class="year suffix-year"
    >
      {{ suffixYear }}
    </span>
  </div>
</template>

<style scoped>
.datewrapper {
  display: inline;
  line-height: 1;
}

.year {
  display: inline-block;
  font-size: 24px;
}
.prefix-year {
  margin-right: 6px;
}
.suffix-year {
  margin-left: 6px;
}

.date {
  display: inline-block;
  letter-spacing: 0.2rem;
}

.day-of-week {
  position: relative;
  top: -4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-left: 4px;
}
</style>
