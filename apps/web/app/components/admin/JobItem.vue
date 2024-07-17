<script setup lang="ts">
import type { Job, Sponsor } from '@vuejs-jp/model'
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'

interface AddJobProps {
  job?: Job
  sponsors: Sponsor[]
}
const emit = defineEmits<{ close: [] }>()
const props = defineProps<AddJobProps>()

const { upsertJob, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

const newJob = ref({
  ...props.job?.id && { id: props.job?.id },
  sponsor_id: props.job?.sponsor_id ?? '',
  link_url: props.job?.link_url ?? '',
  image_url: props.job?.image_url ?? '',
  image_alt: props.job?.image_alt ?? '',
  display_order: props.job?.display_order ?? null,
  is_open: props.job?.is_open ?? true,
})

const updateDisplayOrder = (e: any) => {
  newJob.value.display_order = e.target.value
}
const updateLinkUrl = (e: any) => {
  newJob.value.link_url = e.target.value
}
const checkFiles = (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newJob.value.image_url = getFullAvatarUrl(filePath)
}
const updateImageAlt = (e: any) => {
  newJob.value.image_alt = e.target.value
}

const onSubmit = () => {
  upsertJob('jobs', newJob.value)
}
</script>

<template>
  <div class="container">
    <VFTitle class="title">Job</VFTitle>
    <div class="form">
      <form @submit="onSubmit">
        <VFDropdownField
          id="sponsor_id"
          v-model="newJob.sponsor_id"
          name="sponsor_id"
          label="スポンサー"
          :items="sponsors.map((s) => ({ value: s.id, text: s.name }))"
        />
        <VFInputField
          id="link_url"
          v-model="newJob.link_url"
          name="link_url"
          label="回遊させたい URL"
          @input="updateLinkUrl"
        />
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkFiles">
          <div class="upload">
            <img
              v-if="newJob.image_url"
              alt=""
              :src="newJob.image_url"
              height="60"
              decoding="async"
            />
            <p>Drag & drop a file</p>
            <p>または</p>
            <p>Select a file</p>
          </div>
        </VFDragDropArea>
        <VFInputField
          id="image_alt"
          v-model="newJob.image_alt"
          name="image_alt"
          label="掲載画像の ALT 属性"
          @input="updateImageAlt"
        />
        <VFInputField
          id="display_order"
          v-model="newJob.display_order"
          name="display_order"
          label="表示順"
          @input="updateDisplayOrder"
        />
        <VFDropdownField
          id="is_open"
          v-model="newJob.is_open"
          name="is_open"
          label="表示・非表示"
          :items="[
            { value: 'false', text: '非表示' },
            { value: 'true', text: '表示' },
          ]"
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
