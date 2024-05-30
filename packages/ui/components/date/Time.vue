<script setup lang="ts">
import { useColor } from '@vuejs-jp/composable'

export type TimeProps = {
  hour: string
  minute: string
  ampm?: 'am' | 'pm'
}

defineProps<TimeProps>()

const { color } = useColor()
</script>

<template>
  <div class="timewrapper">
    <span
      v-if="hour"
      :style="{
        color: color('vue-blue'),
      }"
      class="hour"
    >
      {{ hour }}
    </span>
    <span v-if="minute" class="separator">{{ `:` }}</span>
    <span
      :style="{
        color: color('vue-blue'),
      }"
      class="minute"
    >
      {{ minute }}
    </span>
    <span
      v-if="ampm"
      :style="{
        color: color('vue-blue'),
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

.hour, .minute, .separator {
  display: inline-block;
  font-size: 45px;
  font-weight: 600;
}
.ampm {
  font-size: 24px;
  font-weight: 600;
}
</style>
