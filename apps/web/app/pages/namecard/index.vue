<script setup lang="ts">
import { createError, useRuntimeConfig, navigateTo } from '#imports'
import { useI18n } from '#i18n'
import { ref } from 'vue'
import type { AuthProvider, DialogStatus } from '@vuejs-jp/model'
import { useAuthStore } from '~/store/auth'
import { useAuth } from '~/composables/useAuth'
import { useAuthSession } from '~/composables/useAuthSession'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import MarkDownText from '~/components/MarkDownText.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'

const config = useRuntimeConfig()

if (!config.public.enableRegisterNamecard) {
  throw createError({ statusCode: 404, statusMessage: 'You cannot register the namecard.' })
}

const { hasAuth } = useAuthSession()
const auth = useAuthStore()

const { signIn } = useAuth()

const { t } = useI18n()
const { locale } = useLocaleCurrent()
const showDialog = ref(false)

function handleClickButton(type: DialogStatus) {
  if (type === 'open') {
    showDialog.value = true
  } else {
    showDialog.value = false
  }
}

function handleSignIn(provider: Extract<AuthProvider, 'github' | 'google'>) {
  signIn(provider, '/namecard/********')
}
</script>

<template>
  <NuxtLayout name="namecard-base">
    <VFIntegrationDialog
      v-if="showDialog"
      :title="t('namecard.login_title')"
      @on-close="handleClickButton('close')"
      @sign-in="handleSignIn"
    >
      <p>
        {{ t('namecard.dialog_message') }}
      </p>
    </VFIntegrationDialog>
    <div class="namecard-root">
      <img
        class="namecard-samples"
        src="/namecard/namecard-samples.png"
        :alt="t('namecard.namecard_samples_alt')"
      />
      <div class="lead-sentence">
        <MarkDownText path="namecard_lead" />
      </div>
      <VFLinkButton
        is="button"
        background-color="vue-green/200"
        color="white"
        class="login-button"
        @click="
          () =>
            !hasAuth
              ? handleClickButton('open')
              : navigateTo(`${locale === 'ja' ? '/' : `/${locale}/`}namecard/${auth.signedUserId}`)
        "
      >
        {{ t('namecard.login') }}
      </VFLinkButton>
      <CreationProcess />
      <div class="edit-sentence">
        <VFStatusCard
          has-error
          :title="t('namecard.caution')"
          :content="t('namecard.edit_deadline')"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
@import url('~/assets/media.css');

.namecard-samples {
  margin: 0 auto;
  border-radius: 1px;
  aspect-ratio: 596 / 401;

  @media (--mobile) {
    width: 100%;
  }
}
.lead-sentence {
  & :deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;

    @media (--mobile) {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.edit-sentence {
  padding-top: calc(var(--unit) * 3);
}
.login-button {
  --width-login-button: 238px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--width-login-button);
  height: 66px;
  margin: 0 auto calc(var(--unit) * 5);
}
@media (--mobile) {
  .login-button {
    --width-login-button: 100%;
  }
  :deep(.text) {
    font-size: var(--font-size-body400);
  }
}
</style>
