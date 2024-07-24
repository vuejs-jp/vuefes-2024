<script setup lang="ts">
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import type { FormSpeaker } from '~/types/supabase'

interface AddSpeakerProps {
  speaker?: FormSpeaker
}
const emit = defineEmits<{ close: [] }>()
const props = defineProps<AddSpeakerProps>()

const { upsertSpeaker, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

const newSpeaker = ref<FormSpeaker>({
  ...props.speaker?.id && { id: props.speaker?.id },
  name_ja: props.speaker?.name_ja ?? '',
  name_en: props.speaker?.name_en ?? '',
  detail_page_id: props.speaker?.detail_page_id ?? '',
  image_url: props.speaker?.image_url ?? '',
  company_ja: props.speaker?.company_ja ?? '',
  company_en: props.speaker?.company_en ?? '',
  position_ja: props.speaker?.position_ja ?? '',
  position_en: props.speaker?.position_en ?? '',
  description_ja: props.speaker?.description_ja ?? '',
  description_en: props.speaker?.description_en ?? '',
  github_id: props.speaker?.github_id ?? '',
  x_id: props.speaker?.x_id ?? '',
  events: props.speaker?.events ?? [],
  session_type: props.speaker?.session_type ??  'session',
  is_open: props.speaker?.is_open ?? true,
  display_order: props.speaker?.display_order ?? null,
  // session_title_ja: '',
  // session_title_en: '',
  // session_description_ja: '',
  // session_description_en: '',
  // session_comment_ja: '',
  // session_comment_en: '',
  // session_place: '',
  // session_time_from: '',
  // session_time_duration: 0,
  // session_doc_title_ja: '',
  // session_doc_title_en: '',
  // session_doc_url: '',
})
const eventsText = ref(props.speaker?.events?.map((e) => e).join(',') ?? '')

const updateNameJa = (e: any) => {
  newSpeaker.value.name_ja = e.target.value
}
const updateNameEn = (e: any) => {
  newSpeaker.value.name_en = e.target.value
}
const updateDetailPageId = (e: any) => {
  newSpeaker.value.detail_page_id = e.target.value
}
const checkFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newSpeaker.value.image_url = getFullAvatarUrl(filePath)
}
const updateCompanyJa = (e: any) => {
  newSpeaker.value.company_ja = e.target.value
}
const updateCompanyEn = (e: any) => {
  newSpeaker.value.company_en = e.target.value
}
const updatePositionJa = (e: any) => {
  newSpeaker.value.position_ja = e.target.value
}
const updatePositionEn = (e: any) => {
  newSpeaker.value.position_en = e.target.value
}
const updateDescriptionJa = (e: any) => {
  newSpeaker.value.description_ja = e.target.value
}
const updateDescriptionEn = (e: any) => {
  newSpeaker.value.description_en = e.target.value
}
const updateGithubId = (e: any) => {
  newSpeaker.value.github_id = e.target.value
}
const updateXId = (e: any) => {
  newSpeaker.value.x_id = e.target.value
}
const updateEvents = (e: any) => {
  eventsText.value = e.target.value
  newSpeaker.value.events = eventsText.value.split(',')
}
const updateDisplayOrder = (e: any) => {
  newSpeaker.value.display_order = e.target.value
}

const onSubmit = () => {
  upsertSpeaker('speakers', newSpeaker.value)
}
</script>

<template>
  <div class="container">
    <VFTitle class="title">Speaker</VFTitle>
    <div class="form">
      <form @submit="onSubmit">
        <VFInputField
          id="name_ja"
          v-model="newSpeaker.name_ja"
          name="name_ja"
          label="名前 [JA]"
          @input="updateNameJa"
        />
        <VFInputField
          id="name_en"
          v-model="newSpeaker.name_en"
          name="name_en"
          label="名前 [EN]"
          @input="updateNameEn"
        />
        <VFInputField
          id="detail_page_id"
          v-model="newSpeaker.detail_page_id"
          name="detail_page_id"
          label="詳細ページのパス"
          @input="updateDetailPageId"
        />
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkFiles">
          <div class="upload">
            <img
              v-if="newSpeaker.image_url"
              alt=""
              :src="newSpeaker.image_url"
              width="60"
              height="60"
              decoding="async"
            />
            <p>Drag & drop a file</p>
            <p>または</p>
            <p>Select a file</p>
          </div>
        </VFDragDropArea>
        <VFInputField
          id="company_ja"
          v-model="newSpeaker.company_ja"
          name="company_ja"
          label="企業 [JA]"
          @input="updateCompanyJa"
        />
        <VFInputField
          id="company_en"
          v-model="newSpeaker.company_en"
          name="company_en"
          label="企業 [EN]"
          @input="updateCompanyEn"
        />
        <VFInputField
          id="position_ja"
          v-model="newSpeaker.position_ja"
          name="position_ja"
          label="肩書き [JA]"
          @input="updatePositionJa"
        />
        <VFInputField
          id="position_en"
          v-model="newSpeaker.position_en"
          name="position_ja"
          label="肩書き [EN]"
          @input="updatePositionEn"
        />
        <VFTextAreaField
          id="description_ja"
          v-model="newSpeaker.description_ja"
          name="description_ja"
          label="スピーカー説明文 [JA]"
          :rows="3"
          @input="updateDescriptionJa"
        />
        <VFTextAreaField
          id="description_en"
          v-model="newSpeaker.description_en"
          name="description_en"
          label="スピーカー説明文 [EN]"
          :rows="3"
          @input="updateDescriptionEn"
        />
        <VFInputField
          id="github_id"
          v-model="newSpeaker.github_id"
          name="github_id"
          label="GitHub ID"
          @input="updateGithubId"
        />
        <VFInputField
          id="x_id"
          v-model="newSpeaker.x_id"
          name="x_id"
          label="X (Twitter) ID"
          @input="updateXId"
        />
        <VFDropdownField
          id="session_type"
          v-model="newSpeaker.session_type"
          name="session_type"
          label="セッションタイプ"
          :items="[
            { value: 'session', text: 'Session' },
            { value: 'lightning-talk', text: 'Lightning Talk' },
            { value: 'sponsor-session', text: 'Sponsor Session' },
            { value: 'panel-event', text: 'Panel Event' },
          ]"
        />
        <VFInputField
          id="events"
          v-model="newSpeaker.events"
          name="events"
          label="パネラーイベント (welcome-vuejs-community と nextgen-frontend-crosstalk から選択可)"
          @input="updateEvents"
        />
        <VFDropdownField
          id="is_open"
          v-model="newSpeaker.is_open"
          name="is_open"
          label="表示・非表示"
          :items="[
            { value: 'false', text: '非表示' },
            { value: 'true', text: '表示' },
          ]"
        />
        <VFInputField
          id="display_order"
          v-model="newSpeaker.display_order"
          name="display_order"
          label="表示順"
          @input="updateDisplayOrder"
        />
        <div class="form-button">
          <VFSubmitButton>Save</VFSubmitButton>
          <VFLinkButton
            is="button"
            class="action"
            background-color="white"
            color="vue-blue"
            @click="emit('close')"
          >
            Close
          </VFLinkButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 600px;
  overflow-y: scroll;
}
.form {
  padding: 40px 20px;
}
form {
  display: grid;
  gap: 40px;
  width: 100%;
}
.upload {
  display: grid;
  place-items: center;
  gap: 8px;
}
.action {
  --height-button: 66px;

  margin-top: 40px;
  height: var(--height-button);
}
</style>
