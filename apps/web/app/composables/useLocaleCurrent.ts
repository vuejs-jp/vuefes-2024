import { useI18n } from '#imports'

export function useLocaleCurrent() {
  const { locale } = useI18n({ useScope: 'global' })
  const path = locale.value === 'ja' ? '/2024' : `/2024/${locale.value}`
  return { locale, path }
}
