import { useI18n } from '#imports'

export function useLocaleCurrent() {
  const { locale } = useI18n({ useScope: 'global' })
  const path = locale.value === 'ja' ? '' : `/${locale.value}`
  return { locale, path }
}
