<script setup lang="ts">
import { useHead } from '#imports'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

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
  <SponsorPageSection />
  <CooperationPartnerSection />
  <FormPageSection />
</template>
