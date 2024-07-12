import type { SponsorType, OptionSponsorType } from '@vuejs-jp/model'
import { match } from 'ts-pattern'

export function useSponsor() {
  function color(tag: SponsorType | OptionSponsorType) {
    return match(tag)
      .with('platinum', () => '#93AF5E')
      .with('gold', () => '#FFC408')
      .with('silver', () => '#ADBFD4')
      .with('bronze', () => '#F17C67')
      .with('option', 'option-separate', 'name-card', 'special-naming-rights', 'after-party', 'simultaneous-interpretation', 'special-lunch', 'media', 'tool', () => '#546F89')
      .exhaustive()
  }

  return { color }
}
