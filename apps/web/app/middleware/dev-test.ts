import { defineNuxtRouteMiddleware, showError } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.env.NODE_ENV !== 'development') {
    throw showError({
      statusCode: 404,
      fatal: true,
      message: 'This is a page for only the development',
    })
  }
})
