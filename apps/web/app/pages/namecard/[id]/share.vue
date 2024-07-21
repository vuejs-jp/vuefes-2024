<script setup lang="ts">
import { computed } from 'vue'
import { createError, useHead, useRoute } from '#imports'
import { useI18n } from '#i18n'
import { useNamecard } from '~/composables/useNamecard'
import { conferenceTitle, linkUrl, ogSpeakerDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'

const { t } = useI18n()
const route = useRoute()
const id = route.params.id as string
const { attendee } = await useNamecard(id)
if (!attendee) {
  throw createError({ statusCode: 404, statusMessage: 'Attendee not found' })
}

const currentLocale = useLocaleCurrent().locale

const officialSiteUrl = computed(() => {
  return currentLocale.value === 'ja' ? linkUrl : `${linkUrl}/en`
})

// TODO OGタグの設定
useHead({
  titleTemplate: (titleChunk) => `${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `${conferenceTitle}`,
      description: ogSpeakerDescription,
      url: `${linkUrl}namecard/${id}/share`,
    }),
    ...twitterOg({
      title: `${conferenceTitle}`,
      description: ogSpeakerDescription,
      url: `${linkUrl}namecard/${id}/share`,
    }),
  ],
})
</script>
<template>
  <div class="namecard-share-root">
    <VFOgCard23 class="namecard" :user="attendee" />
    <VFComment class="invite-comment" :title="t('invite_vue_fes')" />
    <VFLinkButton
      class="link-button"
      :href="officialSiteUrl"
      background-color="vue-green/200"
      color="white"
      >{{ t('official_site') }}</VFLinkButton
    >
    <VFComment class="share-namecard" :title="t('share_namecard')" />
    <!-- TODO snsアイコン&リンク設置 -->
    <ul class="sns-list">
      <li>x</li>
      <li>facebook</li>
      <li>copy</li>
    </ul>
  </div>
</template>

<style scoped>
.namecard-share-root {
  --header-height: calc(var(--unit) * 10);
  --content-padding: calc(var(--unit) * 15);
  padding-top: calc(var(--header-height) + var(--content-padding));
  padding-bottom: var(--content-padding);
  max-width: 960px;
  margin: 0 auto;
}
.namecard {
  max-width: 960px;
  margin: 0 auto calc(var(--unit) * 7.5);
}
.invite-comment {
  margin: 0 auto calc(var(--unit) * 2.5);
}
.link-button {
  --height-button: 66px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: var(--height-button);
  border-radius: var(--height-button);
  margin: 0 auto calc(var(--unit) * 7.5);
}
</style>
