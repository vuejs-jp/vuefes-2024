import { computed } from 'vue'
import { match } from 'ts-pattern'
import type { Path } from '@vuejs-jp/model'

export function useLocale(path: Path) {
  // @ts-expect-error
  const { locale } = useI18n({ useScope: 'global' })

  const docPath = computed(() =>
    match<Path>(path)
      .with('form', () => `/${locale.value}/contact`)
      .with('privacy', () => `/${locale.value}/privacy`)
      .with('sponsor', () => `/${locale.value}/sponsor`)
      .with('code-of-conduct', () => `/${locale.value}/code-of-conduct`)
      .exhaustive(),
  )

  return { docPath }
}
