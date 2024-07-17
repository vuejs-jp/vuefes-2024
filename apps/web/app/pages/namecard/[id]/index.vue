<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#i18n'
import { navigateTo, useRoute, useAsyncData, useAuthSession, useAuth } from '#imports'
import CreationStatus, { type Status } from '~/components/namecard/CreationStatus.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'
import type { NamecardUser } from '@vuejs-jp/model'
import { useSupabase } from '~/composables/useSupabase'

const route = useRoute()
const { t } = useI18n()

const { fetchAttendeeDataByUserId } = useSupabase()
// TODO 認証確認をどこまで正確に行うか
const { getUser } = useAuth()
const { hasAuth } = useAuthSession()

const { data: authUserId } = await useAsyncData('authUserId', async () => {
  return (await getUser()).id
})

const { data: attendeeByUserId } = await useAsyncData('attendeeByUserId', async () => {
  return await fetchAttendeeDataByUserId('attendees', authUserId.value ?? '')
})

const userData = computed(() => {
  return attendeeByUserId.value?.data?.[0]
})

const statusKey = computed<Status>(() => {
  // TODO テーブルのどの箇所を参照して全ステータスを判定する？
  if (userData.value?.activated_at) {
    return 'inquiry_in_progress'
  } else {
    return 'not_created'
  }
})
const user = computed<NamecardUser>(() => {
  return {
    display_name: userData.value?.display_name ?? '',
    avatar_url: userData.value?.avatar_url ?? '',
    role: userData.value?.role ?? '',
  }
})

function handleLinkButton() {
  navigateTo(`/namecard/${route.params.id}/edit/`)
}
</script>
<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-user-root">
      <CreationStatus :status-key="statusKey" class="creation-status" />
      <VFNamecard23 :user="user" class="namecard" />
      <VFLinkButton
        is="button"
        background-color="vue-green/200"
        color="white"
        class="edit-button"
        @click="handleLinkButton"
        >{{ t('namecard.edit') }}</VFLinkButton
      >
      <CreationProcess />
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');
.namecard-user-root {
  text-align: center;
}
.creation-status {
  margin: 0 auto calc(var(--unit) * 2.5);
}
.namecard {
  margin: 0 auto calc(var(--unit) * 5);
}
.edit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 198px;
  height: 66px;
  margin: 0 auto calc(var(--unit) * 7.5);
}

/* TODO モバイル版スタイル */
</style>
