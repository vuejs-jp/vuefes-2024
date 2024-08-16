<script setup lang="ts">
import { childCareUrl } from '~/utils/constants'
</script>

<template>
  <article class="childcare-body">
    <h3 id="childcare">{{ $t('childcare.title') }}</h3>
    <div class="childcare-body-text">
      <MarkDownText path="childcare" />
    </div>
    <div class="apply">
      <VFLinkButton
        class="apply-button"
        :href="childCareUrl"
        background-color="vue-green/200"
        color="white"
      >
        {{ $t('childcare.apply') }}
      </VFLinkButton>
    </div>
  </article>
</template>

<style scoped>
@import url('~/assets/media.css');

.childcare-body {
  --childcare-body-padding: calc(var(--unit) * 10) calc(var(--unit) * 12);

  margin: 0 auto;
  padding: var(--childcare-body-padding);
  max-width: 960px;
  width: 100%;
  border-bottom: 1px solid var(--color-white);
}

.childcare-body h3 {
  text-align: center;
  color: var(--color-white);
  font-size: 36px;
  line-height: 1.2;
  font-weight: 700;
}

.childcare-body-text {
  margin-top: calc(var(--unit) * 4);
  font-size: 18px;
  line-height: 1.8;
  color: white;

  &::v-deep(a) {
    color: var(--color-white);
    text-decoration: underline;
  }

  &::v-deep(a:hover) {
    opacity: 0.4;
    transition: 0.2s;
  }

  &:deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
  }
}

.apply {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
}

.apply-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .childcare-body {
    --childcare-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 4);
  }

  .childcare-body h3 {
    font-size: 24px;
  }
  
  .childcare-body-text p {
    font-size: 16px;
  }

  .apply {
    --height-button: 58px;
  }
}

@media (--mobile) {
  .apply {
    --height-button: 58px;
  }
}
</style>
