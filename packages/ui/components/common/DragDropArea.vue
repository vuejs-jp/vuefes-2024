<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface DragDropProps {
  fileName: string
  fileAccept: string
}

interface DragDropEmit {
  (e: 'check-files', value: File[]): void
}

const props = defineProps<DragDropProps>()
const isDragEnter = ref(false)

const emit = defineEmits<DragDropEmit>()

const onDropFile = (e: DragEvent) => {
  if (e.dataTransfer?.files) {
    emit('check-files', Array.from(e.dataTransfer?.files))
  }
}

const onFileInputChange = (event: Event) => {
  const { target } = event
  if (!(target instanceof HTMLInputElement)) return

  if (target.files) {
    emit('check-files', Array.from(target.files))
  }
}

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
  <button
    draggable="true"
    :class="{ '-isDragEnter': isDragEnter }"
    @dragenter="() => (isDragEnter = true)"
    @dragleave="() => (isDragEnter = false)"
    @dragover.prevent
    @drop.prevent="onDropFile"
  >
    <label for="fileupload" class="uploadarea">
      <slot />
      <input
        id="fileupload"
        type="file"
        :name="fileName"
        :accept="fileAccept"
        @change="onFileInputChange"
      />
    </label>
  </button>
</template>

<style scoped>
.uploadarea {
  position: relative;
  display: grid;
  margin: 40px auto;
  place-items: center;
  width: 100%;
  height: 214px;
  cursor: pointer;
}
.uploadarea input {
  display: none;
}
.uploadarea p {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  margin: 0;
  width: 100%;
  text-align: center;
}
</style>
