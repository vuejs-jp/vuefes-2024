<script setup lang="ts">
import { ticketUrl } from '~/utils/constants'
</script>

<template>
  <article class="handson-body">
    <h3 id="handson">{{ $t('handson.title') }}</h3>
    <div class="handson-body-text">
      <MarkDownText path="handson" />
    </div>
    <div class="apply">
      <VFLinkButton
        class="apply-button"
        :href="ticketUrl"
        background-color="vue-green/200"
        color="white"
      >
      {{ $t('ticket.purchaseButton') }}
    </VFLinkButton>
    </div>
  </article>
</template>

<style scoped>
@import url('~/assets/media.css');

.handson-body {
  --handson-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);

  margin: 0 auto;
  padding: var(--handson-body-padding);
  margin: 0 1.5%;
  max-width: 960px;
  width: 100%;
  border-bottom: 1px solid var(--color-white);
}

.handson-body h3 {
  text-align: center;
  color: var(--color-white);
  font-size: 36px;
  font-weight: 700;
}

.handson-body-text {
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;
  color: white;

  &::v-deep a {
    color: var(--color-white);
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

.apply {
  width: 320px;
  text-align: center;
}

.apply {
  --height-button: 66px;

  margin: 40px auto 0;
  width: 100%;
  max-width: 260px;
  display: flex;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .handson {
    --handson-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
  }

  .apply {
    --height-button: 58px;
  }
}

@media (--mobile) {
  .handson h3 {
    font-size: 32px;
  }
  
  .handson p {
    font-size: 16px;
  }

  .apply {
    width: 100%;
    padding: 0 23.5px;
    margin-top: 30px;
    margin-bottom: 60px;
    --height-button: 58px;
  }
}
</style>
