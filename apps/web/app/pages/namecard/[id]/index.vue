<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#i18n'
import { navigateTo, useRoute } from '#imports'
import CreationStatus, { type Status } from '~/components/namecard/CreationStatus.vue'
import type { NamecardUser } from '@vuejs-jp/model'

const route = useRoute()
const { t } = useI18n()

const statusKey = computed<Status>(() => {
  // TODO テーブルから取得する
  return 'not_created'
})
const user = computed<NamecardUser>(() => {
  // TODO テーブルから取得する
  return {
    display_name: 'jiyuujin',
    avatar_url: '',
    role: 'attendee',
  }
})

function handleLinkButton() {
  navigateTo(`/namecard/${route.params.id}/edit/`)
}
</script>
<template>
  <NuxtLayout name="namecard-base">
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
    <!-- TODO 作成フロー・注記挿入 -->
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');

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
  margin: 0 auto calc(var(--unit) * 5);
}

/* TODO モバイル版スタイル */
</style>
