<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  open: boolean
}
const props = defineProps<Props>()

const dialog = ref<HTMLDialogElement>()
const visible = ref(props.open)

const showModal = () => {
  dialog.value?.showModal()
  visible.value = true
}

defineExpose({
  show: showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible,
})
</script>

<template>
  <dialog ref="dialog" :open class="mask">
    <form v-if="visible" method="dialog" class="root">
      <slot />
    </form>
  </dialog>
</template>

<style scoped>
.root {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  max-width: 960px;
  transition: 0.2s;
  background-color: #fff;
  border: 2px solid var(--color-vue-blue);
}
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
