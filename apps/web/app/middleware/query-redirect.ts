import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useNamecard } from '~/composables/useNamecard'

export default defineNuxtRouteMiddleware(async (to) => {
  const { authUser } = await useNamecard()

  if (to.query.code) {
    if (authUser) return navigateTo(`/namecard/${authUser.value?.id}/`)
  }

  return true
})
