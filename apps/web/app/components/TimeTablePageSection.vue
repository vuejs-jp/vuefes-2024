<script setup lang="ts">
import { useFetch, useLocaleCurrent } from '#imports'

import type { Timetable } from '@vuejs-jp/model'

const currentLocale = useLocaleCurrent().locale

const { data, error } = await useFetch('/api/timetable')
if (error.value) {
  console.error(error.value)
}

const timetablePc = (data.value as { pcData: Timetable })?.pcData
const timetableSp = (data.value as { spData: Timetable })?.spData
</script>

<template>
  <div class="time-table">
    <article class="time-table-body">
      <VFTitle id="timetable" class="title" color="white">
        {{ $t('time-table.title') }}
      </VFTitle>

      <!-- PC用 -->
      <table class="time-table-content">
        <thead>
          <tr>
            <th aria-label="cell" class="time-table-time-cell" />
            <VFTrack color="hiwamoegi">メドピアトラック</VFTrack>
            <VFTrack color="tohoh">MNTSQが全ての合意をフェアにするぞトラック</VFTrack>
            <VFTrack color="asagi">kickflowトラック</VFTrack>
            <VFTrack color="sangosyo">Vueトラック</VFTrack>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rows in timetablePc" :key="rows.time">
            <VFSessionTime>{{ rows.time }}</VFSessionTime>
            <TimeTableRow :rows="rows.rows" />
          </tr>
        </tbody>
      </table>

      <!-- SP用 -->
      <div v-for="rows in timetableSp" :key="rows.time" class="time-table-content-sp">
        <div class="time-table-content-sp-inner">
          <VFSessionTime>{{ rows.time }}</VFSessionTime>
          <TimeTableCard :rows="rows.rows" />
        </div>
      </div>

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
@import url('../assets/media.css');

.time-table {
  --time-table-padding: calc(var(--unit) * 15) 1.5%;

  background-image: url('/sponsor/sponsor-bg-grid.png'), linear-gradient(to top, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: overlay;
  width: 100%;
  padding: var(--time-table-padding);
  color: var(--color-vue-blue);

  @media (--tablet) {
    --time-table-padding: calc(var(--unit) * 7.5) 6%;
  }
}

.title {
  text-align: center;
  line-height: 1.2;
}

.time-table-body {
  margin: 0 auto;
  max-width: 960px;
}

.time-table-content {
  width: 100%;
  height: 100%;
  table-layout: fixed;
  margin: 40px 0 0;
  border-spacing: 4px;

  @media (--tablet) {
    display: none;
  }
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

  @media (--tablet) {
    margin-top: 13px;
    font-size: 10px;
  }
}

.time-table-content-sp {
  display: none;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  table-layout: fixed;
  margin: 30px 0 0;
  border-spacing: 4px;

  @media (--tablet) {
    display: flex;
  }
}

.time-table-content-sp-inner {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
