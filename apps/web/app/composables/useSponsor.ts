import type { SponsorType, OptionSponsorType } from '@vuejs-jp/model'
import { match } from 'ts-pattern'

export function useSponsor() {
  function color(tag: SponsorType | OptionSponsorType) {
    return match(tag)
      .with('platinum', () => '#6E8F2E')
      .with('gold', () => '#E5AF00')
      .with('silver', () => '#1A8191')
      .with('bronze', () => '#CC4F39')
      .with(
        'option',
        'option-separate',
        'name-card',
        'special-naming-rights',
        'after-party',
        'simultaneous-interpretation',
        'special-lunch',
        'media',
        'tool',
        () => '#35495E',
      )
      .exhaustive()
  }

  return { color }
}
