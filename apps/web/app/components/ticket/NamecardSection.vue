<script setup lang="ts">
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { endedApplyNormal, endedCreateNamecard, ticketUrl } from '~/utils/constants'
import { useWithBase } from '#imports'

const { locale: currentLocale } = useLocaleCurrent()
const basePath = useWithBase()
</script>

<template>
  <div class="separator">
    <span class="triangle" />
    <span class="triangle" />
    <span class="triangle" />
  </div>
  <article class="namecard-body">
    <div class="title-wrapper">
      <VFComment color="white" :title="$t('namecard.sectionTitle1')" />
      <h3 id="namecard" class="namecard-title">
        {{ $t('namecard.sectionTitle2') }}
      </h3>
    </div>

    <div class="namecard-text">
      <MarkDownText path="namecard_lead" />
    </div>

    <div class="content-wrapper">
      <NuxtImg
        :src="basePath('/namecard/namecard-samples.png')"
        alt="test"
        width="596"
        loading="lazy"
      />
      <div class="buttons-wrapper">
        <VFLinkButton
          class="action-button"
          :href="`${currentLocale === 'ja' ? '/' : `/${currentLocale}/`}namecard/`"
          background-color="vue-green/200"
          color="white"
        >
          {{ endedCreateNamecard ? $t('namecard.confirmNamecard') : $t('namecard.createNamecard') }}
        </VFLinkButton>
        <VFLinkButton
          class="action-button"
          :href="ticketUrl"
          background-color="vue-green/200"
          color="white"
          :disabled="endedApplyNormal"
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

.namecard-title {
  color: white;
  font-size: 36px;
  font-weight: bold;
}

.namecard-body {
  --namecard-body-padding: calc(var(--unit) * 10) calc(var(--unit) * 12);

  margin: 0 auto;
  padding: var(--namecard-body-padding);
  padding-top: 0;
  margin: 0 1.5%;
  max-width: 960px;
  width: 100%;
  border-bottom: 1px solid var(--color-white);
}

.namecard-text {
  margin-top: calc(var(--unit) * 4);
  font-size: 18px;
  line-height: 1.8;
  color: white;

  &::v-deep(a) {
    color: var(--color-vue-green200);
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
  margin: -20px 0 -40px;
}

.separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 235px;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}

@media (--tablet) {
  .namecard-body {
    --namecard-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
  }

  .action-button {
    --height-button: 58px;
  }
}
</style>
