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

function copyUrl() {
  const element = document.createElement('input')
  element.value = `https://vuefes.jp/2024/namecard/${id}/share`
  document.body.appendChild(element)
  element.select()
  document.execCommand('copy')
  document.body.removeChild(element)
}

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
          <span>コピーしました！</span>
        </div>
      </li>
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
  animation: fade-out 2s ease-in;
}
@keyframes fade-out {
  0% { visibility: visible; opacity: 1; }
  100% { visibility: hidden; opacity: 0; }
}
</style>
