<script setup lang="ts">
import { useDevice, useRouter, useRuntimeConfig } from '#imports'

const { isMobile } = useDevice()
const router = useRouter()
const config = useRuntimeConfig()

const handle = (path: string) => {
  router.push(path)
}
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <VFLocaleSwitch v-if="config.public.enableSwitchLocale" :router @toggle="handle" />
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <VFLocaleSwitch v-if="config.public.enableSwitchLocale" :router @toggle="handle" />
  </VFHeader>
</template>
