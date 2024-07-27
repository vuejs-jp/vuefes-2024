<script setup lang="ts">
import {
  createError,
  useAsyncData,
  useHead,
  useLocaleCurrent,
  useRoute,
  useSupabase,
  defineOgImageComponent,
} from '#imports'
import { conferenceTitle, linkUrl, ogSponsorDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'
import type { Sponsor } from '@vuejs-jp/model'

const route = useRoute()
const id = route.params.id as string

const { fetchData } = useSupabase()
const { data: sponsors } = await useAsyncData('sponsors', async () => {
  return await fetchData('sponsors', { detailPageId: id })
})
const sponsorData = sponsors.value?.data as Sponsor[]
if (!sponsorData) {
  throw createError({ statusCode: 404, statusMessage: 'Sponsor not found' })
}

if (!sponsorData[0].detail_page_id) {
  throw createError({ statusCode: 404, statusMessage: 'Sponsor not found' })
}

const currentLocale = useLocaleCurrent().locale

function copyUrl() {
  const element = document.createElement('input')
  element.value = `https://vuefes.jp/2024/namecard/${id}/share`
  document.body.appendChild(element)
  element.select()
  document.execCommand('copy')
  document.body.removeChild(element)
}

defineOgImageComponent('VFOgCard24', {
  user: {
    display_name: sponsorData[0].name,
    avatar_url: sponsorData[0].share_image_url,
    role: 'sponsor',
  },
})
useHead({
  titleTemplate: (titleChunk) => `${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `${conferenceTitle}`,
      description: ogSponsorDescription,
      url: `${linkUrl}sponsors/${id}/share`,
    }),
    ...twitterOg({
      title: `${conferenceTitle}`,
      description: ogSponsorDescription,
      url: `${linkUrl}sponsors/${id}/share`,
    }),
  ],
})
</script>

<template>
  <div class="session-share-root">
    <VFOgCard24
      class="session"
      :user="{
        display_name: sponsorData[0].name,
        avatar_url: sponsorData[0].share_image_url,
        role: 'sponsor',
      }"
    />
    <VFComment class="invite-comment" :title="$t('invite_vue_fes')" />
    <VFLinkButton
      class="link-button"
      :href="currentLocale === 'ja' ? linkUrl : `${linkUrl}/en`"
      background-color="vue-green/200"
      color="white"
    >
      {{ $t('official_site') }}
    </VFLinkButton>
    <VFComment class="share-session" :title="$t('share_namecard')" />
    <ul class="sns-list">
      <li>
        <VFIconButton
          color="vue-blue"
          name="x40"
          :href="`https://x.com/share?url=${encodeURIComponent(
            `https://vuefes.jp/2024/namecard/${id}/share`,
          )}`"
          target-blank
          can-hover
        />
      </li>
      <li>
        <VFIconButton
          color="vue-blue"
          name="Facebook"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `https://vuefes.jp/2024/namecard/${id}/share`,
          )}`"
          target-blank
        />
      </li>
      <li>
        <div class="copycode">
          <VFCssResetButton @click="copyUrl">
            <VFIcon color="vue-blue" name="external" :can-hover="false" />
          </VFCssResetButton>
          <span>{{ $t('copied') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.session-share-root {
  --header-height: calc(var(--unit) * 10);
  --content-padding: calc(var(--unit) * 15);
  padding-top: calc(var(--header-height) + var(--content-padding));
  padding-bottom: var(--content-padding);
  max-width: 960px;
  margin: 0 auto;
}
.session {
  max-width: 960px;
  margin: 0 auto calc(var(--unit) * 7.5);
}
.invite-comment,
.share-session {
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
.sns-list {
  display: flex;
  justify-content: center;
  gap: calc(var(--unit) * 2.5);
  padding: 0;
  margin: 0;
}
.sns-list li {
  padding: 0;
  margin: 0;
}
.copycode {
  position: relative;
  display: inline-block;
}
.copycode span {
  opacity: 0;
  position: absolute;
  top: 0px;
  right: -5px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 5px;
  transform: translate(100%);
}
.copycode button:focus + span {
  animation: fade-out 8s ease-in;
}
@keyframes fade-out {
  0% {
    visibility: visible;
    opacity: 1;
  }
  100% {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
