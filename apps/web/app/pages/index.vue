<script setup lang="ts">
import { useHead, useI18n, useRuntimeConfig } from '#imports'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

const { locale } = useI18n({ useScope: 'global' })
const config = useRuntimeConfig()

useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `${conferenceTitle}`,
  meta: [...generalOg(), ...twitterOg()],
})
</script>

<template>
  <TopPageSection />
  <MessagePageSection />
  <SpeakerPageSection />
  <VolunteerPageSection v-if="locale === 'ja'" />
  <EventPageSection v-if="config.public.showEvent" />
  <StorePageSection v-if="config.public.showStore" />
  <SponsorPageSection />
  <AccessPageSection />
  <TicketPageSection v-if="config.public.enableRegisterTicket" />
  <CooperationPartnerSection />
  <FormPageSection />
  <TeamPageSection />
</template>
