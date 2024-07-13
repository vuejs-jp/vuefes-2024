<script setup lang="ts">
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'
import type { FormAttendee } from '~/types/supabase'

interface AddAttendeeProps {
  attendee?: FormAttendee
}
const emit = defineEmits<{ close: [] }>()
const props = defineProps<AddAttendeeProps>()

const { upsertAttendee, uploadAvatar } = useSupabase()
const { getFullAvatarUrl } = useSupabaseStorage()

const newAttendee = ref({
  ...props.attendee?.id && { id: props.attendee?.id },
  user_id: props.attendee?.user_id ?? '',
  email: props.attendee?.email ?? '',
  avatar_url: props.attendee?.avatar_url ?? '',
  provider: props.attendee?.provider ?? '',
  display_name: props.attendee?.display_name ?? '',
  role: props.attendee?.role ?? '',
  receipt_id: props.attendee?.receipt_id ?? '',
  activated_at: props.attendee?.activated_at ?? null,
})

const checkFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  uploadAvatar(filePath, file)

  newAttendee.value.avatar_url = getFullAvatarUrl(filePath)
}
const updateDisplayName = (e: any) => {
  newAttendee.value.display_name = e.target.value
}

const onSubmit = () => {
  upsertAttendee('attendees', newAttendee.value)
}
</script>

<template>
  <div class="container">
    <VFTitle class="title">Sponsor</VFTitle>
    <div class="form">
      <form @submit="onSubmit">
        <VFInputField
          id="user_id"
          v-model="newAttendee.user_id"
          name="user_id"
          label="User ID"
          disabled
        />
        <VFInputField
          id="name"
          v-model="newAttendee.email"
          name="name"
          label="Name"
          disabled
        />
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkFiles">
          <div class="upload">
            <img
              v-if="newAttendee.avatar_url"
              alt=""
              :src="newAttendee.avatar_url"
              height="60"
              decoding="async"
            />
            <p>Drag & drop a file</p>
            <p>または</p>
            <p>Select a file</p>
          </div>
        </VFDragDropArea>
        <VFInputField
          id="provider"
          v-model="newAttendee.provider"
          name="provider"
          label="Provider (GitHub or Google)"
          disabled
        />
        <VFInputField
          id="display_name"
          v-model="newAttendee.display_name"
          name="display_name"
          label="Display Name"
          @input="updateDisplayName"
        />
        <VFInputField
          id="role"
          v-model="newAttendee.role"
          name="role"
          label="Attendee Role"
          disabled
        />
        <VFInputField
          id="receipt_id"
          v-model="newAttendee.receipt_id"
          name="receipt_id"
          label="Receipt ID"
          disabled
        />
        <VFInputField
          id="activated_at"
          v-model="newAttendee.activated_at"
          name="activated_at"
          label="Activated DateTime"
          disabled
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
