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
      .with('speaker', () => `/${locale.value}/speaker`)
      .with('speaker_cfp', () => `/${locale.value}/speaker_cfp`)
      .with('speaker_information', () => `/${locale.value}/speaker_information`)
      .with('volunteer', () => `/${locale.value}/volunteer`)
      .with('privacy', () => `/${locale.value}/privacy`)
      .with('store', () => `/${locale.value}/store`)
      .with('welcome_vuejs_community', () => `/${locale.value}/welcome_vuejs_community`)
      .with('vuejs_handson', () => `/${locale.value}/vuejs_handson`)
      .with('nextgen_frontend_crosstalk', () => `/${locale.value}/nextgen_frontend_crosstalk`)
      .with('creative_wall', () => `/${locale.value}/creative_wall`)
      .with('refreshment_space', () => `/${locale.value}/refreshment_space`)
      .with('tattoo_booth', () => `/${locale.value}/tattoo_booth`)
      .with('cocktail_bash', () => `/${locale.value}/cocktail_bash`)
      .with('sponsor_booth_fotolary', () => `/${locale.value}/sponsor_booth_fotolary`)
      .with('store_preorder', () => `/${locale.value}/store_preorder`)
      .with('store_samedaysales', () => `/${locale.value}/store_samedaysales`)
      .with('sponsor', () => `/${locale.value}/sponsor`)
      .with('code-of-conduct', () => `/${locale.value}/code-of-conduct`)
      .with('team', () => `/${locale.value}/team`)
      .exhaustive(),
  )

  return { docPath }
}
