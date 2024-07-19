<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import { useI18n } from '#i18n'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
// import ImageUploader from '~/components/namecard/ImageUploader.vue'
import { navigateTo } from '#imports'
import { useNamecard } from '~/composables/useNamecard'
import ImageUploader from '~/components/namecard/ImageUploader.vue'

const { t } = useI18n()
const { authUserId, statusKey, attendee } = await useNamecard()
const { upsertAttendee, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

// TODO useFormとは別でコンポーザブルを作成する
const name = ref('')
const receiptId = ref('')
const isSubmitting = ref(true)

const updateName = (e: any) => {
  name.value = e.target.value
}
const updateReceiptId = (e: any) => {
  receiptId.value = e.target.value
}

const newAttendee = ref({
  ...attendee.value,
})

name.value = newAttendee.value?.display_name ?? ''
receiptId.value = newAttendee.value?.receipt_id ?? ''

watchEffect(() => {
  newAttendee.value.display_name = name.value
  newAttendee.value.receipt_id = receiptId.value
})

const avatarPreview = ref<string>()
const checkFiles = (e: Event, files: File[]) => {
  e.preventDefault()
  if (files.length === 0) return

  const file = files[0]

  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result as string
  }
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newAttendee.value.avatar_url = getFullAvatarUrl(filePath)
  // TODO avatarPreviewを利用してプレビューを表示するか、既存の実装を利用するか検討
  // newAttendee.value.avatar_url = avatarPreview.value ?? ''
}
function onSubmit(e: Event) {
  console.log('🤩🤩onSubmit')
  // TODO フォーム送信処理追加
  // TODO updated_atに現在時刻を追加する必要ある？supabaseの機能でなんかない？
  e.preventDefault()

  const submitEvent = e as SubmitEvent
  const submitter = submitEvent.submitter as HTMLElement

  if (submitter && submitter.id === 'submit-button') {
    upsertAttendee('attendees', newAttendee.value)

    navigateTo(`/namecard/${authUserId.value}/edit/complete/`)
  }
}
</script>
<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-edit-root">
      <div class="preview-wrapper">
        <VFNamecard23 :user="newAttendee" class="namecard" />
        <CreationStatus :status-key="statusKey" class="creation-status" />
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="onSubmit">
          <VFInputField
            id="name"
            v-model="name"
            class="name"
            name="name"
            :label="t('namecard.form.label_name')"
            :placeholder="`${t('form.form_placeholder_example')}${t('form.form_name_placeholder')}`"
            required
            :annotation="t('namecard.form.annotation_name')"
            :error="nameError"
            @input="updateName"
            @blur="validateName"
          />
          <ImageUploader
            class="image-uploader"
            file-accept="image/*"
            @check-files.prevent="checkFiles"
          />
          <!-- TODO 領収書データ を外部リンク化する Nuxt Content使う -->
          <VFInputField
            id="orderNumber"
            v-model="receiptId"
            class="order-number"
            name="orderNumber"
            :label="t('namecard.form.label_order_number')"
            :placeholder="t('namecard.form.placeholder_order_number')"
            required
            :annotation="t('namecard.form.annotation_order_number')"
            :error="orderNumberError"
            @input="updateReceiptId"
            @blur="validateOrderNumbere"
          />
          <div class="form-buttons">
            <!-- TODO ボタン キャンセルボタン disable の制御 スタイルを追加する disable の制御も -->
            <VFSubmitButton id="submit-button" :disabled="!isSubmitting">
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

.name,
.image-uploader {
  margin-bottom: calc(var(--unit) * 5);
}
.order-number {
  margin-bottom: calc(var(--unit) * 10);
}

:deep(.input-root) {
  font-size: var(--font-size-body300);
  font-weight: 700;
  color: var(--color-vue-green200);
}
:deep(.annotation) {
  font-weight: 500;
  color: var(--color-vue-blue);
}

/* TODO モバイル版スタイル */
</style>
