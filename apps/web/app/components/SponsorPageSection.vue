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

      <div class="sponsor-text" :style="{
          fontWeight: fontWeight('body/300'),
          fontSize: fontSize('body/300'),
          color: color('vue-blue'),
        }">
        <MarkDownText path="sponsor" />
      </div>

      <img class="sponsor-term" src="/sponsor/sponsor-term.svg" width="344" height="82" />
      <div class="sponsor-buttons">
        <VFSubmitButton class="sponsor-button">
          {{ $t('sponsor.apply') }}
        </VFSubmitButton>
        <VFSubmitButton class="sponsor-button -border">
          {{ $t('sponsor.check-doc') }}
        </VFSubmitButton>

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

.sponsor-term {
  display: block;
  margin: var(--sponsor-term-margin);
}

.sponsor-buttons {
  display: flex;
  justify-content: center;
  margin-top: calc(var(--unit) * 4);
}

.sponsor-button+.sponsor-button {
  margin-left: calc(var(--unit) * 3);
}

/* この幅ルールはコンポーネント側に持たせるべき */
.sponsor-button {
  width: 260px;
  padding: calc(var(--unit) * 2) 0;
  background: var(--color-vue-green-gradation);
  font-size: 18px;
}

.sponsor-button.-border {
  padding: calc(var(--unit) * 2) 0;
  background: white;
  border: solid 2px var(--color-vue-blue);
  color: var(--color-vue-blue);
}


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
    width: 100%;
  }

  .sponsor-button+.sponsor-button {
    margin-left: 0;
    margin-top: calc(var(--unit) * 2);
  }
}
</style>