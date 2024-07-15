<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '#i18n'
import CreationStatus, { type Status } from '~/components/namecard/CreationStatus.vue'
import ImageUploader from '~/components/namecard/ImageUploader.vue'
import type { NamecardUser } from '@vuejs-jp/model'
import { navigateTo, useRoute } from '#imports'

const { t } = useI18n()
const route = useRoute()

// TODO useFormとは別でコンポーザブルを作成する
const name = ref('')
const orderNumber = ref('')
const isSubmitting = ref(true)
function onSubmit(e: any) {
  // TODO フォーム送信処理追加
  e.preventDefault()
  navigateTo(`/namecard/${route.params.id}/edit/complete/`)
}

const updateName = (e: any) => {
  name.value = e.target.value
}
const updateOrderNumber = (e: any) => {
  orderNumber.value = e.target.value
}

const statusKey = computed<Status>(() => {
  // TODO テーブルから取得する
  return 'not_created'
})
const user = computed<NamecardUser>(() => {
  // TODO form から取得する
  return {
    display_name: 'jiyuujin',
    avatar_url: '',
    role: 'attendee',
  }
})
</script>
<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-edit-root">
      <div class="preview-wrapper">
        <VFNamecard23 :user="user" class="namecard" />
        <CreationStatus :status-key="statusKey" class="creation-status" />
      </div>
      <div class="form-wrapper">
        <form @submit="onSubmit">
          <VFInputField
            id="name"
            v-model="name"
            name="name"
            :label="t('namecard.form.label_name')"
            :placeholder="`${t('form.form_placeholder_example')}${t('form.form_name_placeholder')}`"
            required
            :annotation="t('namecard.form.annotation_name')"
            :error="nameError"
            @input="updateName"
            @blur="validateName"
          />
          <ImageUploader :label="t('namecard.form.label_avatar')" />
          <!-- TODO 領収書データ を外部リンク化する -->
          <VFInputField
            id="orderNumber"
            v-model="orderNumber"
            name="orderNumber"
            :label="t('namecard.form.label_order_number')"
            :placeholder="t('namecard.form.placeholder_order_number')"
            required
            :annotation="t('namecard.form.annotation_order_number')"
            :error="orderNumberError"
            @input="updateOrderNumber"
            @blur="validateOrderNumbere"
          />
          <div class="form-buttons">
            <!-- TODO ボタンのスタイルを追加する -->
            <VFSubmitButton :disabled="!isSubmitting">
              {{ $t('namecard.form.submit') }}
            </VFSubmitButton>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');
.namecard-edit-root {
  /** TODO スタイル調整を行う 仮組でflex適応しているだけ */
  display: flex;
  max-width: 769px;
  margin: 0 auto;
  gap: 0 calc(var(--unit) * 8);
}
.form-wrapper {
  text-align: left;
}
/* TODO モバイル版スタイル */
</style>
