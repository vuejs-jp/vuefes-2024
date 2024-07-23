<script setup lang="ts">
import { useI18n } from '#i18n'
import { useTranslation } from '@/composables/useTranslation'
import { volunteerUrl } from '~/utils/constants'

const { t } = useI18n()
const { translate } = useTranslation()

const endPeriodDate = {
  prefixYear: t('prefix_year'),
  suffixyear: t('suffix_year'),
  date: translate('volunteer.end_date'),
  dayOfWeek: translate('day_of_week.wednesday'),
}
const endPeriodTime = {
  hour: translate('volunteer.end_hour'),
  minute: translate('volunteer.end_minute'),
}
</script>

<template>
  <div class="volunteer">
    <article class="volunteer-body">
      <h3 id="volunteer" class="title">
        {{ translate('volunteer.title') }}
      </h3>
      <div class="volunteer-subtitle">
        {{ $t('volunteer.subtitle') }}
      </div>
      <div class="volunteer-text">
        <MarkDownText path="volunteer" />
      </div>
      <h3 class="volunteer-subtitle">
        {{ $t('volunteer.application_period') }}
      </h3>
      <VFDateTime :date="endPeriodDate" :time="endPeriodTime" color="white" />
      <div class="volunteer-buttons">
        <VFLinkButton
          class="volunteer-button"
          :href="volunteerUrl"
          background-color="vue-green/200"
          color="white"
        >
          {{ translate('volunteer.apply') }}
        </VFLinkButton>
      </div>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.volunteer {
  --volunteer-padding: calc(var(--unit) * 7.5) 0;
  --volunteer-row-gap: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: var(--volunteer-row-gap);
  padding: var(--volunteer-padding);
  color: var(--color-white);
  border-bottom: 1px solid var(--color-white);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.volunteer h3 {
  font-size: 36px;
  color: var(--color-white);
  font-weight: bold;
  margin-bottom: calc(var(--unit) * 4);
  text-align: center;
}

.volunteer-subtitle {
  --subtitle-font-size: 1.5rem;
  --subtitle-font-weight: 700;

  font-size: var(--subtitle-font-size);
  font-weight: var(--subtitle-font-weight);
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2.5);
  color: var(--color-white);
}

.volunteer-body {
  --volunteer-padding: calc(var(--unit) * 7.5) calc(var(--unit) * 12);

  height: fit-content;
  margin: 0 1.5%;
  padding: var(--volunteer-padding);
  max-width: 960px;
  isolation: isolate;
}

.volunteer-text {
  --volunteer-text-font-size: 1.125rem;
  --volunteer-text-font-weight: 500;

  margin-top: calc(var(--unit) * 5);
  color: var(--color-white);
  font-size: var(--volunteer-text-font-size);
  font-weight: var(--volunteer-text-font-weight);
  line-height: 1.8;

  & :deep(p) {
    --volunteer-text-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--volunteer-text-p-margin-bottom);
    line-height: 1.8;
  }
}

.volunteer-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: calc(var(--unit) * 5);
}

.volunteer-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .volunteer-body {
    --volunteer-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }

  .volunteer-text {
    --volunteer-text-font-size: 1rem;
    margin-top: calc(var(--unit) * 3.75);

    & :deep(p) {
      --volunteer-text-p-margin-bottom: 29px;
    }
  }

  .volunteer-buttons {
    margin-top: calc(var(--unit) * 3.75);
    display: block;
  }

  .volunteer-button:first-child {
    margin-bottom: calc(var(--unit) * 2);
  }

  .volunteer-button {
    --height-button: 58px;

    width: 100%;
    max-width: none;
  }

  @media (--mobile) {
    .volunteer h3 {
      font-size: 32px;
    }
  }
}
</style>
