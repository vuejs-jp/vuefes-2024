<script setup>
import { useLocaleHead, useHead } from '#imports'
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
</script>

<template>
  <GlobalHeader />
  <main>
    <slot />
  </main>
  <FooterPageSection />
</template>
