<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#i18n'
import CreationStatus, { type Status } from '~/components/namecard/CreationStatus.vue'
import type { NamecardUser } from '@vuejs-jp/model'

const { t } = useI18n()
const statusKey = computed<Status>(() => {
  // TODO テーブルから取得する
  return 'inquiry_in_progress'
})
const user = computed<NamecardUser>(() => {
  // TODO テーブルから取得する
  return {
    display_name: 'jiyuujin',
    avatar_url: '',
    role: 'attendee',
  }
})
</script>
<template>
  <NuxtLayout name="namecard-base">
    <p>{{ t('namecard.form.registrationCompleted') }}</p>
    <!-- TODO テキスト&SNSリンク追加 -->
    <CreationStatus :status-key="statusKey" class="creation-status" />
    <VFNamecard23 :user="user" class="namecard" />
  </NuxtLayout>
</template>
