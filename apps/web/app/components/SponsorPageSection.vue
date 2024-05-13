<script setup lang="ts">
import { useI18n } from '#i18n'
import { useRuntimeConfig } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useLocaleCurrent } from '@/composables/useLocaleCurrent'

const config = useRuntimeConfig()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t, te } = useI18n()
const { locale } = useLocaleCurrent()
/**
 * Get translation or return empty string
 * @param key - translation key
 * @returns translation or empty string
 */
function getTranslationOrDefault(key: string): string {
  return te(key, locale.value) ? t(key) : ''
}

const periodStart = {
  prefixYear: t('prefix_year'),
  date: t('sponsor.start_date'),
  dayOfWeek: getTranslationOrDefault('day_of_week.monday'),
}

// const periodEnd = {
//   suffixYear: t('suffix_year'),
//   date: t('sponsor.end_date'),
//   dayOfWeek: getTranslationOrDefault('day_of_week.thursday'),
// }
</script>

<template>
  <div class="sponsor">
    <article class="sponsor-body">
      <VFTitle id="sponsors" class="title">
        {{ $t('sponsor.title') }}
      </VFTitle>

      <div
        class="sponsor-text"
        :style="{
          fontWeight: fontWeight('body/300'),
          fontSize: fontSize('body/300'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="sponsor" />
      </div>

      <template v-if="config.public.availableApplySponsor">
        <h3
          :style="{
            fontWeight: fontWeight('heading/400'),
            fontSize: fontSize('heading/300'),
          }"
          class="sponsor-subtitle"
        >
          {{ $t('sponsor.apply_period') }}
        </h3>
        <VFDatePeriod :start="periodStart" />
      </template>

      <div class="sponsor-buttons">
        <!-- 申し込む -->
        <VFLinkButton
          v-if="config.public.availableApplySponsor"
          class="sponsor-button"
          href="https://forms.gle/paxZqz55oXLE4Njn9"
          background-color="vue-green/200"
          color="white"
        >
          {{ $t('sponsor.apply') }}
        </VFLinkButton>
        <!-- 資料を見る -->
        <VFLinkButton
          class="sponsor-button"
          href="https://docs.google.com/presentation/d/1YXWqW55CKdt4czr8paarpdxqYz8NjSFRzrOQ-NnClKQ/edit?usp=sharing"
          background-color="white"
          color="vue-blue"
        >
          {{ $t('sponsor.check_doc') }}
        </VFLinkButton>
      </div>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.sponsor {
  --sponsor-padding: calc(var(--unit) * 5.25) 0;
  --sponsor-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 8);
  --sponsor-term-margin: calc(var(--unit) * 5) auto 0;

  display: flex;
  justify-content: center;
  background-image: url('/sponsor/sponsor-bg.png');
  padding: var(--sponsor-padding);
  color: var(--color-vue-blue);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.sponsor-body {
  margin: 0 auto;
  padding: var(--sponsor-body-padding);
  margin: 0 1.5%;
  background-color: white;
  max-width: 960px;
}

.sponsor-text {
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

.sponsor-subtitle {
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2.5);
  background: var(--color-vue-green-gradation);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.sponsor-term {
  display: block;
  margin: var(--sponsor-term-margin);
}

.sponsor-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: calc(var(--unit) * 5);
}

.sponsor-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .sponsor {
    --sponsor-padding: calc(var(--unit) * 2) 0;
    --sponsor-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --sponsor-term-margin: calc(var(--unit) * 5) auto 0;
  }

  .sponsor-subtitle {
    margin-top: calc(var(--unit) * 3.75);
  }

  .sponsor-buttons {
    margin-top: calc(var(--unit) * 3.75);
    display: block;
  }

  .sponsor-button:first-child {
    margin-bottom: calc(var(--unit) * 2);
  }

  .sponsor-button {
    --height-button: 58px;

    width: 100%;
    max-width: none;
  }
}

@media (--mobile) {
  .sponsor-button {
    --height-button: 58px;
  }
}
</style>
