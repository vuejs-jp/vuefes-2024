<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { useLocaleCurrent } from '#imports'
import { useSession } from '~/composables/useSession'
import { useColor } from '@vuejs-jp/composable'
import { useRange } from '@vuejs-jp/composable'

import type { Row } from '@vuejs-jp/model'
import type { Color } from '@vuejs-jp/model'

defineProps<{
  rows: Row[]
}>()

const _nuxtLink = computed(() => resolveComponent('NuxtLink'))
const currentLocale = useLocaleCurrent().locale
const { color: trackColor, trackName, getSessionPath } = useSession()
const { color } = useColor()
const { range } = useRange()
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
        <component
          :is="
            row.type && ['handson', 'crosstalk', 'welcome-vuejs-community'].includes(row.type)
              ? _nuxtLink
              : 'p'
          "
          v-if="row.subTitle"
          :to="
            row.type && ['handson', 'crosstalk', 'welcome-vuejs-community'].includes(row.type)
              ? `#${row.type}`
              : ''
          "
          class="sub-title"
          :class="{
            _sponsor_session: row.isSponsor,
            _link:
              row.type && ['handson', 'crosstalk', 'welcome-vuejs-community'].includes(row.type),
          }"
        >
          {{ currentLocale === 'en' ? row.subTitle_en : row.subTitle }}
        </component>
      </div>
      <div
        v-for="session in row.sessions"
        :key="session.id"
        class="session"
        :class="{ _event: row.isEvent }"
      >
        <p v-if="!row.noDisplayTime && session.session_type !== 'lightning-talk'" class="time">
          {{ range(session.session_time_from!, session.session_time_duration!, 'hyphen') }}
        </p>
        <component
          :is="session.detail_page_id ? _nuxtLink : 'div'"
          :to="session.detail_page_id ? getSessionPath(session.detail_page_id) : ''"
          class="session-title"
          :class="{ _keynote_title: row.isOpeningOrKeyNote, _hover: session.detail_page_id }"
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
  gap: 20px;
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
  color: var(--color-vue-blue);
  text-decoration: none;
}
._link:hover {
  opacity: 0.6;
  transition: opacity 0.2s;
}
._sponsor_session {
  color: var(--color-hiwamoegi200);
}
.session {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
._event {
  margin-top: -20px;
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
._hover:hover {
  opacity: 0.6;
  transition: opacity 0.2s;
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
