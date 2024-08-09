<script setup lang="ts">
import {
  definePageMeta,
  onMounted,
  reloadNuxtApp,
  useFetch,
  useHead,
  // useI18n,
  useRuntimeConfig,
} from '#imports'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

definePageMeta({
  middleware: 'browser-back',
})

// const { locale } = useI18n({ useScope: 'global' })
const config = useRuntimeConfig()

const { data: sponsors, error, refresh } = await useFetch('/api/sponsors')
if (error.value) {
  console.error(error.value)
}

onMounted(function () {
  window.addEventListener('popstate', async function(event) {
    await refresh()
    await reloadNuxtApp()
  })
})

useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `${conferenceTitle}`,
  meta: [...generalOg(), ...twitterOg()],
})
</script>

<template>
  <TopPageSection />
  <MessagePageSection />
  <TicketPageSection v-if="config.public.enableRegisterTicket" />
  <SpeakerPageSection />
  <!--
  <VolunteerPageSection v-if="!config.public.enableRegisterTicket && locale === 'ja'" />
  -->
  <EventPageSection v-if="config.public.showEvent" />
  <StorePageSection v-if="config.public.showStore" />
  <AccessPageSection />
  <SponsorPageSection :data="sponsors" />
  <CooperationPartnerSection />
  <FormPageSection />
  <TeamPageSection />
</template>
