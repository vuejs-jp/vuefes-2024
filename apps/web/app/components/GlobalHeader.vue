<script setup lang="ts">
import { useDevice, useI18n, useRouter, useRuntimeConfig, useSwitchLocalePath } from '#imports'
const { isMobile } = useDevice()
const router = useRouter()
const currentPath= router.currentRoute.value.path
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()

const handle = (path: string) => {
  router.push(path)
  switchLocalePath(locale.value === 'ja' ? 'en' : 'ja')
}
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <VFLocaleSwitch
      v-if="config.public.enableSwitchLocale"
      :locale
      :current-path="currentPath"
      @toggle="handle"
    />
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <VFLocaleSwitch
      v-if="config.public.enableSwitchLocale"
      :locale
      :current-path="currentPath"
      @toggle="handle"
    />
  </VFHeader>
</template>
