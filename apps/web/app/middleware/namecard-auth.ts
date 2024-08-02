import { defineNuxtRouteMiddleware, navigateTo, useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()

  if (to.query.code) {
    return navigateTo(`/namecard/${user.value?.id}/`)
  }
})