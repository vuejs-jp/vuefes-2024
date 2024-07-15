<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#i18n'
import CreationStatus, { type Status } from '~/components/namecard/CreationStatus.vue'
import { useColor, useTypography } from '@vuejs-jp/composable'
import type { NamecardUser } from '@vuejs-jp/model'

const { t } = useI18n()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

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
</script>
<template>
  <div class="name-card-user-root">
    <h1
      :style="{
        fontWeight: fontWeight('heading/700'),
        fontSize: fontSize('heading/700'),
        color: color('vue-blue'),
      }"
      class="title"
    >
      {{ t('namecard.title_edit') }}
    </h1>
    <CreationStatus :status-key="statusKey" class="creation-status" />
    <VFNamecard23 :user="user" class="namecard" />
    <VFLinkButton
      is="button"
      background-color="vue-green/200"
      color="white"
      href=""
      class="edit-button"
      >{{ t('namecard.edit') }}</VFLinkButton
    >
    <!-- TODO 作成フロー・注記挿入 -->
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.name-card-user-root {
  --header-height: calc(var(--unit) * 10);
  padding-top: calc(var(--header-height) + var(--unit) * 15);
  text-align: center;
}
.title {
  margin-bottom: calc(var(--unit) * 5);
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
  margin: 0 auto calc(var(--unit) * 5);
}
</style>
