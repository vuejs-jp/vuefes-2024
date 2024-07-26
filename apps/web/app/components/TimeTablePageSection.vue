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
      <VFTitle id="time-table" class="title" color="white">
        {{ $t('time-table.title') }}
      </VFTitle>

      <table class="time-table-table">
        <thead>
          <tr>
            <th />
            <VFTrack color="hiwamoegi">トラックA</VFTrack>
            <VFTrack color="tohoh">トラックB</VFTrack>
            <VFTrack color="asagi">トラックC</VFTrack>
            <VFTrack color="sangosyo">トラックD</VFTrack>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VFSessionTime>10:00</VFSessionTime>
            <VFSessionContent>開会式</VFSessionContent>
            <VFSessionContent>開会式</VFSessionContent>
            <VFSessionContent>開会式</VFSessionContent>
            <VFSessionContent>開会式</VFSessionContent>
          </tr>
          <tr>
            <VFSessionTime>10:30</VFSessionTime>
            <VFSessionContent>セッション1</VFSessionContent>
            <VFSessionContent>セッション2</VFSessionContent>
            <VFSessionContent>セッション3</VFSessionContent>
            <VFSessionContent>セッション4</VFSessionContent>
          </tr>
        </tbody>
      </table>
      <p>
        ※各セッションの開始・終了時間は多少前後する可能性がありますので、あらかじめご了承ください。
      </p>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.time-table {
  --time-table-padding: calc(var(--unit) * 5.25) 0;
  --time-table-term-margin: calc(var(--unit) * 5) auto 0;

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
  width: 100%;
  margin: 0 1.5%;
  max-width: 960px;
}

.time-table-table {
  margin: 40px 0 0;
  border-spacing: 4px;
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
