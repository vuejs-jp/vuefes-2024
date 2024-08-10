import { defineNuxtRouteMiddleware, navigateTo, useNamecard, useAuthSession } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
const { authUser } = await useNamecard()
const { signedUserId } = useAuthSession()

  if (to.query.code) {
    if (authUser) return navigateTo(`/namecard/${authUser.value?.id}/`)
    if (signedUserId) return navigateTo(`/namecard/${signedUserId.value}/`)
  }
})
