<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

</script>

<template>
  <div class="sponsor">
    <article class="sponsor-body">
      <VFTitle id="sponsor">
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
        class="sponsor-subtitle"
      >
        {{ $t('sponsor.apply_period') }}
      </h3>
      <VFDatePeriod
        :start="{ year: 2024, date: '4.1', dayOfWeek: $t('day_of_week.monday') }"
        :end="{ date: '4.30', dayOfWeek: $t('day_of_week.tuesday') }"
      />

      <div class="sponsor-buttons">
        <!-- 申し込む -->
        <VFButton class="sponsor-button" fixed-width href="/">
          {{ $t('sponsor.apply') }}
        </VFButton>
        <!-- 資料を見る -->
        <VFButton
          class="sponsor-button"
          fixed-width
          href="https://docs.google.com/presentation/d/1YXWqW55CKdt4czr8paarpdxqYz8NjSFRzrOQ-NnClKQ/edit?usp=sharing"
          secondary
        >
          {{ $t('sponsor.check_doc') }}
        </VFButton>

      </div>
    </article>

  </div>
</template>

<style scoped>
@import url("~/assets/media.css");
@import url("~/assets/sample.css");

.sponsor {
  --sponsor-padding: calc(var(--unit) * 7) 0;
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
  margin-top: calc(var(--unit) * 4);
}

.sponsor-button {
  margin: 0 calc(var(--unit) * 1.5);
}

/* この幅ルールはコンポーネント側に持たせるべき */
/* .sponsor-button {
  min-width: 198px;
  max-width: 260px;
  width: 100%;
  padding: calc(var(--unit) * 2) 66px;
  background: var(--color-vue-green-gradation);
  font-size: 18px;
  white-space: nowrap;
} */

/* .sponsor-button.-border {
  padding: calc(var(--unit) * 2) 0;
  background: white;
  border: solid 2px var(--color-vue-blue);
  color: var(--color-vue-blue);
} */


@media (--tablet) {
  .sponsor {
    --sponsor-padding: calc(var(--unit) * 2) 0;
    --sponsor-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --sponsor-term-margin: calc(var(--unit) * 5) auto 0;
  }

  .sponsor-buttons {
    display: block;
  }

  .sponsor-button {
    margin: calc(var(--unit) * 2) 0 0;
  }
}
</style>