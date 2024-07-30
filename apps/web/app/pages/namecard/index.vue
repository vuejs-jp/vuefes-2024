<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AuthProvider } from '@vuejs-jp/model'
import { useAuth } from '~/composables/useAuth'
import { useAuthSession } from '#imports'
import { createError, useRuntimeConfig, navigateTo, useAsyncData, useRoute } from '#imports'
import { useI18n } from '#i18n'
import MarkDownText from '~/components/MarkDownText.vue'
import CreationProcess from '~/components/namecard/CreationProcess.vue'
import { useDebounceFn } from '@vueuse/core'

const config = useRuntimeConfig()
const route = useRoute()
/* リファクタリング検討
 * 力技でログイン処理後のリダイレクトを行なっている
 *
 * supabase.auth.signInWithOAuth を利用した認証処理を行った後、リダイレクト先のURLにクエリパラメータ code が付与される
 * この code と supabase.auth.getUser() で取得したユーザーIDは別物
 * そのため、code が変更された際に getUser() を実行し、少し待ってからユーザーIDを取得している
 * 取得したユーザーIDを元にリダイレクトを行なっている
 */
watch(
  () => route.query.code,
  () => {
    if (route.query.code) {
      const debouncedFn = useDebounceFn(async () => {
        const { data: authUserId } = await useAsyncData('authUserId', async () => {
          return (await getUser()).id
        })
        return authUserId.value
      }, 1000)
      debouncedFn().then((id) => {
        navigateTo(`/namecard/${id}/`)
      })
    }
  },
  { immediate: true },
)

if (!config.public.enableRegisterNamecard) {
  throw createError({ statusCode: 404, statusMessage: 'You cannot register the namecard.' })
}

const { t } = useI18n()
const showDialog = ref(false)
const { signIn, getUser } = useAuth()
const { hasAuth } = useAuthSession()

const { data: authUserId } = await useAsyncData('authUserId', async () => {
  return (await getUser()).id
})

function handleClickButton(type: 'open' | 'close') {
  if (type === 'open') {
    if (hasAuth?.value && authUserId.value) return navigateTo(`/namecard/${authUserId.value}/`)
    showDialog.value = true
  } else {
    showDialog.value = false
  }
}

function handleSignIn(provider: Extract<AuthProvider, 'github' | 'google'>) {
  signIn(provider, '/namecard/')
}
</script>

<!-- TODO モバイル対応 -->
<template>
  <NuxtLayout name="namecard-base">
    <VFIntegrationDialog
      v-if="showDialog"
      :title="t('namecard.login_title')"
      @on-close="handleClickButton('close')"
      @sign-in="handleSignIn"
      ><p>
        {{ t('namecard.dialog_message') }}
      </p></VFIntegrationDialog
    >
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
        @click="handleClickButton('open')"
        >{{ t('namecard.login') }}</VFLinkButton
      >
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
