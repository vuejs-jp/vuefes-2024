<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t } = useI18n()
const { translate } = useTranslation()

const endPeriodDate = {
  prefixYear: t('prefix_year'),
  date: t('speaker.end_date'),
  dayOfWeek: translate('day_of_week.monday'),
}
const endPeriodTime = {
  hour: t('speaker.end_hour'),
  minute: t('speaker.end_minute'),
}
</script>

<template>
  <div class="speaker">
    <article class="speaker-body">
      <VFTitle id="speakers" class="title">
        {{ $t('speaker.title') }}
      </VFTitle>

      <div
        class="speaker-text"
        :style="{
          fontWeight: fontWeight('body/300'),
          fontSize: fontSize('body/300'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="speaker" />
      </div>

      <h3
        :style="{
          fontWeight: fontWeight('heading/400'),
          fontSize: fontSize('heading/300'),
        }"
        class="speaker-subtitle"
      >
        {{ $t('speaker.application_period') }}
      </h3>
      <div class="speaker-end-period">
        <span class="speaker-end-period-text"> {{ $t('speaker.application_period_before') }} </span>
        <VFDateTime :date="endPeriodDate" :time="endPeriodTime" />
        <span class="speaker-end-period-text"> {{ $t('speaker.application_period_after') }}</span>
      </div>

      <div class="speaker-buttons">
        <VFLinkButton class="speaker-button" href="" background-color="vue-green/200" color="white">
          {{ $t('speaker.apply') }}
        </VFLinkButton>
      </div>

      <div class="speaker-more-information">
        <MarkDownText path="speaker_information" />
      </div>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.speaker {
  --speaker-padding: calc(var(--unit) * 5.25) 0;
  --speaker-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 8);
  --speaker-term-margin: calc(var(--unit) * 5) auto 0;

  display: flex;
  justify-content: center;
  /* background-image: url('/sponsor/sponsor-bg.png'); */
  padding: var(--speaker-padding);
  color: var(--color-vue-blue);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.speaker-body {
  margin: 0 auto;
  padding: var(--speaker-body-padding);
  margin: 0 1.5%;
  background-color: white;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  max-width: 960px;
}

.speaker-text {
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;

  &::v-deep a {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }

  &::v-deep a:hover {
    opacity: 0.4;
    transition: 0.2s;
  }

  &:deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
  }
}

.speaker-subtitle {
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2.5);
  background: var(--color-vue-green-gradation);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.speaker-term {
  display: block;
  margin: var(--speaker-term-margin);
}

.speaker-end-period {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.speaker-end-period-text {
  display: inline-block;
  color: var(--color-vue-blue);
  font-size: 20px;
  line-height: 1;
  margin-bottom: 4px;
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
}

@media (--tablet) {
  .speaker {
    --speaker-padding: calc(var(--unit) * 2) 0;
    --speaker-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --speaker-term-margin: calc(var(--unit) * 5) auto 0;
  }

  .speaker-subtitle {
    margin-top: calc(var(--unit) * 3.75);
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
  .speaker-button {
    --height-button: 58px;
  }
}
</style>
