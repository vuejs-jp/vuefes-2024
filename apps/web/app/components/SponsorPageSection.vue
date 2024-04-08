<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'

const { locale } = useI18n()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
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

      <h3
        :style="{
          fontWeight: fontWeight('heading/400'),
          fontSize: fontSize('heading/300'),
        }"
        class="sponsor-subtitle">
        {{ $t('sponsor.apply_period') }}
      </h3>
      <VFDatePeriod
        :start="{ year: 2024, date: '4.8', dayOfWeek: locale === 'ja' ? $t('day_of_week.monday') : '' }"
        :end="{ date: '4.25', dayOfWeek: locale === 'ja' ? $t('day_of_week.thursday') : '' }" />

      <div class="sponsor-buttons">
        <!-- 申し込む -->
        <VFLinkButton
          class="sponsor-button"
          href="https://forms.gle/paxZqz55oXLE4Njn9"
          background-color="vue-green"
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
@import url("~/assets/media.css");
@import url("~/assets/sample.css");

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

.sponsor-body {
  margin: 0 auto;
  padding: var(--sponsor-body-padding);
  margin: 0 1.5%;
  background-color: white;
  max-width: 960px;
  text-align: center;

}

.sponsor-text {
  text-align: left;
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;
}

.sponsor-subtitle {
  margin-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2);
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
  .title {
    font-size: 25px;
  }
  .sponsor-button {
    --height-button: 58px;
  }
}
</style>