<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'

const { t } = useI18n()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <div class="namecard-base-layout">
    <h1
      :style="{
        fontWeight: fontWeight('heading/700'),
        fontSize: fontSize('heading/700'),
        color: color('vue-blue'),
      }"
      class="title"
    >
      {{ t('namecard.title_edit') }}
    </h1>
    <slot />
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.namecard-base-layout {
  --header-height: calc(var(--unit) * 10);
  padding-top: calc(var(--header-height) + var(--unit) * 15);
  max-width: 769px;
  margin: 0 auto;
}
.title {
  margin-bottom: calc(var(--unit) * 5);
  text-align: center;
}
</style>
