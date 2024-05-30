<script setup>
import { useSupabase } from '~/composables/useSupabase'

const { loginUser, login, fetchSample } = useSupabase()
const i18nHead = useLocaleHead({
  addSeoAttributes: true,
})
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
})
const emit = defineEmits(['login'])
const startLogin = () => {
  login()
}
const debug = async () => {

  const data = await fetchSample()
  console.log('fetchSample', data)
}
</script>

<template>
  <GlobalHeader :login-user="loginUser" @login="startLogin" @debug="debug" />
  <main>
    <slot />
  </main>
  <FooterPageSection />
</template>
