<script setup lang="ts">
import {
  onMounted,
  reloadNuxtApp,
  useFetch,
  useHead,
  // useI18n,
  useRuntimeConfig,
} from '#imports'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

// const { locale } = useI18n({ useScope: 'global' })
const config = useRuntimeConfig()

const { data: speakers, error: error1, refresh: refreshSpeaker } = await useFetch('/api/speakers')
if (error1.value) {
  console.error(error1.value)
}
const { data: sponsors, error: error2, refresh: refreshSponsor } = await useFetch('/api/sponsors')
if (error2.value) {
  console.error(error2.value)
}

onMounted(function () {
  window.addEventListener('popstate', async function(event) {
    await refreshSpeaker()
    await refreshSponsor()
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
  <SpeakerPageSection :data="speakers" />
  <!--
  <VolunteerPageSection v-if="!config.public.enableRegisterTicket && locale === 'ja'" />
  -->
  <EventPageSection v-if="config.public.showEvent" :data="speakers" />
  <StorePageSection v-if="config.public.showStore" />
  <AccessPageSection />
  <SponsorPageSection :data="sponsors" />
  <CooperationPartnerSection />
  <FormPageSection />
  <TeamPageSection />
</template>
