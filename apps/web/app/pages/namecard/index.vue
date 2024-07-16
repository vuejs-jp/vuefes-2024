<script setup lang="ts">
import { ref } from 'vue'
import type { AuthProvider } from '@vuejs-jp/model'
import { useAuth } from '~/composables/useAuth'
import { useAuthSession } from '#imports'
import { createError, useRuntimeConfig, navigateTo } from '#imports'
import { useI18n } from '#i18n'
import MarkDownText from '~/components/MarkDownText.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'

const config = useRuntimeConfig()

if (!config.public.enableRegisterNamecard) {
  throw createError({ statusCode: 404, statusMessage: 'You cannot register the namecard.' })
}

const { t } = useI18n()
const showDialog = ref(false)
const { signIn, authUserId } = useAuth()
const { hasAuth } = useAuthSession()

function handleClickButton(type: 'open' | 'close') {
  if (type === 'open') {
    if (hasAuth?.value) return navigateTo(`/namecard/${authUserId}/`)
    showDialog.value = true
  } else {
    showDialog.value = false
  }
}

function handleSignIn(provider: Extract<AuthProvider, 'github' | 'google'>) {
  signIn(provider, `/namecard/${authUserId}/`)
}
</script>

<!-- TODO i18n対応, モバイル対応 -->
<template>
  <NuxtLayout name="namecard-base">
    <VFIntegrationDialog
      v-if="showDialog"
      title="ソーシャルアカウントからのログイン"
      @on-close="handleClickButton('close')"
      @sign-in="handleSignIn"
      ><p>
        ネームカードを作成するには、あらかじめチケットの購入が必要です。チケット購入後、以下のいずれかのソーシャルアカウントからログインし、必要な情報をご登録ください。
      </p></VFIntegrationDialog
    >
    <div class="namecard-root">
      <img
        class="namecard-samples"
        src="/namecard/namecard-samples.png"
        :alt="t('namecard.namecard-samples-alt')"
      />
      <div class="lead-sentence">
        <MarkDownText path="namecard_lead" />
      </div>
      <VFLinkButton
        is="button"
        background-color="vue-green/200"
        color="white"
        class="login-button"
        @click="handleClickButton('open')"
        >{{ t('namecard.login') }}</VFLinkButton
      >
      <CreationProcess />
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');

.namecard-samples {
  margin: 0 auto;
}
.lead-sentence {
  & :deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
    line-height: 1.8;
  }
}
.login-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 238px;
  height: 66px;
  margin: 0 auto calc(var(--unit) * 5);
}
</style>
