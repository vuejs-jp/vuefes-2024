<script setup lang="ts">
import { useFetch, useLocaleCurrent } from '#imports'

import type { Timetable } from '@vuejs-jp/model'

const currentLocale = useLocaleCurrent().locale

const { data, error } = await useFetch('/api/timetable')
if (error.value) {
  console.error(error.value)
}

const timetable = data.value as Timetable
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
            <th aria-label="cell" class="time-table-time-cell" />
            <VFTrack color="hiwamoegi">{{
              currentLocale === 'en' ? 'MedPeer Track' : 'メドピアトラック'
            }}</VFTrack>
            <VFTrack color="tohoh">
              {{
                currentLocale === 'en' ? 'MNTSQ Track' : 'MNTSQが全ての合意をフェアにするぞトラック'
              }}
            </VFTrack>
            <VFTrack color="asagi">
              {{ currentLocale === 'en' ? 'kickflow Track' : 'kickflowトラック' }}
            </VFTrack>
            <VFTrack color="sangosyo">
              {{ currentLocale === 'en' ? 'Vue Track' : 'Vueトラック' }}
            </VFTrack>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rows in timetable" :key="rows.time">
            <VFSessionTime>{{ rows.time }}</VFSessionTime>
            <TimeTableRow :rows="rows.rows" />
          </tr>
        </tbody>
      </table>
      <p class="notice">
        {{
          currentLocale === 'en'
            ? '※ Please note that the start and finish times of each session may vary slightly.'
            : '※ 各セッションの開始・終了時間は多少前後する可能性がありますので、あらかじめご了承ください。'
        }}
      </p>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.time-table {
  --time-table-padding: calc(var(--unit) * 15) 1.5%;

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
  width: 100%;
  height: 100%;
  table-layout: fixed;
  margin: 40px 0 0;
  border-spacing: 4px;
}

.time-table-time-cell {
  width: 80px;
}
.notice {
  margin-top: 10px;
  color: var(--color-white);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.5;
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
