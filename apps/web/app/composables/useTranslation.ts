import { useI18n } from '#i18n'
import { useLocaleCurrent } from '@/composables/useLocaleCurrent'

export function useTranslation() {
  const { t, te } = useI18n()
  const { locale } = useLocaleCurrent()
  function translate(key: string) {
    return te(key, locale.value) ? t(key) : ''
  }

  return {
    /**
     * return translation or empty string
     * https://github.com/vuejs-jp/vuefes-2024/pull/136#discussion_r1597312717
     */
    translate
  }
}