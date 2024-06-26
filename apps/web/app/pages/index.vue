<script setup lang="ts">
import { useHead, useI18n } from '#imports'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

const { locale } = useI18n({ useScope: 'global' })

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
  <SponsorPageSection />
  <CooperationPartnerSection />
  <FormPageSection />
</template>
