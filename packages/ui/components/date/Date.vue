<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'
import { Color } from '@vuejs-jp/model'

export type DateProps = {
  prefixYear?: string
  suffixYear?: string
  date: string
  dayOfWeek?: string
  color?: Color
}

withDefaults(defineProps<DateProps>(), {
  prefixYear: '',
  suffixYear: '',
  dayOfWeek: '',
  color: 'vue-blue',
})

const { fontWeight, fontSize } = useTypography()
const { color: textColor } = useColor()
</script>

<template>
  <div class="datewrapper">
    <!-- prefix year -->
    <span
      v-if="prefixYear"
      :style="{
        color: textColor(color),
      }"
      class="year prefix-year"
    >
      {{ prefixYear }}
    </span>
    <!-- date -->
    <span
      :style="{
        color: textColor(color),
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
        background: textColor(color === 'vue-blue' ? 'vue-blue' : 'white'),
        color: textColor(color === 'vue-blue' ? 'white' : 'vue-blue'),
      }"
      class="day-of-week"
    >
      {{ dayOfWeek }}
    </span>
    <!-- suffix year -->
    <span
      v-if="suffixYear"
      :style="{
        color: textColor(color),
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
  font-weight: 600;
}
.prefix-year {
  margin-right: 6px;
}
.suffix-year {
  margin-left: 6px;
}

.date {
  display: inline-block;
  font-size: 45px;
  font-weight: 600;
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

/*
メディアクエリの読み込みができなかったため、一旦コメントアウト
@import url('~/assets/media.css');
@custom-media --tablet (width <= 768px);
@custom-media --mobile (width <= 480px);
*/
@media (width <= 768px) {
  .year {
    font-size: 18px;
  }

  .date {
    font-size: 38px;
  }
}
</style>
