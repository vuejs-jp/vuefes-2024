<script setup lang="ts">
import { onMounted, useHead } from '#imports'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'


useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `${conferenceTitle}`,
  meta: [...generalOg(), ...twitterOg()],
})



onMounted(async () => {
  // const data = await fetchSample()
  // console.log('しゅとくした', data)
})
</script>

<template>
  <TopPageSection />
  <MessagePageSection />
  <SponsorPageSection />
  <CooperationPartnerSection />
  <FormPageSection />
</template>
