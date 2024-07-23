<script setup lang="ts">
import { useI18n } from '#i18n'
import { useFetch, useLocaleCurrent, useRuntimeConfig } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'

const config = useRuntimeConfig()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t } = useI18n()
const { translate } = useTranslation()

const currentLocale = useLocaleCurrent().locale
</script>

<template>
  <div class="time-table">
    <article class="time-table-body">
      <VFTitle id="time-table" class="title">
        {{ $t('time-table.title') }}
      </VFTitle>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.time-table {
  --time-table-padding: calc(var(--unit) * 5.25) 0;
  --time-table-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);
  --time-table-term-margin: calc(var(--unit) * 5) auto 0;

  display: flex;
  justify-content: center;
  background-image: url('/sponsor/sponsor-bg-grid.png'),
    linear-gradient(to bottom, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: overlay;
  padding: var(--time-table-padding);
  color: var(--color-vue-blue);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.time-table-body {
  margin: 0 auto;
  padding: var(--time-table-body-padding);
  margin: 0 1.5%;
  background-color: white;
  max-width: 960px;
}

@media (--tablet) {
  .time-table {
    --time-table-padding: calc(var(--unit) * 2) 0;
    --time-table-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --time-table-term-margin: calc(var(--unit) * 5) auto 0;
  }
}

@media (--mobile) {
}
</style>
