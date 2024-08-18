<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { useLocaleCurrent } from '#imports'
import type { Row } from '@vuejs-jp/model'

defineProps<{
  rows: Row[]
}>()

const _nuxtLink = computed(() => resolveComponent('NuxtLink'))

const currentLocale = useLocaleCurrent().locale
</script>

<template>
  <VFSessionContent
    v-for="row in rows"
    :key="row.sessions"
    :colspan="row.colspan"
    :rowspan="row.rowspan"
    :is-close="row.isClose"
    :track="row.track"
  >
    <div class="wrapper">
      <div v-if="row.title || row.subTitle" class="tittle-wrapper">
        <p v-if="row.title" class="title">
          {{ currentLocale === 'en' ? row.title_en : row.title }}
        </p>
        <p v-if="row.subTitle" class="sub-title" :class="{ _sponsor_session: row.isSponsor }">
          {{ currentLocale === 'en' ? row.subTitle_en : row.subTitle }}
        </p>
      </div>
      <div v-for="session in row.sessions" :key="session.id" class="session">
        <!-- <div v-if="session.isTranslation" class="translation">同時通訳あり</div> -->
        <div v-if="row.isTranslation" class="translation">
          <VFIcon color="vue-blue" name="translation" />
          {{ currentLocale === 'en' ? 'Simultaneous interpretation' : '同時通訳あり' }}
        </div>
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
  </VFSessionContent>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  white-space: pre-wrap;
}
.tittle-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}
.sub-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}
._sponsor_session {
  color: var(--color-hiwamoegi200);
}
.speaker {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}
.translation {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.8;
}
.session {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.session-title {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  color: var(--color-vue-blue);
}
.session-name {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
}
.session-speaker {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
}
._keynote_title {
  font-size: 14px;
  font-weight: 400;
}
._keynote_speaker {
  font-size: 18px;
  font-weight: 700;
}
</style>
