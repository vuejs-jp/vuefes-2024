<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'

const { t } = useI18n()
const { fontWeight } = useTypography()
const { color } = useColor()
</script>

<template>
  <div class="namecard-base-layout">
    <h1
      :style="{
        fontWeight: fontWeight('heading/700'),
        color: color('vue-blue'),
      }"
      class="title"
    >
      {{ t('namecard.title_edit') }}
    </h1>
    <slot />
  </div>
  <slot name="large-container" />
</template>

<style scoped>
@import url('~/assets/media.css');

.namecard-base-layout {
  --header-height: calc(var(--unit) * 10);
  --content-padding: calc(var(--unit) * 15);
  padding-top: calc(var(--header-height) + var(--content-padding));
  padding-bottom: var(--content-padding);
  max-width: 769px;
  margin: 0 auto;
}
.title {
  --title-size: var(--font-size-heading700);
  font-size: var(--title-size);
  margin-bottom: calc(var(--unit) * 5);
  text-align: center;
  font-size: 36px;

  @media (--mobile) {
    font-size: 28px;
  }
}

@media (--mobile) {
  .namecard-base-layout {
    --header-height: calc(var(--unit) * 9);
    --content-padding: calc(var(--unit) * 7.5);
    padding-left: 23.5px;
    padding-right: 23.5px;
  }
  .title {
    --title-size: var(--font-size-heading400);
  }
}
</style>
