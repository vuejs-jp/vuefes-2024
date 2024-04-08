import { computed } from 'vue'
import { useI18n } from '#imports'
import { match } from 'ts-pattern'
import type { Path } from '@vuejs-jp/model'

export function useLocale(path: Path) {
  const { locale } = useI18n({ useScope: 'global' })

  const docPath = computed(() =>
    match<Path>(path)
      .with('form', () => `/${locale.value}/contact`)
      .with('message', () => `/${locale.value}/message`)
      .with('privacy', () => `/${locale.value}/privacy`)
      .with('sponsor', () => `/${locale.value}/sponsor`)
      .with('code-of-conduct', () => `/${locale.value}/code-of-conduct`)
      .exhaustive(),
  )

  return { docPath }
}
