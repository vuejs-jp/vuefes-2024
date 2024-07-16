<script setup lang="ts">
import { ref } from 'vue'
import type { AuthProvider } from '@vuejs-jp/model'
import { useAuth } from '~/composables/useAuth'
import { useAuthSession } from '#imports'
import { createError, useRuntimeConfig, navigateTo } from '#imports'

const config = useRuntimeConfig()

if (!config.public.enableRegisterNamecard) {
  throw createError({ statusCode: 404, statusMessage: 'You cannot register the namecard.' })
}

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

<!-- TODO i18n対応 -->
<template>
  <div class="namecard-root">
    <VFIntegrationDialog
      v-if="showDialog"
      title="ソーシャルアカウントからのログイン"
      @on-close="handleClickButton('close')"
      @sign-in="handleSignIn"
      ><p>
        ネームカードを作成するには、あらかじめチケットの購入が必要です。チケット購入後、以下のいずれかのソーシャルアカウントからログインし、必要な情報をご登録ください。
      </p></VFIntegrationDialog
    >
    <button @click="handleClickButton('open')">ログインする</button>
  </div>
</template>

<style scoped>
.namecard-root {
  --header-height: calc(var(--unit) * 10);
  padding-top: var(--header-height);
}
</style>
