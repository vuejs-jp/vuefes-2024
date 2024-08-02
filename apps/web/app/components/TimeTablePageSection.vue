<script setup lang="ts">
import { useI18n } from '#i18n'
import { useFetch, useLocaleCurrent, useRuntimeConfig } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'
import TimeTableRow from '@/components/time-table/TimeTableRow.vue'

import type { TimeTable } from '@vuejs-jp/model'

const config = useRuntimeConfig()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t } = useI18n()
const { translate } = useTranslation()

const currentLocale = useLocaleCurrent().locale

const { data, error } = await useFetch('/api/timetable')
if (error.value) {
  console.error(error.value)
}

const timeTables = data.value.timeTable as TimeTable
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
            <th aria-label="cell" />
            <VFTrack color="hiwamoegi">メドピアトラック</VFTrack>
            <VFTrack color="tohoh">MNTSQ 全ての合意をフェアにするトラック</VFTrack>
            <VFTrack color="asagi">kickflowトラック</VFTrack>
            <VFTrack color="sangosyo">Vueトラック</VFTrack>
          </tr>
        </thead>
        <tbody>
          <tr v-for="timeTable in timeTables" :key="timeTable.time">
            <VFSessionTime>{{ timeTable.time }}</VFSessionTime>
            <TimeTableRow :tracks="timeTable.tracks" />
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
  --time-table-padding: calc(var(--unit) * 5.25) 1.5%;

  background-image: url('/sponsor/sponsor-bg-grid.png'), linear-gradient(to top, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: overlay;
  width: 100%;
  padding: var(--time-table-padding);
  color: var(--color-vue-blue);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.time-table-body {
  margin: 0 auto;
  max-width: 960px;
}

.time-table-table {
  margin: 40px 0 0;
  border-spacing: 4px;
}

@media (--tablet) {
  .time-table {
    --time-table-padding: calc(var(--unit) * 2) 1.5%;
    --time-table-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
  }
}

@media (--mobile) {
}
</style>
