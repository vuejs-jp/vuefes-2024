<script setup lang="ts">
import { useDevice, useRouter } from '#imports'

const { isMobile } = useDevice()
const router = useRouter()

const handle = (path: string) => {
  router.push(path)
}
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <VFLocaleSwitch :router @toggle="handle" />
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <VFLocaleSwitch :router @toggle="handle" />
  </VFHeader>
</template>
