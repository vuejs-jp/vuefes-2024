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
        padding: '0 20px',
        fontWeight: fontWeight('heading/700'),
      }
    default:
      return {
        ...baseStyle,
        padding: '0 38px',
        fontWeight: fontWeight('heading/700'),
      }
  }
})
</script>

<template>
  <div class="creation-status-root" :style="style" :class="size">
    {{ t(`namecard.creation_status.${statusKey}`) }}
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.creation-status-root {
  --height: 38px;
  --font-size: var(--font-size-heading200);

  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: var(--height);
  border-radius: var(--height);
  font-size: var(--font-size);
}
.small {
  --height: 24px;
  --font-size: var(--font-size-body100);
}

@media (--mobile) {
  .creation-status-root {
    --height: 22px;
    --font-size: var(--font-size-body100);
  }
}
</style>
