<script setup lang="ts">
import { useDevice, useI18n, useRuntimeConfig, useSwitchLocalePath } from '#imports'
const { isMobile } = useDevice()
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <NuxtLink v-if="config.public.enableSwitchLocale" :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
      class="locale-switch-wrapper">
      <VFLocaleSwitch :locale />
    </NuxtLink>
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <div class="navigation-pc">
      <div class="navigation-links-pc">
        <nuxt-link to="#message">
          <VFTypography variant="heading/200" color="vue-blue">Message</VFTypography>
        </nuxt-link>
        <nuxt-link to="#speakers">
          <VFTypography variant="heading/200" color="vue-blue">Speakers</VFTypography>
        </nuxt-link>
        <nuxt-link to="#sponsors">
          <VFTypography variant="heading/200" color="vue-blue">Sponsors</VFTypography>
        </nuxt-link>
        <!-- <nuxt-link to="#jobboard">
          <VFTypography variant="heading/200" color="vue-blue">Job board</VFTypography>
        </nuxt-link> -->
        <nuxt-link to="#form">
          <VFTypography variant="heading/200" color="vue-blue">Contact</VFTypography>
        </nuxt-link>
      </div>
      <NuxtLink v-if="config.public.enableSwitchLocale" :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
        class="locale-switch-wrapper">
        <VFLocaleSwitch :locale />
      </NuxtLink>
    </div>
  </VFHeader>
</template>

<style scoped>
.locale-switch-wrapper {
  text-decoration: none;
}

.navigation_1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navigation-pc {
  display: flex;
  align-items: center;
  gap: calc(var(--unit) * 7.5);
}

.navigation-links-pc {
  display: flex;
  gap: calc(var(--unit) * 8);

  a {
    text-decoration: none;
  }
}
</style>
