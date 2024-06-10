<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'
import { useLocaleCurrent } from '@/composables/useLocaleCurrent'

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t } = useI18n()
const { translate } = useTranslation()

const currentLocale = useLocaleCurrent().locale

const prefixYear = computed(() => {
  if (currentLocale.value === 'en') {
    return t('suffix_year')
  }
  return t('prefix_year')
})

const endPeriodDate = {
  prefixYear: prefixYear.value,
  date: t('speaker.end_date'),
  dayOfWeek: translate('day_of_week.monday'),
}
const endPeriodTime = {
  hour: t('speaker.end_hour'),
  minute: t('speaker.end_minute'),
  ampm: currentLocale.value === 'en' && t('speaker.end_ampm'),
}
</script>

<template>
  <div class="speaker">
    <article class="speaker-body">
      <VFTitle id="speakers" class="title">
        {{ $t('speaker.title') }}
      </VFTitle>

      <div class="speaker-text">
        <MarkDownText path="speaker" />
      </div>

      <h3 class="speaker-subtitle">
        {{ $t('speaker.application_period') }}
      </h3>
      <div class="speaker-end-period">
        <span class="speaker-end-period-text"> {{ $t('speaker.application_period_before') }} </span>
        <div class="speaker-end-period--inner">
          <VFDateTime :date="endPeriodDate" :time="endPeriodTime" />
          <span v-if="currentLocale !== 'en'" class="speaker-end-period-text">
            {{ $t('speaker.application_period_after') }}</span
          >
        </div>
      </div>

      <div class="speaker-buttons">
        <VFLinkButton class="speaker-button" href="" background-color="vue-green/200" color="white">
          {{ $t('speaker.apply') }}
        </VFLinkButton>
      </div>

      <div
        class="speaker-more-information"
        :style="{
          fontWeight: fontWeight('body/200'),
          fontSize: fontSize('body/400'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="speaker_information" />
      </div>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.speaker {
  --speaker-padding: calc(var(--unit) * 7.5) 0;

  display: flex;
  justify-content: center;
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

.speaker-body {
  --speaker-body-padding: calc(var(--unit) * 7.5) calc(var(--unit) * 12);

  height: fit-content;
  margin: 0 1.5%;
  padding: var(--speaker-body-padding);
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  max-width: 960px;
  isolation: isolate;
}

.title {
  text-align: center;
  line-height: 1.2;
}

.speaker-text {
  --body-font-size: 1.125rem;
  --body-font-weight: 500;

  margin-top: calc(var(--unit) * 5);
  color: var(--color-vue-blue);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  line-height: 1.8;

  & :deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
    line-height: 1.8;
  }
}

.speaker-subtitle {
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

.speaker-end-period {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.speaker-end-period--inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.speaker-end-period-text {
  --end-period-font-size: 1.25rem;

  display: inline-block;
  color: var(--color-vue-blue);
  font-size: var(--end-period-font-size);
  font-weight: 600;
  line-height: 1.5;
}

.speaker-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: calc(var(--unit) * 5);
}

.speaker-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

.speaker-more-information {
  margin-top: calc(var(--unit) * 2.5);
  display: flex;
  justify-content: center;

  &::v-deep a {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }
}

@media (--tablet) {
  .speaker {
    --speaker-padding: calc(var(--unit) * 2) 0;
  }

  .speaker-body {
    --speaker-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }

  .speaker-text {
    --body-font-size: 1rem;
    margin-top: calc(var(--unit) * 3.75);

    & :deep(p) {
      --body-p-margin-bottom: 29px;
    }
  }

  .speaker-subtitle {
    --subtitle-font-size: 1.25rem;

    margin-top: calc(var(--unit) * 3.75);
  }

  .speaker-end-period-text {
    --end-period-font-size: 1.125rem;

    line-height: 1.2;
  }

  .speaker-buttons {
    margin-top: calc(var(--unit) * 3.75);
    display: block;
  }

  .speaker-button:first-child {
    margin-bottom: calc(var(--unit) * 2);
  }

  .speaker-button {
    --height-button: 58px;

    width: 100%;
    max-width: none;
  }
}

@media (--mobile) {
  .speaker-end-period {
    flex-direction: column;
    align-items: self-start;
  }
  .speaker-end-period--inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
}
</style>
