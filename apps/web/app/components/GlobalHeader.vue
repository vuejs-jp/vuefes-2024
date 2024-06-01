<script setup lang="ts">
import { useDevice, useI18n, useRuntimeConfig, useSwitchLocalePath } from '#imports'
const { isMobile } = useDevice()
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <NuxtLink :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')">
      <VFLocaleSwitch v-if="config.public.enableSwitchLocale" :locale />
    </NuxtLink>
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <NuxtLink :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')">
      <VFLocaleSwitch v-if="config.public.enableSwitchLocale" :locale />
    </NuxtLink>
  </VFHeader>
</template>
