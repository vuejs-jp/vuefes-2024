<script setup lang="ts">
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseStorage } from '~/composables/useSupabaseStorage'

const emit = defineEmits<{ close: [] }>()

const { getFullAvatarUrl } = useSupabaseStorage()

const newSponsor = ref({
  name: '',
  image_url: '',
  descriptionJa: '',
  descriptionEn: '',
  linkUrl: '',
  tag: '',
})

const updateName = (e: any) => {
  newSponsor.value.name = e.target.value
}
const checkFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  // const filename = file.name
  const fileExt = file.name.split('.').pop()
  const filePath = `/${Math.random()}.${fileExt}`

  // uploadAvatar(filePath, file)

  newSponsor.value.image_url = getFullAvatarUrl(filePath)
}
const updateDescriptionJa = (e: any) => {
  newSponsor.value.descriptionJa = e.target.value
}
const updateDescriptionEn = (e: any) => {
  newSponsor.value.descriptionEn = e.target.value
}
const updateLinkUrl = (e: any) => {
  newSponsor.value.linkUrl = e.target.value
}
const updateTag = (e: any) => {
  newSponsor.value.tag = e.target.value
}

const onSubmit = () => {
  // addData('sponsors', newSponsor)
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
        <VFDragDropArea file-name="profiledata" file-accept="image/*" @check-files="checkFiles">
          <div class="upload">
            <p>Drag & drop a file</p>
            <p>または</p>
            <p>Select a file</p>
          </div>
        </VFDragDropArea>
        <VFInputField
          id="descriptionJa"
          v-model="newSponsor.descriptionJa"
          name="descriptionJa"
          label="Description [Ja]"
          @input="updateDescriptionJa"
        />
        <VFInputField
          id="descriptionEn"
          v-model="newSponsor.descriptionEn"
          name="descriptionEn"
          label="Description [En]"
          @input="updateDescriptionEn"
        />
        <VFInputField
          id="linkUrl"
          v-model="newSponsor.linkUrl"
          name="linkUrl"
          label="Link URL"
          @input="updateLinkUrl"
        />
        <VFInputField
          id="tag"
          v-model="newSponsor.tag"
          name="tag"
          label="Tag"
          @input="updateTag"
        />
        <div class="form-button">
          <VFSubmitButton>Save</VFSubmitButton>
          <VFLinkButton
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
