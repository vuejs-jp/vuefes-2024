import { useRuntimeConfig } from '#app'
import { useLocaleCurrent } from '#imports'

export function usePathWithLocale() {
  const baseUrl = useRuntimeConfig().app.baseURL
  const currentLocale = useLocaleCurrent().locale

  function pathWithLocale(path: string) {
    const localePath = `${currentLocale.value === 'ja' ? path : `/${currentLocale.value}/${path}`}`
    return (baseUrl + localePath).replace(/\/\//g, '/')
  }

  return pathWithLocale
}