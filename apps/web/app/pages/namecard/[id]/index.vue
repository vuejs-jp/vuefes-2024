<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from '#i18n'
import { definePageMeta, navigateTo, useSupabaseUser, useRoute } from '#imports'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'
import { useNamecard } from '~/composables/useNamecard'

/* definePageMeta({
  middleware: 'auth',
})
 */
const { t } = useI18n()
const route = useRoute()
const { authUser, statusKey, namecardUser } = await useNamecard()

async function handleLinkButton() {
  navigateTo(`/namecard/${authUser.value?.id}/edit`)
}

watch(
  () => authUser.value?.id,
  (newId) => {
    if (newId) {
      navigateTo(`/namecard/${newId}`)
    }
  },
)

watch(
  () => route.query.code,
  (newCode) => {
    if (newCode && authUser.value?.id) {
      navigateTo(`/namecard/${authUser.value?.id}/`)
    }
  },
  {
    immediate: true,
  },
)
</script>
<template>
  <NuxtLayout name="namecard-base">
    <div v-if="authUser" class="namecard-user-root">
      <CreationStatus :status-key="statusKey" class="creation-status" />
      <VFNamecard24 :user="namecardUser" class="namecard" />
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
    <NuxtLink to="/namecard/">namecard top</NuxtLink>
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
