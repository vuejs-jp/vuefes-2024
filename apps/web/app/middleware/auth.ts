// nuxt.config.ts でページ全体へ適応するのではなく、個別でpageコンポーネントに適応する想定
import { defineNuxtRouteMiddleware, navigateTo, useAuthSession } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const { hasAuth } = useAuthSession()

  if (!hasAuth?.value) {
    return navigateTo('/namecard/')
  }
})