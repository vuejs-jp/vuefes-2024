<script setup>
const i18nHead = useLocaleHead({
  addSeoAttributes: true
})
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})
</script>

<template>
  <ClientOnly>
    <GlobalHeader />
    <main>
      <slot />
    </main>
  </ClientOnly>
</template>

<style scoped>
main {
  margin-top: 85px;
}
</style>
