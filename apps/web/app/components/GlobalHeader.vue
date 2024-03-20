<script setup lang="ts">
import { useDevice } from '#imports'

const { isMobile } = useDevice()
</script>

<template>
  <VFSpHeader v-if="isMobile" />
  <VFHeader v-if="!isMobile" />
</template>
