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
  size?: 'small' | 'medium'
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

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

const style = computed(() => {
  const baseStyle = {
    color: color('white'),
    backgroundColor: backgroundColor.value,
  }
  switch (props.size) {
    case 'small':
      return {
        ...baseStyle,
        height: '24px',
        borderRadius: '24px',
        padding: '0 20px',
        fontWeight: fontWeight('heading/700'),
        fontSize: fontSize('body/100'),
      }
    default:
      return {
        ...baseStyle,
        height: '38px',
        borderRadius: '38px',
        padding: '0 38px',
        fontWeight: fontWeight('heading/700'),
        fontSize: fontSize('heading/200'),
      }
  }
})
</script>

<template>
  <div class="creation-status-root" :style="style">
    {{ t(`namecard.creation_status.${statusKey}`) }}
  </div>
</template>

<style scoped>
.creation-status-root {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
</style>
