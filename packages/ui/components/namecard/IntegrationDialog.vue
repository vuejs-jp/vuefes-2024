<script setup lang="ts">
import Dialog from '../common/Dialog.vue'
import LinkButton from '../link/LinkButton.vue'
import Icon from '../icon/Icon.vue'

interface IntegrationDialogProps {
  title: string
}

const props = defineProps<IntegrationDialogProps>()
const emits = defineEmits(['on-close', 'signin'])
</script>

<template>
  <Dialog :aria-label="title" :aria-modal="true" @on-close="$emit('on-close')">
    <div class="dialog-container">
      <h3 class="dialog-title">{{ title }}</h3>
      <slot />
      <ul class="button-list">
        <li>
          <LinkButton
            is="button"
            class="link-button"
            background-color="white"
            color="vue-blue"
            icon-name="Google32"
            @on-click="$emit('signin', 'google')"
          >
            Google
          </LinkButton>
        </li>
        <li>
          <LinkButton
            is="button"
            class="link-button"
            background-color="white"
            color="vue-blue"
            icon-name="GitHub32"
            @on-click="$emit('signin', 'github')"
          >
            GitHub
          </LinkButton>
        </li>
      </ul>
      <button class="close-button" @click="$emit('on-close')">
        <Icon color="vue-blue" name="close" />
      </button>
    </div>
  </Dialog>
</template>

<style scoped>
.dialog-container {
  position: relative;
  padding: 80px 96px;
  display: grid;
  place-items: center;
}
.dialog-container ul {
  padding: 0;
  display: grid;
  place-items: center;
  gap: 12px;
  margin: 40px auto 0;
}
.dialog-container li {
  list-style: none;
}
.link-button {
  width: 498px;
  padding: 30px 0;
}
:deep(.icon) {
  width: 32px;
}
:deep(.text) {
  font-size: 24px;
}
.dialog-title {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.66px;
  margin: 0 auto 26px auto;
}
.close-button {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .dialog-container {
    padding: 60px 24px;
  }
  .dialog-container ul,
  .dialog-container li {
    width: 100%;
  }
  .link-button {
    width: 100%;
    padding: 15px 0;
  }
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  :deep(.text) {
    font-size: 18px;
  }
}
</style>
