<script setup lang="ts">
import type { Speaker } from '@vuejs-jp/model'
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import type { FormSponsor } from '~/types/supabase'

interface AddSponsorProps {
  sponsor?: FormSponsor
  speakers: Speaker[]
}
const emit = defineEmits<{ close: [] }>()
const props = defineProps<AddSponsorProps>()

const { upsertSponsor, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

const newSponsor = ref({
  ...props.sponsor?.id && { id: props.sponsor?.id },
  name: props.sponsor?.name ?? '',
  detail_page_id: props.sponsor?.detail_page_id ?? '',
  image_url: props.sponsor?.image_url ?? '',
  share_image_url: props.sponsor?.share_image_url ?? '',
  description_ja: props.sponsor?.description_ja ?? '',
  description_en: props.sponsor?.description_en ?? '',
  link_url: props.sponsor?.link_url ?? '',
  speaker_id: props.sponsor?.speaker_id ?? [],
  tag: props.sponsor?.tag ?? [],
  is_open: props.sponsor?.is_open ?? true,
  display_order: props.sponsor?.display_order ?? null,
})
const tagText = ref(props.sponsor?.tag?.map((t) => t).join(',') ?? '')
const speakerIdText = ref(props.sponsor?.speaker_id?.map((s) => s).join(',') ?? '')

const newSpeakerId = ref('')

const updateName = (e: any) => {
  newSponsor.value.name = e.target.value
}
const updateDetailPageId = (e: any) => {
  newSponsor.value.detail_page_id = e.target.value
}
const checkFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newSponsor.value.image_url = getFullAvatarUrl(filePath)
}
const checkShareFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newSponsor.value.share_image_url = getFullAvatarUrl(filePath)
}
const updateDescriptionJa = (e: any) => {
  newSponsor.value.description_ja = e.target.value
}
const updateDescriptionEn = (e: any) => {
  newSponsor.value.description_en = e.target.value
}
const updateLinkUrl = (e: any) => {
  newSponsor.value.link_url = e.target.value
}
const selectSpeakerId = (e: any) => {
  newSpeakerId.value = e.target.value
  speakerIdText.value = `${speakerIdText.value ? `${speakerIdText.value},` : ''}${newSpeakerId.value}`
  newSponsor.value.speaker_id = speakerIdText.value.split(',')
}
const updateSpeakerId = (e: any) => {
  speakerIdText.value = e.target.value
  newSponsor.value.speaker_id = speakerIdText.value.split(',')
}
const updateTag = (e: any) => {
  tagText.value = e.target.value
  newSponsor.value.tag = tagText.value.split(',')
}
const updateDisplayOrder = (e: any) => {
  newSponsor.value.display_order = e.target.value
}

const onSubmit = () => {
  upsertSponsor('sponsors', newSponsor.value)
  tagText.value = ''
}
</script>

<template>
  <div class="container">
    <VFTitle class="title">Sponsor</VFTitle>
    <div class="form">
      <form @submit="onSubmit">
        <VFInputField
          id="name"
          v-model="newSponsor.name"
          name="name"
          label="Name"
          @input="updateName"
        />
        <VFInputField
          id="detail_page_id"
          v-model="newSponsor.detail_page_id"
          name="detail_page_id"
          label="詳細ページのパス"
          @input="updateDetailPageId"
        />
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkFiles">
          <div class="upload">
            <img
              v-if="newSponsor.image_url"
              alt=""
              :src="newSponsor.image_url"
              height="60"
              decoding="async"
            />
            <p>Drag & drop an image file</p>
            <p>または</p>
            <p>Select an image file</p>
          </div>
        </VFDragDropArea>
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkShareFiles">
          <div class="upload">
            <img
              v-if="newSponsor.share_image_url"
              alt=""
              :src="newSponsor.share_image_url"
              height="60"
              decoding="async"
            />
            <p>Drag & drop a share image file</p>
            <p>または</p>
            <p>Select a share image file</p>
          </div>
        </VFDragDropArea>
        <VFTextAreaField
          id="description_ja"
          v-model="newSponsor.description_ja"
          name="description_ja"
          label="Description [JA]"
          :rows="3"
          @input="updateDescriptionJa"
        />
        <VFTextAreaField
          id="description_en"
          v-model="newSponsor.description_en"
          name="description_en"
          label="Description [EN]"
          :rows="3"
          @input="updateDescriptionEn"
        />
        <VFInputField
          id="link_url"
          v-model="newSponsor.link_url"
          name="link_url"
          label="Link URL"
          @input="updateLinkUrl"
        />
        <VFDropdownField
          id="newSpeakerId"
          v-model="newSpeakerId"
          name="newSpeakerId"
          label="スピーカーを選択する"
          :items="speakers.map((s: Speaker) => ({ value: s.id, text: s.name_ja }))"
          @input="selectSpeakerId"
        />
        <VFInputField
          id="speakerIdText"
          v-model="speakerIdText"
          name="speakerIdText"
          label="スピーカーを編集する"
          @input="updateSpeakerId"
        />
        <VFInputField
          id="tagText"
          v-model="tagText"
          name="tagText"
          label="Tag"
          @input="updateTag"
        />
        <VFDropdownField
          id="is_open"
          v-model="newSponsor.is_open"
          name="is_open"
          label="表示・非表示"
          :items="[
            { value: 'false', text: '非表示' },
            { value: 'true', text: '表示' },
          ]"
        />
        <VFInputField
          id="display_order"
          v-model="newSponsor.display_order"
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
.action {
  --height-button: 66px;

  margin-top: 40px;
  height: var(--height-button);
}
@media (--tablet) {
  .action {
    --height-button: 49px;
  }
}
</style>
