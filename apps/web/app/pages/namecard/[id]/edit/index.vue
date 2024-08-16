<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { useI18n } from '#i18n'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import { definePageMeta, navigateTo } from '#imports'
import { useNamecard } from '~/composables/useNamecard'
import { useFormError } from '~/composables/useFormError'
import ImageUploader from '~/components/namecard/ImageUploader.vue'
import { peatixReferenceUrl } from '~/utils/constants'
import type { Role } from '@vuejs-jp/model'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { path: localePath } = useLocaleCurrent()
const { nameError, orderNumberError, validateNameWithMaxLength, validateOrderNumber } =
  useFormError()
const { authUser, attendeeDataByUserId, statusKey, namecardUser } = await useNamecard()
const { upsertAttendee, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

const name = ref('')
const receiptId = ref('')
const filePathRef = ref<string | null>(null)
const fileRef = ref<File | null>(null)

const isSubmitting = computed(() => {
  if (!name.value || !receiptId.value) return false
  // if (
  //   name.value === attendeeDataByUserId.value.display_name &&
  //   filePathRef.value === attendeeDataByUserId.value.avatar_url &&
  //   receiptId.value === attendeeDataByUserId.value.receipt_id
  // ) {
  //   return false
  // }
  return nameError.value === '' && orderNumberError.value === ''
})
const notEditable = computed(() => {
  return statusKey.value === 'inquiry_completed'
})

const updateName = (e: any) => {
  name.value = e.target.value
}
const updateReceiptId = (e: any) => {
  receiptId.value = e.target.value
}

const namecard = ref({ ...namecardUser.value })
watch(
  () => namecardUser.value,
  () => { namecard.value = { ...namecardUser.value } },
)

const newAttendee = ref({
  ...namecardUser.value,
})

name.value = newAttendee.value?.display_name ?? ''
receiptId.value = newAttendee.value?.receipt_id ?? ''

watchEffect(() => {
  newAttendee.value.display_name = name.value
  newAttendee.value.receipt_id = receiptId.value
  namecard.value.display_name = name.value
  namecard.value.receipt_id = receiptId.value
})

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
  e.preventDefault()

  const submitEvent = e as SubmitEvent
  const submitter = submitEvent.submitter as HTMLElement

  if (submitter && submitter.id === 'submit-button' && filePathRef.value && fileRef.value) {
    uploadAvatar(filePathRef.value, fileRef.value)
    newAttendee.value.avatar_url = getFullAvatarUrl(filePathRef.value)

    const baseData = {
      email: attendeeDataByUserId.value?.email ?? authUser.value?.email ?? '',
      provider: attendeeDataByUserId.value?.provider ?? authUser.value?.app_metadata.provider ?? '',
      user_id: attendeeDataByUserId.value?.user_id ?? authUser.value?.id ?? '',
      role: (attendeeDataByUserId.value?.role as Role) || 'attendee',
    }
    const id = {
      id: attendeeDataByUserId.value?.id ?? '',
    }
    if (attendeeDataByUserId.value?.created_at) {
      upsertAttendee('attendees', {
        ...id,
        ...newAttendee.value,
        ...baseData,
      })
    } else {
      upsertAttendee('attendees', {
        ...newAttendee.value,
        ...baseData,
      })
    }

    navigateTo(`/namecard/${authUser.value?.id}/edit/complete/`)
  }
}
</script>
<template>
  <NuxtLayout name="namecard-base">
    <form class="namecard-edit-root" @submit.prevent="onSubmit">
      <div class="preview-wrapper">
        <VFNamecard24 :user="namecard" class="namecard" />
        <CreationStatus :status-key="statusKey" size="small" class="creation-status" />
      </div>
      <div class="form-wrapper">
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
          @blur="validateNameWithMaxLength"
        >
          <p class="annotation">{{ t('namecard.form.annotation_name') }}</p>
        </VFInputField>
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
          :disabled="notEditable"
          :error="orderNumberError"
          @input="updateReceiptId"
          @blur="validateOrderNumber"
        >
          <div class="annotation">
            <i18n-t keypath="namecard.annotation_order_number" tag="p">
              <template #peatixReferenceUrl>
                <a :href="peatixReferenceUrl" target="_blank">{{ $t('namecard.receipt_data') }}</a>
              </template>
            </i18n-t>
          </div>
        </VFInputField>
      </div>
      <div class="form-buttons">
        <VFLinkButton
          :href="`${localePath}/namecard/${authUser?.id}/`"
          target="_self"
          background-color="white"
          color="vue-blue"
          class="button cancel-button"
        >
          {{ t('namecard.cancel') }}
        </VFLinkButton>
        <VFSubmitButton id="submit-button" class="button submit-button" :disabled="!isSubmitting">
          {{ $t('namecard.form.submit') }}
        </VFSubmitButton>
      </div>
    </form>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');
.namecard-edit-root {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px calc(var(--unit) * 8);
  grid-auto-flow: row;
  grid-template-areas:
    'namecard form form'
    'namecard form form'
    'button button button';

  max-width: 769px;
  padding: var(--namecard-edit-padding);
  margin: 0 auto;

  @media (--tablet) {
    --namecard-edit-padding: calc(var(--unit) * 2) 0;
  }

  @media (--mobile) {
    width: 100%;
  }
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
