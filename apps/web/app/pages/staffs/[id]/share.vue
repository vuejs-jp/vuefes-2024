<script setup lang="ts">
import {
  createError,
  // defineOgImageComponent,
  useAsyncData,
  useHead,
  useRoute,
  useRuntimeConfig,
} from '#imports'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import { conferenceTitle, linkUrl, ogStaffDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'
import type { Staff } from '@vuejs-jp/model'

const config = useRuntimeConfig()
const route = useRoute()
const id = route.params.id as string

const { fetchData } = useSupabase()
const { data: staffs } = await useAsyncData('staffs', async () => {
  return await fetchData('staffs', { detailPageId: id })
})
const staffData = staffs.value?.data as Staff[]
if (!staffData) {
  throw createError({ statusCode: 404, statusMessage: 'Staff not found' })
}

const currentLocale = useLocaleCurrent().locale

const { getStaticAvatarUrl } = useSupabaseStorage()

function copyUrl() {
  const element = document.createElement('input')
  element.value = `https://vuefes.jp/2024/staffs/${id}/share`
  document.body.appendChild(element)
  element.select()
  document.execCommand('copy')
  document.body.removeChild(element)
}

// defineOgImageComponent('VFOgCard24', {
//   user: {
//     display_name: staffData[0].name,
//     avatar_url: staffData[0].image_url,
//     role: 'staff',
//   },
// })
useHead({
  titleTemplate: (titleChunk) => `${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `${staffData[0].name} | ${conferenceTitle}`,
      description: ogStaffDescription,
      url: `${linkUrl}staffs/${id}/share`,
      image: `${config.public.supabaseUrl}/functions/v1/og-image?id=${staffData[0].id}&page=staff`,
    }),
    ...twitterOg({
      title: `${staffData[0].name} | ${conferenceTitle}`,
      description: ogStaffDescription,
      url: `${linkUrl}staffs/${id}/share`,
      image: `${config.public.supabaseUrl}/functions/v1/og-image?id=${staffData[0].id}&page=staff`,
    }),
  ],
})
</script>

<template>
  <div class="staff-share-root">
    <VFOgCard24
      class="staff"
      :user="{
        display_name: staffData[0].name,
        avatar_url: getStaticAvatarUrl(staffData[0].image_url),
        role: 'staff',
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
    <VFComment class="share-staff" :title="$t('share_namecard')" />
    <ul class="sns-list">
      <li>
        <VFIconButton
          color="vue-blue"
          name="x40"
          :href="`https://x.com/share?url=${encodeURIComponent(
            `https://vuefes.jp/2024/staffs/${id}/share`,
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
            `https://vuefes.jp/2024/staffs/${id}/share`,
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
.staff-share-root {
  --header-height: calc(var(--unit) * 10);
  --content-padding: calc(var(--unit) * 15);
  padding-top: calc(var(--header-height) + var(--content-padding));
  padding-bottom: var(--content-padding);
  max-width: 960px;
  margin: 0 auto;
}
.staff {
  max-width: 960px;
  margin: 0 auto calc(var(--unit) * 7.5);
}
.invite-comment,
.share-staff {
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
