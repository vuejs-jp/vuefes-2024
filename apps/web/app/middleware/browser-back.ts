import { defineNuxtRouteMiddleware, reloadNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.name && !from.name) {
    // ブラウザバックが検知された時
    await reloadNuxtApp()
  }
})
