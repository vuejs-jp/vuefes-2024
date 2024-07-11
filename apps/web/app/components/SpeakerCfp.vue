<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'
import { useLocaleCurrent } from '@/composables/useLocaleCurrent'
import { cfpEnUrl, cfpJaUrl } from '~/utils/constants'

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
    <VFDateTime :date="endPeriodDate" :time="endPeriodTime" />

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
        color: color('vue-blue'),
      }"
    >
      <MarkDownText path="speaker_information" />
    </div>
  </article>
</template>

<style scoped>
@import url('~/assets/media.css');

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
  --cfp-more-information-font-size: 1.125rem;
  --cfp-more-information-font-weight: 500;

  margin-top: calc(var(--unit) * 2.5);
  display: flex;
  justify-content: center;
  font-size: var(--cfp-more-information-font-size);
  font-weight: var(--cfp-more-information-font-weight);
  line-height: 1.8;

  &::v-deep a {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }
}

@media (--tablet) {
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

  .cfp-more-information {
    --cfp-more-information-font-size: 1rem;
  }
}
</style>
