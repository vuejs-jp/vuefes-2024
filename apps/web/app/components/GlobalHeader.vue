<script setup lang="ts">
import { useDevice } from '#imports'

const { isMobile } = useDevice()
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <VFLocaleSwitch />
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <VFLocaleSwitch />
  </VFHeader>
</template>
