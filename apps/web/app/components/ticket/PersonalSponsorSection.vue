<script setup lang="ts">
import { ticketUrl } from '~/utils/constants'
</script>

<template>
  <article class="personal-sponsor-body">
    <h3 id="personal-sponsor">{{ $t('personal_sponsor.title') }}</h3>
    <div class="personal-sponsor-text">
      <MarkDownText path="personal_sponsor_1" />
    </div>
    <div class="merits">
      <VFMeritCard
        v-for="i in 4"
        :key="i"
        :title="$t(`personal_sponsor.merit${i}.title`)"
        :detail="$t(`personal_sponsor.merit${i}.detail`)"
        :caution="i === 2 || i === 4 ? $t(`personal_sponsor.merit${i}.caution`) : ''"
      >
        <NuxtImg alt="" :src="`/sponsor/merit-${i}.jpg`" loading="lazy" class="image" />
      </VFMeritCard>
    </div>
    <div class="personal-sponsor-text">
      <MarkDownText path="personal_sponsor_2" />
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

.personal-sponsor-body {
  --personal-sponsor-body-padding: calc(var(--unit) * 10) calc(var(--unit) * 12);

  margin: 0 auto;
  padding: var(--personal-sponsor-body-padding);
  margin: 0 1.5%;
  max-width: 960px;
  width: 100%;
  border-bottom: 1px solid var(--color-white);
}

.personal-sponsor-body h3 {
  font-size: 36px;
  line-height: 1.2;
  color: var(--color-white);
  font-weight: bold;
  margin-bottom: calc(var(--unit) * 4);
  text-align: center;
}

.personal-sponsor-text {
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
    font-size: 18px;
  }
}

.merits {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit) * 4);
  color: var(--color-white);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  .personal-sponsor-body {
    --personal-sponsor-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2)
      calc(var(--unit) * 4);
  }

  .personal-sponsor-body h3 {
    font-size: 24px;
  }

  .apply-button {
    --height-button: 58px;
  }
}

@media (--mobile) {
  .apply-button {
    --height-button: 58px;
  }
}
</style>
