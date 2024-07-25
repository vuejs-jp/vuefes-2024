<script setup lang="ts">
import { ticketUrl } from '~/utils/constants'
</script>

<template>
  <article class="namecard-body">
    <div class="title-wrapper">
      <span class="title-1">{{ $t('namecard.sectionTitle1') }}</span>
      <VFTitle id="namecard" color="white" class="title-2">
        {{ $t('namecard.sectionTitle2') }}
      </VFTitle>
    </div>

    <div class="namecard-text">
      <MarkDownText path="namecard_lead" />
    </div>

    <div class="content-wrapper">
      <img :src="'namecard/namecard-samples.png'" alt="test" />
      <div class="buttons-wrapper">
        <VFLinkButton
          class="action-button"
          href="/namecard"
          background-color="vue-green/200"
          color="white"
        >
          {{ $t('namecard.createNamecard') }}
        </VFLinkButton>
        <VFLinkButton
          class="action-button"
          :href="ticketUrl"
          background-color="vue-green/200"
          color="white"
        >
          {{ $t('ticket.purchaseButton') }}
        </VFLinkButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
@import url('~/assets/media.css');

.title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  gap: 8px;
}

.title-1 {
  color: white;
  font-size: 16px;
  font-weight: 700;
}

.namecard-body {
  --namecard-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);

  margin: 0 auto;
  padding: var(--namecard-body-padding);
  padding-top: 0;
  margin: 0 1.5%;
  max-width: 960px;
  width: 100%;
}

.namecard-text {
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;
  color: white;

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

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
}

.action-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

@media (--tablet) {
  .namecard {
    --namecard-padding: calc(var(--unit) * 2) 0;
    --namecard-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --namecard-term-margin: calc(var(--unit) * 5) auto 0;
  }

  .action-button {
    --height-button: 58px;
  }
}
</style>
