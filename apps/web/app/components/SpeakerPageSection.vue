<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'
import { useLocaleCurrent } from '@/composables/useLocaleCurrent'
import { cfpEnUrl, cfpJaUrl } from '~/utils/constants'

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
    githubId: 'kazupon',
    xId: '_pi0_',
    image: '/speaker/pooya-parsa.png',
  },
])

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t } = useI18n()
const { translate } = useTranslation()

const currentLocale = useLocaleCurrent().locale

const endPeriodDate = {
  prefixYear: t('prefix_year'),
  suffixyear: t('suffix_year'),
  date: t('speaker.end_date'),
  dayOfWeek: translate('day_of_week.sunday'),
}
const endPeriodTime = {
  hour: t('speaker.end_hour'),
  minute: t('speaker.end_minute'),
  ampm: currentLocale.value === 'en' && t('speaker.end_ampm'),
}
</script>

<template>
  <div class="speaker">
    <article class="cfp-body">
      <VFTitle id="speakers" class="title">
        {{ $t('speaker.title') }}
      </VFTitle>

      <div class="cfp-text">
        <MarkDownText path="speaker_cfp" />
      </div>

      <h3 class="cfp-subtitle">
        {{ $t('speaker.application_period') }}
      </h3>
      <div class="cfp-end-period">
        <span class="cfp-end-period-text"> {{ $t('speaker.application_period_before') }} </span>
        <div class="cfp-end-period--inner">
          <VFDateTime :date="endPeriodDate" :time="endPeriodTime" />
          <span v-if="currentLocale !== 'en'" class="cfp-end-period-text">
            {{ $t('speaker.application_period_after') }}</span
          >
        </div>
      </div>

      <div class="cfp-buttons">
        <VFLinkButton
          class="cfp-button"
          :href="currentLocale !== 'en' ? cfpJaUrl : cfpEnUrl"
          background-color="vue-green/200"
          color="white"
        >
          {{ $t('speaker.apply') }}
        </VFLinkButton>
      </div>

      <div
        class="cfp-more-information"
        :style="{
          fontWeight: fontWeight('body/200'),
          fontSize: fontSize('body/400'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="speaker_information" />
      </div>
    </article>

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

/* 追加分（後で移動） */
.speaker-body {
  margin: 0 1.5%;
  max-width: 960px;
  isolation: isolate;
}

.speaker-text {
  --speaker-text-padding: 0 calc(var(--unit) * 12);
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

  margin: var(--speaker-section-margin);
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--speaker-cards-gap);
}
/* ここまで */

.speaker {
  --speaker-padding: calc(var(--unit) * 7.5) 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;
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

.cfp-body {
  --speaker-cfp-padding: calc(var(--unit) * 7.5) calc(var(--unit) * 12);

  height: fit-content;
  margin: 0 1.5%;
  padding: var(--speaker-cfp-padding);
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  max-width: 960px;
  isolation: isolate;
}

.cfp-text {
  --speaker-cfp-text-font-size: 1.125rem;
  --speaker-cfp-text-font-weight: 500;

  margin-top: calc(var(--unit) * 5);
  color: var(--color-vue-blue);
  font-size: var(--speaker-cfp-text-font-size);
  font-weight: var(--speaker-cfp-text-font-weight);
  line-height: 1.8;

  & :deep(p) {
    --speaker-cfp-text-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--speaker-cfp-text-p-margin-bottom);
    line-height: 1.8;
  }
}

.cfp-subtitle {
  --subtitle-font-size: 1.5rem;
  --subtitle-font-weight: 700;

  font-size: var(--subtitle-font-size);
  font-weight: var(--subtitle-font-weight);
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2.5);
  background: var(--color-vue-green-gradation);
  color: transparent;
  background-clip: text;
}

.cfp-end-period {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.cfp-end-period--inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.cfp-end-period-text {
  --end-period-font-size: 1.25rem;

  display: inline-block;
  color: var(--color-vue-blue);
  font-size: var(--end-period-font-size);
  font-weight: 600;
  line-height: 1.5;
}

.cfp-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: calc(var(--unit) * 5);
}

.cfp-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

.cfp-more-information {
  margin-top: calc(var(--unit) * 2.5);
  display: flex;
  justify-content: center;

  &::v-deep a {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }
}

@media (--tablet) {
  /* 追加分（後で移動） */
  .speaker-body {
    --speaker-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }

  .speaker-text {
    --speaker-text-padding: 0 4.5%;
  }
  /* ここまで */

  .speaker {
    --speaker-padding: calc(var(--unit) * 2) 0;
  }

  .cfp-body {
    --speaker-cfp-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }

  .cfp-text {
    --speaker-cfp-text-font-size: 1rem;
    margin-top: calc(var(--unit) * 3.75);

    & :deep(p) {
      --speaker-cfp-text-p-margin-bottom: 29px;
    }
  }

  .cfp-subtitle {
    --subtitle-font-size: 1.25rem;

    margin-top: calc(var(--unit) * 3.75);
  }

  .cfp-end-period-text {
    --end-period-font-size: 1.125rem;

    line-height: 1.2;
  }

  .cfp-buttons {
    margin-top: calc(var(--unit) * 3.75);
    display: block;
  }

  .cfp-button:first-child {
    margin-bottom: calc(var(--unit) * 2);
  }

  .cfp-button {
    --height-button: 58px;

    width: 100%;
    max-width: none;
  }
}

@media (--mobile) {
  .cfp-end-period {
    flex-direction: column;
    align-items: self-start;
  }
  .cfp-end-period--inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
}
</style>
