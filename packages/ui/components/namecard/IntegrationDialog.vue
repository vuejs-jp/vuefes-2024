<script setup lang="ts">
import Dialog from '../common/Dialog.vue'
import LinkButton from '../link/LinkButton.vue'

interface IntegrationDialogProps {
  title: string
}

const props = defineProps<IntegrationDialogProps>()
const emits = defineEmits(['on-close', 'signin'])
</script>

<template>
  <Dialog @on-close="$emit('on-close')">
    <div class="dialog-container">
      <h3 class="dialog-title">{{ title }}</h3>
      <slot />
      <ul>
        <li>
          <LinkButton
            is="button"
            class="link-button"
            background-color="white"
            color="vue-blue"
            icon-name="Google24"
            @on-click="$emit('signin', 'google')"
          >
            Google
          </LinkButton>
        </li>
        <li>
          <div class="separator">OR</div>
        </li>
        <li>
          <LinkButton
            is="button"
            class="link-button"
            background-color="white"
            color="vue-blue"
            icon-name="GitHub"
            @on-click="$emit('signin', 'github')"
          >
            GitHub
          </LinkButton>
        </li>
        <li>
          <div class="separator">OR</div>
        </li>
        <li>
          <LinkButton
            is="button"
            class="link-button"
            background-color="white"
            color="vue-blue"
            icon-name="x22"
            @on-click="$emit('signin', 'x')"
          >
            X
          </LinkButton>
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<style scoped>
.dialog-container {
  padding: 16px 0;
  display: grid;
  place-items: center;
  gap: 32px;
}
.dialog-container ul {
  padding: 0;
  display: grid;
  place-items: center;
  gap: 12px;
  margin: 0 auto;
}
.dialog-container li {
  list-style: none;
}
.dialog-container button {
  padding: 32px 72px;
  width: 280px;
}
.dialog-title {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.66px;
}
</style>
