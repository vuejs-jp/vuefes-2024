<script setup lang="ts">
import { useDevice, useI18n, useRuntimeConfig, useSwitchLocalePath } from '#imports'
const { isMobile } = useDevice()
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()

const onSwitchLocalePath = () => {
  switchLocalePath(locale.value === 'ja' ? 'en' : 'ja')
}
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <VFLocaleSwitch :locale @switch-locale-path="onSwitchLocalePath" />
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <NuxtLink
      v-if="config.public.enableSwitchLocale"
      :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
      class="locale-switch-wrapper"
    >
      <VFLocaleSwitch :locale />
    </NuxtLink>
  </VFHeader>
</template>

<style scoped>
.locale-switch-wrapper {
  text-decoration: none;
}
</style>
