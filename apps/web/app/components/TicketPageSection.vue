<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import TicketSection from '~/components/ticket/TicketSection.vue'
import NamecardSection from '~/components/ticket/NamecardSection.vue'

const config = useRuntimeConfig()
</script>

<template>
  <TicketSection />
  <NamecardSection v-if="config.public.enableRegisterNamecard" />
</template>
