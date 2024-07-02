<script setup lang="ts">
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import type { FormStaff } from '~/types/supabase'

interface AddStaffProps {
  staff?: FormStaff
}
const emit = defineEmits<{ close: [] }>()
const props = defineProps<AddStaffProps>()

const { upsertStaff, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

const newStaff = ref({
  ...props.staff?.id && { id: props.staff?.id },
  name: props.staff?.name ?? '',
  image_url: props.staff?.image_url ?? '',
  x_id: props.staff?.x_id ?? '',
  github_id: props.staff?.github_id ?? '',
  is_open: props.staff?.is_open ?? true,
  display_order: props.staff?.display_order ?? null,
})

const updateName = (e: any) => {
  newStaff.value.name = e.target.value
}
const checkFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newStaff.value.image_url = getFullAvatarUrl(filePath)
}
const updateXId = (e: any) => {
  newStaff.value.x_id = e.target.value
}
const updateGithubId = (e: any) => {
  newStaff.value.github_id = e.target.value
}
const updateDisplayOrder = (e: any) => {
  newStaff.value.display_order = e.target.value
}

const onSubmit = () => {
  upsertStaff('staffs', newStaff.value)
}
</script>

<template>
  <div class="container">
    <VFTitle class="title">Staff</VFTitle>
    <div class="form">
      <form @submit="onSubmit">
        <VFInputField
          id="name"
          v-model="newStaff.name"
          name="name"
          label="Name"
          @input="updateName"
        />
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkFiles">
          <div class="upload">
            <img
              v-if="newStaff.image_url"
              alt=""
              :src="newStaff.image_url"
              height="60"
              decoding="async"
            />
            <p>Drag & drop a file</p>
            <p>または</p>
            <p>Select a file</p>
          </div>
        </VFDragDropArea>
        <VFInputField
          id="xId"
          v-model="newStaff.x_id"
          name="xId"
          label="X (Twitter) ID"
          @input="updateXId"
        />
        <VFInputField
          id="githubId"
          v-model="newStaff.github_id"
          name="githubId"
          label="GitHub ID"
          @input="updateGithubId"
        />
        <VFDropdownField
          id="is_open"
          v-model="newStaff.is_open"
          name="is_open"
          label="表示・非表示"
          :items="[
            { value: 'false', text: '非表示' },
            { value: 'true', text: '表示' },
          ]"
        />
        <VFInputField
          id="display_order"
          v-model="newStaff.display_order"
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
