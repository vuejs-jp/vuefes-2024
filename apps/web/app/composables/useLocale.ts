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
      .with('free_drinks_and_snacks', () => `/${locale.value}/free_drinks_and_snacks`)
      .with('tattoo_booth', () => `/${locale.value}/tattoo_booth`)
      .with('cocktail_bash', () => `/${locale.value}/cocktail_bash`)
      .with('sponsor_booth_fotolary', () => `/${locale.value}/sponsor_booth_fotolary`)
      .with('store_preorder', () => `/${locale.value}/store_preorder`)
      .with('store_samedaysales', () => `/${locale.value}/store_samedaysales`)
      .with('sponsor', () => `/${locale.value}/sponsor`)
      .with('childcare', () => `/${locale.value}/childcare`)
      .with('personal_sponsor_1', () => `/${locale.value}/personal_sponsor_1`)
      .with('personal_sponsor_2', () => `/${locale.value}/personal_sponsor_2`)
      .with('handson', () => `/${locale.value}/handson`)
      .with('faq', () => `/${locale.value}/faq`)
      .with('code-of-conduct', () => `/${locale.value}/code-of-conduct`)
      .with('tokusho', () => `/${locale.value}/tokusho`)
      .with('team', () => `/${locale.value}/team`)
      .with('ticket', () => `/${locale.value}/ticket`)
      .with('namecard_lead', () => `/${locale.value}/namecard_lead`)
      .with('namecard_process_1', () => `/${locale.value}/namecard_process_1`)
      .with('namecard_process_2', () => `/${locale.value}/namecard_process_2`)
      .with('namecard_process_3', () => `/${locale.value}/namecard_process_3`)
      .with('namecard_process_4', () => `/${locale.value}/namecard_process_4`)
      .with('namecard_process_alert', () => `/${locale.value}/namecard_process_alert`)
      .with('namecard_annotation_order_number', () => `/${locale.value}/namecard_annotation_order_number`)
      .exhaustive(),
  )

  return { docPath }
}
