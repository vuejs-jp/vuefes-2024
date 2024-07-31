import { computed } from 'vue'
import { useI18n } from '#imports'
import { match } from 'ts-pattern'
import type { Path } from '@vuejs-jp/model'

export function useLocale(path: Path) {
  const { locale } = useI18n({ useScope: 'global' })

  const docPath = computed(() =>
    match<Path>(path)
      .with('form', () => `/${locale.value}/docs/contact`)
      .with('message', () => `/${locale.value}/docs/message`)
      .with('speaker', () => `/${locale.value}/docs/speaker`)
      .with('speaker_cfp', () => `/${locale.value}/docs/speaker_cfp`)
      .with('speaker_information', () => `/${locale.value}/docs/speaker_information`)
      .with('volunteer', () => `/${locale.value}/docs/volunteer`)
      .with('privacy', () => `/${locale.value}/docs/privacy`)
      .with('store', () => `/${locale.value}/docs/store`)
      .with('welcome_vuejs_community', () => `/${locale.value}/docs/welcome_vuejs_community`)
      .with('vuejs_handson', () => `/${locale.value}/docs/vuejs_handson`)
      .with('nextgen_frontend_crosstalk', () => `/${locale.value}/docs/nextgen_frontend_crosstalk`)
      .with('creative_wall', () => `/${locale.value}/docs/creative_wall`)
      .with('free_drinks_and_snacks', () => `/${locale.value}/docs/free_drinks_and_snacks`)
      .with('tattoo_booth', () => `/${locale.value}/docs/tattoo_booth`)
      .with('cocktail_bash', () => `/${locale.value}/docs/cocktail_bash`)
      .with('sponsor_booth_fotolary', () => `/${locale.value}/docs/sponsor_booth_fotolary`)
      .with('store_preorder', () => `/${locale.value}/docs/store_preorder`)
      .with('store_samedaysales', () => `/${locale.value}/docs/store_samedaysales`)
      .with('sponsor', () => `/${locale.value}/docs/sponsor`)
      .with('childcare', () => `/${locale.value}/docs/childcare`)
      .with('personal_sponsor_1', () => `/${locale.value}/docs/personal_sponsor_1`)
      .with('personal_sponsor_2', () => `/${locale.value}/docs/personal_sponsor_2`)
      .with('handson', () => `/${locale.value}/docs/handson`)
      .with('faq', () => `/${locale.value}/docs/faq`)
      .with('code-of-conduct', () => `/${locale.value}/docs/code-of-conduct`)
      .with('tokusho', () => `/${locale.value}/docs/tokusho`)
      .with('team', () => `/${locale.value}/docs/team`)
      .with('ticket', () => `/${locale.value}/docs/ticket`)
      .with('namecard_lead', () => `/${locale.value}/docs/namecard_lead`)
      .with('namecard_process_1', () => `/${locale.value}/docs/namecard_process_1`)
      .with('namecard_process_2', () => `/${locale.value}/docs/namecard_process_2`)
      .with('namecard_process_3', () => `/${locale.value}/docs/namecard_process_3`)
      .with('namecard_process_4', () => `/${locale.value}/docs/namecard_process_4`)
      .with('namecard_process_alert', () => `/${locale.value}/docs/namecard_process_alert`)
      .with('namecard_annotation_order_number', () => `/${locale.value}/docs/namecard_annotation_order_number`)
      .exhaustive(),
  )

  return { docPath }
}
