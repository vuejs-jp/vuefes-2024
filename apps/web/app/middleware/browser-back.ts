import { defineNuxtRouteMiddleware, refreshNuxtData } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.name === null && from.name !== null) {
    // ブラウザバックが検知された時
    await refreshNuxtData()
  }
})
