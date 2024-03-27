import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.env.NODE_ENV !== 'development') {
    await navigateTo({ path: '/' })
  }
})
