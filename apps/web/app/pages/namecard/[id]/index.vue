<script setup lang="ts">
import { useI18n } from '#i18n'
import { navigateTo } from '#imports'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'
import { useNamecard } from '~/composables/useNamecard'

const { t } = useI18n()
const { authUserId, statusKey, attendee } = await useNamecard()

function handleLinkButton() {
  navigateTo(`/namecard/${authUserId.value}/edit/`)
}
</script>
<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-user-root">
      <CreationStatus :status-key="statusKey" class="creation-status" />
      <VFNamecard23 :user="attendee" class="namecard" />
      <VFLinkButton
        is="button"
        background-color="vue-green/200"
        color="white"
        class="edit-button"
        @click="handleLinkButton"
        >{{ t('namecard.edit') }}</VFLinkButton
      >
      <CreationProcess />
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');
.namecard-user-root {
  text-align: center;
}
.creation-status {
  margin: 0 auto calc(var(--unit) * 2.5);
}
.namecard {
  margin: 0 auto calc(var(--unit) * 5);
}
.edit-button {
  --height-button: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 198px;
  height: var(--height-button);
  margin: 0 auto calc(var(--unit) * 7.5);
}

@media (--mobile) {
  .edit-button {
    --height-button: 58px;

    &:deep(.text) {
      font-size: var(--font-size-body400);
    }
  }
}
</style>
