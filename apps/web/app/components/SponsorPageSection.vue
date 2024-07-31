<script setup lang="ts">
import { useI18n } from '#i18n'
import { useFetch, useLocaleCurrent, useRuntimeConfig } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useTranslation } from '@/composables/useTranslation'
import SponsorList from './sponsor/SponsorList.vue'
import type { SponsorInfo, SponsorCategory } from '@vuejs-jp/model'

type Sponsors = Record<SponsorCategory, SponsorInfo>

const config = useRuntimeConfig()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { t } = useI18n()
const { translate } = useTranslation()

const currentLocale = useLocaleCurrent().locale

// const periodStart = {
//   prefixYear: t('prefix_year'),
//   date: t('sponsor.start_date'),
//   dayOfWeek: translate('day_of_week.monday'),
// }

// const periodEnd = {
//   suffixYear: t('suffix_year'),
//   date: t('sponsor.end_date'),
//   dayOfWeek: translate('day_of_week.thursday'),
// }

// const firstPeriodEnd = {
//   prefixYear: t('prefix_year'),
//   suffixyear: t('suffix_year'),
//   date: t('sponsor.first_end_date'),
//   dayOfWeek: translate('day_of_week.wednesday'),
// }

const secondPeriodEnd = {
  prefixYear: t('prefix_year'),
  suffixyear: t('suffix_year'),
  date: t('sponsor.second_end_date'),
  dayOfWeek: translate('day_of_week.saturday'),
}

const endPeriodTime = {
  hour: t('speaker.end_hour'),
  minute: t('speaker.end_minute'),
  ampm: currentLocale.value === 'en' ? t('speaker.end_ampm') : '',
}

const { data, error } = await useFetch('/api/sponsors')
if (error.value) {
  console.error(error.value)
}
const {
  platinumSponsors,
  goldSponsors,
  silverSponsors,
  bronzeSponsors,
  specialNamingRightSponsors,
  namingRightSponsors,
  specialLunchSponsors,
  afterPartySponsors,
  nameCardSponsors,
  simultaneousInterpretationSponsors,
  childcareSponsors,
  mediaSponsors,
  toolSponsors,
} = data.value as Sponsors
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
          {{ $t('sponsor.apply_deadline') }}
        </h3>
        <!--
        <p
          :style="{
            fontWeight: fontWeight('heading/100'),
            fontSize: fontSize('heading/100'),
            color: color('vue-blue'),
          }"
          class="sponsor-subtitle-category"
        >
          {{ $t('sponsor.creative_wall_drinks_snacks_merchandise') }}
        </p>
        <VFDateTime :date="firstPeriodEnd" :time="endPeriodTime" />
        -->
        <p
          :style="{
            fontWeight: fontWeight('heading/100'),
            fontSize: fontSize('heading/100'),
            color: color('vue-blue'),
          }"
          class="sponsor-subtitle-category"
        >
          {{ $t('sponsor.silver_bronze_special_lunch_lunch_handson_media') }}
        </p>
        <VFDateTime :date="secondPeriodEnd" :time="endPeriodTime" />
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
      <SponsorList v-bind="platinumSponsors" />
      <SponsorList v-bind="goldSponsors" />
      <SponsorList v-bind="silverSponsors" />
      <SponsorList v-bind="bronzeSponsors" />
      <SponsorList v-bind="specialNamingRightSponsors" />
      <SponsorList v-bind="namingRightSponsors" />
      <div class="sponsor-list-layout-separate">
        <SponsorList v-bind="specialLunchSponsors" />
        <SponsorList v-bind="afterPartySponsors" />
      </div>
      <div class="sponsor-list-layout-separate">
        <SponsorList v-bind="nameCardSponsors" />
        <SponsorList v-bind="simultaneousInterpretationSponsors" />
      </div>
      <SponsorList v-bind="childcareSponsors" />
      <SponsorList v-bind="mediaSponsors" />
      <SponsorList v-bind="toolSponsors" />
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.sponsor {
  --sponsor-padding: calc(var(--unit) * 5.25) 0;
  --sponsor-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);
  --sponsor-term-margin: calc(var(--unit) * 5) auto 0;

  display: flex;
  justify-content: center;
  background-image: url('/sponsor/sponsor-bg-grid.png'),
    linear-gradient(to bottom, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: overlay;
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

.sponsor-subtitle-category {
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 2.5);
  margin-bottom: calc(var(--unit) * 0.625);
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

.sponsor-list-layout-separate {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  .sponsor-list-layout-separate {
    display: contents;
  }
}

@media (--mobile) {
  .sponsor-button {
    --height-button: 58px;
  }
}
</style>
