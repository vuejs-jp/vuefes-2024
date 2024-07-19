<script setup lang="ts">
import { useFetch } from '#imports'
import SpeakerCfp from '~/components/speaker/SpeakerCfp.vue'
import { useLocaleCurrent } from '@/composables/useLocaleCurrent'
import type { SpeakerCategory, SpeakerInfo } from '@vuejs-jp/model'

type _SpeakerCategory = Extract<SpeakerCategory, 'sessionSpeakers' | 'lightningTalkSpeakers' | 'sponsorSessionSpeakers'>
type Speakers = Record<_SpeakerCategory, SpeakerInfo>

const currentLocale = useLocaleCurrent().locale

const { data, error } = await useFetch('/api/speakers')
if (error.value) {
  console.error(error.value)
}
const { sessionSpeakers, lightningTalkSpeakers, sponsorSessionSpeakers } = data.value as Speakers
</script>

<template>
  <div class="speaker">
    <article class="speaker-body-wrapper">
      <SpeakerCfp />

      <div class="speaker-text">
        <MarkDownText path="speaker" />
      </div>

      <section id="sessions" class="speaker-section">
        <h3 class="speaker-subtitle">Sessions</h3>
        <ul class="speaker-cards">
          <li v-for="speaker in sessionSpeakers.list" :key="speaker.id" class="speaker-card">
            <VFSpeaker
              :image="speaker.image_url"
              :company="currentLocale === 'en' ? speaker.caption_en : speaker.caption_ja"
              :division="currentLocale === 'en' ? speaker.description_en : speaker.description_ja"
              :name="currentLocale === 'en' ? speaker.name_en : speaker.name_ja"
              :github-id="speaker.github_id"
              :x-id="speaker.x_id"
            />
          </li>
        </ul>
      </section>

      <section v-if="lightningTalkSpeakers.list.length !== 0" id="lightning-talks" class="speaker-section">
        <h3 class="speaker-subtitle">Lightning Talks</h3>
        <ul class="speaker-cards">
          <li v-for="speaker in lightningTalkSpeakers.list" :key="speaker.id" class="speaker-card">
            <VFSpeaker
              :image="speaker.image_url"
              :company="currentLocale === 'en' ? speaker.caption_en : speaker.caption_ja"
              :division="currentLocale === 'en' ? speaker.description_en : speaker.description_ja"
              :name="currentLocale === 'en' ? speaker.name_en : speaker.name_ja"
              :github-id="speaker.github_id"
              :x-id="speaker.x_id"
            />
          </li>
        </ul>
      </section>

      <section v-if="sponsorSessionSpeakers.list.length !== 0" id="sponsor-sessions" class="speaker-section">
        <h3 class="speaker-subtitle">Sponsor Sessions</h3>
        <ul class="speaker-cards">
          <li v-for="speaker in sponsorSessionSpeakers.list" :key="speaker.id" class="speaker-card">
            <VFSpeaker
              :image="speaker.image_url"
              :company="currentLocale === 'en' ? speaker.caption_en : speaker.caption_ja"
              :division="currentLocale === 'en' ? speaker.description_en : speaker.description_ja"
              :name="currentLocale === 'en' ? speaker.name_en : speaker.name_ja"
              :github-id="speaker.github_id"
              :x-id="speaker.x_id"
            />
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.speaker {
  --speaker-padding: calc(var(--unit) * 7.5) 0;
  --speaker-row-gap: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: var(--speaker-row-gap);
  padding: var(--speaker-padding);
  color: var(--color-vue-blue);
  position: relative;
  background-image: linear-gradient(#ebf0f5, #fff);

  &::before {
    content: '';
    position: absolute;
    display: block;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url('/form-bg.png');
    background-size: auto;
    background-repeat: repeat;
    background-position: top left;
    opacity: 0.8;
    mix-blend-mode: overlay;
  }
}

.speaker-body-wrapper {
  margin: 0 1.5%;
  max-width: calc(960px + 6%);
  isolation: isolate;
}

.speaker-text {
  --speaker-text-padding: 0 calc(var(--unit) * 12 + 6%);
  --speaker-text-font-size: 1.125rem;
  --speaker-text-font-weight: 500;

  padding: var(--speaker-text-padding);
  color: var(--color-vue-blue);
  font-size: var(--speaker-text-font-size);
  font-weight: var(--speaker-text-font-weight);
  line-height: 1.8;
}

.speaker-section {
  --speaker-section-margin: calc(var(--unit) * 7.5) 0;
  --speaker-section-padding: 0 3%;

  margin: var(--speaker-section-margin);
  padding: var(--speaker-section-padding);
}

.speaker-subtitle {
  --speaker-subtitle-font-size: 2rem;
  --speaker-subtitle-font-weight: 800;

  font-size: var(--speaker-subtitle-font-size);
  font-weight: var(--speaker-subtitle-font-weight);
  line-height: normal;
  background: var(--color-vue-green-gradation);
  background-clip: text;
  color: transparent;
}

.speaker-cards {
  --speaker-cards-margin: calc(var(--unit) * 7.5) 0 0;
  --speaker-cards-gap: 58px 30px;

  margin: var(--speaker-cards-margin);
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--speaker-cards-gap);
}

@media (--tablet) {
  .speaker {
    --speaker-padding: calc(var(--unit) * 2) 0;
    --speaker-row-gap: 0px;
  }

  .speaker-body-wrapper {
    --speaker-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }

  .speaker-text {
    --speaker-text-padding: 0 4.5%;
    --speaker-text-font-size: 1rem;
  }

  .speaker-section {
    --speaker-section-margin: calc(var(--unit) * 6.25) 0;
  }

  .speaker-cards {
    --speaker-cards-margin: calc(var(--unit) * 3.5) 0 0;
    --speaker-cards-gap: 43px 14px;

    grid-template-columns: repeat(2, 1fr);
    gap: var(--speaker-cards-gap);
  }
}
</style>
