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
  line-height: 1.2;
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
  .handson-body {
    --handson-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 4);
  }

  .handson-body h3 {
    font-size: 24px;
  }
  
  .handson-body-text p {
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
