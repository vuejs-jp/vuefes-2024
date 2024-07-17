<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'

const { t } = useI18n()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
export type Status = 'not_created' | 'inquiry_in_progress' | 'inquiry_failed' | 'inquiry_completed'
type Props = {
  statusKey: Status
}
const props = defineProps<Props>()

const backgroundColor = computed(() => {
  switch (props.statusKey) {
    case 'inquiry_in_progress':
      return color('tohoh/200')
    case 'inquiry_failed':
      return color('sangosyo/200')
    case 'inquiry_completed':
      return color('hiwamoegi/200')
    default:
      return color('gray/100')
  }
})
</script>

<template>
  <div
    class="creation-status-root"
    :style="{
      fontWeight: fontWeight('heading/700'),
      fontSize: fontSize('heading/200'),
      color: color('white'),
      backgroundColor: backgroundColor,
    }"
  >
    {{ t(`namecard.creation_status.${statusKey}`) }}
  </div>
</template>

<style scoped>
.creation-status-root {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  border-radius: 38px;
  padding: 0 38px;
}
</style>
