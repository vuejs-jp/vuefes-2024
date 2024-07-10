<script setup lang="ts">
import { ref } from 'vue'
import type { AuthProvider, RedirectPath } from '@vuejs-jp/model'
import { useAuth } from '~/composables/useAuth'
import { useAuthSession } from '~/composables/useAuthSession'

const showDialog = ref(false)
const { signIn } = useAuth()

function handleClickButton(type: 'open' | 'close') {
  // TODO セッション確認を行い、ログイン済みの場合はリダイレクト処理を実行しあと工程スキップ
  if (type === 'open') {
    showDialog.value = true
  } else {
    showDialog.value = false
  }
}

function handleSignIn(provider: Extract<AuthProvider, 'github' | 'google'>) {
  // TODO リダイレクト先は namecard/[id]/ とする（編集画面作成時に変更） ローカル開発用にフルパス指定（環境変数で振り分け）した方が便利
  signIn(provider, '/')
}
</script>

<!-- TODO i18n対応 -->
<template>
  <div class="name-card-root">
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
.name-card-root {
  --header-height: calc(var(--unit) * 10);
  padding-top: var(--header-height);
}
</style>
