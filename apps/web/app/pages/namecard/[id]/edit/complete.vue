<script setup lang="ts">
import { useI18n } from '#i18n'
import { definePageMeta, navigateTo } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { useNamecard } from '~/composables/useNamecard'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { locale: currentLocale } = useLocaleCurrent()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { authUser, statusKey, namecardUser } = await useNamecard()

async function handleLinkButton() {
  navigateTo(`${currentLocale.value === 'ja' ? '/' : `/${currentLocale.value}/`}namecard/${authUser.value?.id}/edit`)
}
</script>

<template>
  <NuxtLayout name="namecard-base">
    <div class="namecard-complete-root">
      <h2
        :style="{
          fontWeight: fontWeight('heading/700'),
          fontSize: fontSize('heading/300'),
          color: color('vue-green/100'),
        }"
        class="sub-title"
      >
        {{ t('namecard.form.registrationCompleted') }}
      </h2>
      <div class="complete-message">
        <p
          :style="{
            fontWeight: fontWeight('body/400'),
            fontSize: fontSize('body/400'),
            color: color('vue-blue'),
          }"
        >
          {{ t('namecard.complete_message') }}
        </p>
      </div>
      <!-- TODO Commentコンポーネントのモバイル対応が必要 -->
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
      <CreationStatus :status-key="statusKey" size="small" class="creation-status" />
      <VFNamecard24 :user="namecardUser" class="namecard-preview" />
      <VFLinkButton
        is="button"
        background-color="vue-green/200"
        color="white"
        class="edit-button"
        @click="handleLinkButton"
      >
        {{ t('namecard.edit') }}
      </VFLinkButton>
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');

.namecard-complete-root {
  text-align: center;
}
.sub-title {
  margin-bottom: calc(var(--unit) * 5);
}
.complete-message {
  text-align: left;
  line-height: 1.8;
  padding: calc(var(--unit) * 3) calc(var(--unit) * 4);
  margin-bottom: calc(var(--unit) * 5);
  background-color: #e7eff7;
}
.share-comment,
.creation-status {
  margin-bottom: calc(var(--unit) * 2.5);
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

.namecard-preview {
  margin: 0 auto;
}

.edit-button {
  --height-button: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 198px;
  height: var(--height-button);
  margin: calc(var(--unit) * 2.5) auto calc(var(--unit) * 7.5);
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
