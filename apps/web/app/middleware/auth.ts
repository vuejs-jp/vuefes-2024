import { defineNuxtRouteMiddleware, navigateTo, useNamecard } from '#imports'
// import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to) => {

  const { authUser } = await useNamecard()

  if (!authUser.value && to.path !== '/namecard') {
    return navigateTo('/namecard')
  }

  /* try {
    await until(user).toBeTruthy({ timeout: 700, throwOnTimeout: true })
  } catch (error) {
    return navigateTo('/namecard')
  } */
})
