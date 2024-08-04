import { defineNuxtRouteMiddleware, navigateTo, useNamecard } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const { authUser } = await useNamecard()

  if (to.query.code && authUser.value) {
    return navigateTo(`/namecard/${authUser.value?.id}/`)
  }
})
