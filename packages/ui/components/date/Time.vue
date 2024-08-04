<script setup lang="ts">
import { useColor } from '@vuejs-jp/composable'
import { Color } from '@vuejs-jp/model'

export type TimeProps = {
  hour: string
  minute: string
  ampm?: 'am' | 'pm' | ''
  color?: Color
}

withDefaults(defineProps<TimeProps>(), {
  color: 'vue-blue',
  ampm: '',
})

const { color: textColor } = useColor()
</script>

<template>
  <div class="timewrapper">
    <span
      v-if="hour"
      :style="{
        color: textColor(color),
      }"
      class="hour"
    >
      {{ hour }}
    </span>
    <span v-if="minute" class="separator">{{ `:` }}</span>
    <span
      :style="{
        color: textColor(color),
      }"
      class="minute"
    >
      {{ minute }}
    </span>
    <span
      v-if="ampm"
      :style="{
        color: textColor(color),
      }"
      class="ampm"
    >
      {{ ampm === 'am' ? 'a.m.' : 'p.m.' }}
    </span>
  </div>
</template>

<style scoped>
.timewrapper {
  display: inline;
  line-height: 1;
}

.hour,
.minute,
.separator {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
}
.ampm {
  font-size: 24px;
  font-weight: 600;
}

/*
メディアクエリの読み込みができなかったため、一旦コメントアウト
@import url('~/assets/media.css');
@custom-media --tablet (width <= 768px);
@custom-media --mobile (width <= 480px);
*/
@media (width <= 768px) {
  .hour,
  .minute,
  .separator {
    font-size: 18px;
    line-height: 1.5;
  }
}
</style>
