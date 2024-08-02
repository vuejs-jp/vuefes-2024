<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

interface Track {
  track?: string
  colspan?: number
  rowspan?: number
  isClose?: boolean
  sessions?: any
  isTranslation?: boolean
}

const props = defineProps<{
  tracks: Track[]
}>()

const _nuxtLink = computed(() => resolveComponent('NuxtLink'))
</script>

<template>
  <VFSessionContent
    v-for="track in props.tracks"
    :key="track.track"
    :colspan="track.colspan"
    :rowspan="track.rowspan"
  >
    <div v-for="session in track.sessions" :key="session.title">
      <div v-if="session.isTranslation">同時通訳あり</div>
      <p v-if="session.subTitle">{{ session.subTitle }}</p>
      <component
        :is="session.id ? _nuxtLink : 'div'"
        :to="
          session.id
            ? session.sponsorSession
              ? `/sponsor-sessions/${session.id}`
              : `/sessions/${session.id}`
            : ''
        "
      >
        {{ session.title }}
      </component>
      <div v-if="session.speaker">
        {{ session.speaker }}
      </div>
    </div>
  </VFSessionContent>
</template>

<style scoped></style>
