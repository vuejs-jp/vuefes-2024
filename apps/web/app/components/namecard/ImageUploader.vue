<script setup lang="ts">
import { useI18n } from '#i18n'
import { onMounted, ref } from 'vue'
import { useColor, useTypography } from '@vuejs-jp/composable'

interface DragDropProps {
  fileAccept: string
}

defineProps<DragDropProps>()
const isDragEnter = ref(false)

const emit = defineEmits<{
  'check-files': [e: Event, value: File[]]
}>()

const fileName = ref<string | null>()

const { t } = useI18n()
const onDropFile = (e: DragEvent) => {
  e.preventDefault()
  if (e.dataTransfer?.files) {
    fileName.value = e.dataTransfer.files[0].name
    emit('check-files', e, Array.from(e.dataTransfer.files))
  }
}

function handleCloseButton(e: Event) {
  fileName.value = null
  emit('check-files', e, [])
}

const onFileInputChange = (event: Event) => {
  event.preventDefault()
  const { target } = event
  if (!(target instanceof HTMLInputElement)) return

  if (target.files) {
    fileName.value = target.files[0].name
    emit('check-files', event, Array.from(target.files))
  }
}

const { color: updateColor } = useColor()
const { fontWeight, fontSize } = useTypography()

onMounted(() => {
  window.ondrop = (e) => {
    e.preventDefault()
  }
  window.ondragover = (e) => {
    e.preventDefault()
  }
})
</script>

<template>
  <label
    for="fileupload"
    class="drag-drop-area-root"
    :style="{
      fontSize: fontSize('body/300'),
      fontWeight: fontWeight('heading/100'),
      color: updateColor('vue-green/200'),
    }"
  >
    {{ t('namecard.form.label_avatar') }}
    <div v-if="fileName" class="file-name-area">
      <p class="file-name">{{ fileName }}</p>
      <VFIconButton
        class="icon-close"
        color="vue-blue"
        name="close"
        can-hover
        @click="handleCloseButton"
      />
    </div>
    <button
      v-else
      draggable="true"
      class="drag-drop-area"
      :class="{ '-isDragEnter': isDragEnter }"
      @dragenter="() => (isDragEnter = true)"
      @dragleave="() => (isDragEnter = false)"
      @dragover.prevent
      @drop.prevent="onDropFile"
    >
      <div class="message-area">
        <p
          class="label"
          :style="{
            fontSize: fontSize('body/400'),
            fontWeight: fontWeight('heading/200'),
            color: updateColor('vue-blue'),
          }"
        >
          {{ t('namecard.form.drag_and_drop') }}
        </p>
        <p
          class="label or"
          :style="{
            fontSize: fontSize('body/200'),
            fontWeight: fontWeight('body/300'),
            color: updateColor('vue-blue'),
          }"
        >
          {{ t('namecard.form.or') }}
        </p>
      </div>
      <input
        id="fileUpload"
        class="select-button"
        type="file"
        name="avatar"
        :accept="fileAccept"
        @change="onFileInputChange"
      />
    </button>
    <p
      class="annotation"
      :style="{
        fontSize: fontSize('body/300'),
        fontWeight: fontWeight('body/300'),
        color: updateColor('vue-blue'),
      }"
    >
      {{ t('namecard.form.annotation_avatar') }}
    </p>
    <!--   TODO エラー制御
    <Typography v-if="errorMessage" variant="body/200" color="sangosyo/200">{{
      errorMessage
    }}</Typography> -->
  </label>
</template>

<style scoped>
@import url('~/assets/media.css');

.drag-drop-area-root {
  display: inline-block;
}
.drag-drop-area {
  width: 100%;
  margin: calc(var(--unit) * 1.5) auto;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  background-color: #fff;
  color: var(--color-vue-blue);
}
.drag-drop-area:hover {
  transition: 0.2s;
  box-shadow: 0 2px 10px rgba(53, 73, 94, 14%);
}
.file-name-area {
  width: 100%;
  margin: calc(var(--unit) * 1.5) auto;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  background: #c6cacf40;
  color: var(--color-vue-blue);
  padding: calc(var(--unit) * 3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.file-name {
  flex-grow: 1;
  text-align: center;
}
.icon-close {
  display: inline-block;
  text-align: right;
  height: 22px;
}
.message-area {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: var(--height-input-area);
  width: 100%;
  padding: calc(var(--unit) * 3) calc(var(--unit) * 3) 0;
  text-align: center;
}
.label {
  margin-bottom: calc(var(--unit) * 1.5);
}
#fileUpload {
  font-size: 0;
}
::file-selector-button {
  --height-button: 50px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-body400);
  font-weight: 700;
  color: var(--color-vue-blue);
  background-color: var(--color-white);

  height: var(--height-button);
  padding: 0 43px;
  margin: 0 auto calc(var(--unit) * 3);
  border: 2px solid var(--color-vue-blue);
  border-radius: var(--height-button);
  cursor: pointer;
}
::file-selector-button:hover {
  transition: 0.2s;
  color: var(--color-white);
  background-color: var(--color-vue-blue);
  box-shadow: 0 2px 10px rgba(53, 73, 94, 14%);
}
</style>
