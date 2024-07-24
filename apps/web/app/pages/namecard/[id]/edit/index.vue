<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useI18n } from '#i18n'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import { navigateTo } from '#imports'
import { useNamecard } from '~/composables/useNamecard'
import ImageUploader from '~/components/namecard/ImageUploader.vue'

const { t } = useI18n()
const { authUserId, statusKey, attendee } = await useNamecard()
const { upsertAttendee, uploadAvatar } = useSupabase()

const name = ref('')
const receiptId = ref('')
const isSubmitting = computed(() => {
  return name.value && receiptId.value && filePathRef.value && fileRef.value
})

const updateName = (e: any) => {
  name.value = e.target.value
}
const updateReceiptId = (e: any) => {
  receiptId.value = e.target.value
}

const namecard = ref({ ...attendee.value })

const newAttendee = ref({
  ...attendee.value,
})

name.value = newAttendee.value?.display_name ?? ''
receiptId.value = newAttendee.value?.receipt_id ?? ''

watchEffect(() => {
  newAttendee.value.display_name = name.value
  newAttendee.value.receipt_id = receiptId.value
  namecard.value.display_name = name.value
  namecard.value.receipt_id = receiptId.value
})

const filePathRef = ref<string | null>(null)
const fileRef = ref<File | null>(null)

const checkFiles = (e: Event, files: File[]) => {
  e.preventDefault()
  if (files.length === 0) {
    filePathRef.value = null
    fileRef.value = null
    namecard.value.avatar_url = ''
  } else {
    const file = files[0]

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      namecard.value.avatar_url = e.target?.result as string
    }
    const fileExt = file.name.split('.').pop()
    const filePath = `/${Math.random()}.${fileExt}`

    fileRef.value = file
    filePathRef.value = filePath
  }
}

function onSubmit(e: Event) {
  // TODO updated_atに現在時刻を追加する必要ある？supabaseの機能でなんかない？
  e.preventDefault()

  const submitEvent = e as SubmitEvent
  const submitter = submitEvent.submitter as HTMLElement

  if (submitter && submitter.id === 'submit-button' && filePathRef.value && fileRef.value) {
    upsertAttendee('attendees', newAttendee.value)
    uploadAvatar(filePathRef.value, fileRef.value)

    navigateTo(`/namecard/${authUserId.value}/edit/complete/`)
  }
}

// TODO バリデート、エラー制御を追加する
</script>
<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-edit-root">
      <div class="preview-wrapper">
        <VFNamecard23 :user="namecard" class="namecard" />
        <CreationStatus :status-key="statusKey" size="small" class="creation-status" />
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
            :error="nameError"
            @input="updateName"
            @blur="validateName"
            ><p class="annotation">{{ t('namecard.form.annotation_name') }}</p></VFInputField
          >
          <ImageUploader
            class="image-uploader"
            file-accept="image/*"
            @check-files.prevent="checkFiles"
          />
          <VFInputField
            id="orderNumber"
            v-model="receiptId"
            class="order-number"
            name="orderNumber"
            :label="t('namecard.form.label_order_number')"
            :placeholder="t('namecard.form.placeholder_order_number')"
            required
            :error="orderNumberError"
            @input="updateReceiptId"
            @blur="validateOrderNumbere"
            ><div class="annotation"><MarkDownText path="namecard_annotation_order_number" /></div
          ></VFInputField>
        </form>
      </div>
      <div class="form-buttons">
        <VFLinkButton
          class="button cancel-button"
          background-color="white"
          color="vue-blue"
          :href="`/namecard/${authUserId}`"
          target="_self"
          >{{ $t('cancel') }}</VFLinkButton
        >
        <VFSubmitButton id="submit-button" class="button submit-button" :disabled="!isSubmitting">
          {{ $t('namecard.form.submit') }}
        </VFSubmitButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');
.namecard-edit-root {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'namecard form form'
    'namecard form form'
    'button button button';

  max-width: 769px;
  margin: 0 auto;
  gap: 0 calc(var(--unit) * 8);
}
.preview-wrapper {
  grid-area: namecard;
}
.form-wrapper {
  grid-area: form;
  text-align: left;
}
.form-buttons {
  --width-form-buttons: 474px;
  grid-area: button;
  width: var(--width-form-buttons);
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.namecard {
  margin-bottom: calc(var(--unit) * 2);
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
.annotation,
.annotation:deep(p) {
  font-weight: 500;
  color: var(--color-vue-blue);
}
.button {
  --button-width: 222px;
  --button-height: 66px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--button-width);
  height: var(--button-height);
}

@media (--mobile) {
  .namecard-edit-root {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'namecard'
      'form'
      'button';
    gap: calc(var(--unit) * 5);
  }
  .preview-wrapper {
    text-align: center;
  }
  .namecard {
    margin: 0 auto calc(var(--unit) * 2);
  }
  .order-number {
    margin-bottom: calc(var(--unit) * 5);
  }
  .form-buttons {
    display: block;
    --width-form-buttons: 100%;
    text-align: center;
  }
  .cancel-button {
    width: 222px;
    margin-bottom: calc(var(--unit) * 2.5);

    &:deep(.text) {
      font-size: var(--font-size-body400);
    }
  }
  .submit-button {
    width: 198px;
  }
  .form-buttons :deep(.submit-button) {
    font-size: var(--font-size-body400);
    padding: 0;
  }
}
</style>
