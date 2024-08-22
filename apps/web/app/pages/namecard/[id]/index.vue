<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from '#i18n'
import { navigateTo, useRoute } from '#imports'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { useNamecard } from '~/composables/useNamecard'

const { t } = useI18n()
const { locale: currentLocale } = useLocaleCurrent()
const route = useRoute()
const { authUser, statusKey, namecardUser } = await useNamecard()

async function handleLinkButton() {
  navigateTo(`${currentLocale.value === 'ja' ? '/' : `/${currentLocale.value}/`}namecard/${authUser.value?.id}/edit`)
}

watch(
  () => authUser.value?.id,
  (newId) => {
    if (newId) {
      navigateTo(`${currentLocale.value === 'ja' ? '/' : `/${currentLocale.value}/`}namecard/${newId}/`)
    }
  },
)

watch(
  () => route.query.code,
  (newCode) => {
    if (newCode && authUser.value?.id) {
      navigateTo(`${currentLocale.value === 'ja' ? '/' : `/${currentLocale.value}/`}namecard/${authUser.value?.id}/`)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-user-root">
      <template v-if="statusKey !== 'not_created'">
        <VFComment :title="t('namecard.lets_share')" class="share-comment" />
        <div class="sns-buttons">
          <VFIconButton
            name="x40"
            color="vue-blue"
            :href="`https://x.com/share?url=${encodeURIComponent(
              `https://vuefes.jp/2024/namecard/${authUser?.id}/share`,
            )}`"
            target-blank
            can-hover
            class="sns-button"
          />
          <VFIconButton
            name="Facebook"
            color="vue-blue"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              `https://vuefes.jp/2024/namecard/${authUser?.id}/share`,
            )}`"
            target-blank
            class="sns-button"
          />
        </div>
      </template>
      <CreationStatus :status-key="statusKey" class="creation-status" />
      <VFNamecard24 :user="namecardUser" class="namecard" />
      <VFLinkButton
        is="button"
        background-color="vue-green/200"
        color="white"
        class="edit-button"
        @click="handleLinkButton"
      >
        {{ t('namecard.edit') }}
      </VFLinkButton>
      <CreationProcess />
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');
.namecard-user-root {
  text-align: center;
}
.share-comment,
.creation-status {
  margin: 0 auto calc(var(--unit) * 2.5);
}
.sns-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--unit) * 2.5);
  margin-bottom: calc(var(--unit) * 2.5);
}
.sns-button {
  &:deep(svg, a) {
    display: block;
    width: 40px;
    height: auto;
  }
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
