<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { useLocaleCurrent } from '#imports'
import { useSession } from '~/composables/useSession'
import { useColor } from '@vuejs-jp/composable'

import type { Row } from '@vuejs-jp/model'
import type { Color } from '@vuejs-jp/model'

defineProps<{
  rows: Row[]
}>()

const _nuxtLink = computed(() => resolveComponent('NuxtLink'))

const currentLocale = useLocaleCurrent().locale

const { color: trackColor, trackName } = useSession()
const { color } = useColor()

function formatTime(timeFrom: string, duration: number): string {
  const formattedTimeFrom = new Date(timeFrom).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const formattedTimeTo = new Date(
    new Date(timeFrom).getTime() + duration * 60 * 1000,
  ).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${formattedTimeFrom} - ${formattedTimeTo}`
}
</script>

<template>
  <div v-for="row in rows" :key="row.title" class="card">
    <div class="header">
      <div
        v-if="row.track"
        class="track"
        :style="{ backgroundColor: color(trackColor(row.track) as Color) }"
      >
        {{ trackName(row.track) }}
      </div>
      <div v-if="row.isTranslation" class="translation">
        <VFIcon color="vue-blue" name="translation" class="translation-icon" />
        {{ currentLocale === 'en' ? 'Simultaneous interpretation' : '同時通訳あり' }}
      </div>
    </div>
    <div class="detail" :class="{ _noTrackName: !row.track }">
      <div v-if="row.title || row.subTitle" class="tittle-wrapper">
        <p v-if="row.time" class="time">{{ row.time }}</p>
        <p v-if="row.title" class="title">
          {{ currentLocale === 'en' ? row.title_en : row.title }}
        </p>
        <p v-if="row.subTitle" class="sub-title" :class="{ _sponsor_session: row.isSponsor }">
          {{ currentLocale === 'en' ? row.subTitle_en : row.subTitle }}
        </p>
      </div>
      <div v-for="session in row.sessions" :key="session.id" class="session">
        <p v-if="!row.noDisplayTime" class="time">
          {{ formatTime(session.session_time_from!, session.session_time_duration!) }}
        </p>
        <component
          :is="session.detail_page_id ? _nuxtLink : 'div'"
          :to="session.detail_page_id ? `/sessions/${session.detail_page_id}` : ''"
          class="session-title"
          :class="{ _keynote_title: row.isOpeningOrKeyNote }"
        >
          {{ currentLocale === 'en' ? session.session_title_en : session.session_title_ja }}
        </component>
        <p
          v-if="session.name_ja"
          class="session-speaker"
          :class="{ _keynote_speaker: row.isOpeningOrKeyNote }"
        >
          {{ currentLocale === 'en' ? session.name_en : session.name_ja }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
}
.header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.track {
  padding: 3px 10px;
  color: var(--color-white);
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  width: fit-content;
}
.translation {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
}
.translation-icon {
  width: 12px;
  height: 12px;
}
.detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 20px 20px;
  color: var(--color-vue-blue);
  white-space: pre-wrap;
}
._noTrackName {
  padding-bottom: 10px;
}
.title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
}
.sub-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
}
._sponsor_session {
  color: var(--color-hiwamoegi200);
}
.session {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.time {
  font-size: 12px;
  font-weight: 400;
}
.session-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  color: var(--color-vue-blue);
}
.session-speaker {
  font-size: 12px;
  font-weight: 400;
}
._keynote_title {
  font-size: 12px;
  font-weight: 400;
}
._keynote_speaker {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
}
</style>
