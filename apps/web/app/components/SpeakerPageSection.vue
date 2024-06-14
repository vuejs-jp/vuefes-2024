<script setup lang="ts">
import { ref } from 'vue'

type Speaker = {
  id: string
  name: string
  image: string
  company: string
  division: string
  githubId?: string
  xId?: string

  // id: string
  // name: string
  // image_url: string
  // caption_ja: string
  // caption_en: string
  // description_ja: string
  // description_en: string
  // github_url: string
  // x_url: string
  // session_title_ja: string
  // session_title_en: string
  // session_description_ja: string
  // session_description_en: string
  // session_comment_ja: string
  // session_comment_en: string
  // session_place: string
  // session_time_from: string
  // session_time_duration: number
  // session_doc_title_ja: string
  // session_doc_title_en: string
  // session_doc_url: string
  // created_at: string
  // updated_at: string
}

const speakers = ref<Speaker[]>([
  {
    id: '',
    name: 'Evan You',
    company: '',
    division: 'Creator of Vue / Vite',
    githubId: 'yyx990803',
    xId: 'youyuxi',
    image: '/speaker/evan-you.png',
  },
  {
    id: '',
    name: 'Anthony Fu',
    company: '',
    division: 'Vue/Vite/Nuxt Core Team Member',
    githubId: 'antfu',
    xId: 'antfu7',
    image: '/speaker/anthony-fu.png',
  },
  {
    id: '',
    name: 'Boshen Chen',
    company: '',
    division: 'Creator of Oxc',
    githubId: 'boshen',
    xId: 'boshen_c',
    image: '/speaker/boshen-chen.png',
  },
  {
    id: '',
    name: 'Kevin Deng',
    company: '',
    division: 'Vue Core Team Member / Creator of Vue Vapor',
    githubId: 'sxzz',
    xId: 'sanxiaozhizi',
    image: '/speaker/kevin-deng.png',
  },
  {
    id: '',
    name: 'Pooya Parsa',
    company: '',
    division: 'Creator of Nitro and UnJS, Nuxt core team',
    githubId: 'pi0',
    xId: '_pi0_',
    image: '/speaker/pooya-parsa.png',
  },
])
</script>

<template>
  <div class="speaker">
    <SpeakerCfp />

    <article class="speaker-body">
      <div class="speaker-text">
        <MarkDownText path="speaker" />
      </div>

      <section class="speaker-section">
        <h3 class="speaker-subtitle">Session</h3>
        <ul class="speaker-cards">
          <li v-for="speaker in speakers" :key="speaker.id" class="speaker-card">
            <VFSpeaker
              :image="speaker.image"
              :company="speaker.company"
              :division="speaker.division"
              :name="speaker.name"
              :github-id="speaker.githubId"
              :x-id="speaker.xId"
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

.title {
  text-align: center;
  line-height: 1.2;
}

.speaker-body {
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

  .speaker-body {
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
