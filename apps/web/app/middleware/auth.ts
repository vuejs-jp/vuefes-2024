import { defineNuxtRouteMiddleware, navigateTo, useNamecard } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const { authUser } = await useNamecard()

  if (!authUser.value) return navigateTo('/namecard')

  return true
})
