<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'
import CreationStatus from '~/components/namecard/CreationStatus.vue'
import { useNamecard } from '~/composables/useNamecard'

const { t } = useI18n()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const { authUserId, statusKey, attendee } = await useNamecard()
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
      <VFComment :title="t('namecard.lets_share')" class="share-comment" />
      <div class="sns-buttons">
        <VFIconButton
          name="x40"
          color="vue-blue"
          :href="`https://x.com/share?url=${encodeURIComponent(
            `https://vuefes.jp/2024/namecard/${authUserId}/share`,
          )}`"
          can-hover
          class="sns-button"
        />
        <VFIconButton
          name="Facebook"
          color="vue-blue"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `https://vuefes.jp/2024/namecard/${authUserId}/share`,
          )}`"
          class="sns-button"
        />
      </div>
      <CreationStatus :status-key="statusKey" size="small" class="creation-status" />
      <!-- TODO smallサイズ指定 -->
      <VFNamecard24 :user="attendee" class="namecard-preview" />
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
  gap: calc(var(--unit) * 2.5);
  padding-bottom: calc(var(--unit) * 2.5);
}

.namecard-preview {
  margin: 0 auto;
}
</style>
