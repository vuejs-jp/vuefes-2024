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
        'naming-rights',
        'after-party',
        'simultaneous-interpretation',
        'childcare',
        'special-lunch',
        'lunch',
        'media',
        'tool',
        () => '#35495E',
      )
      .with('personal', () => '')
      .exhaustive()
  }

  function borderColor(tag: string[]) {
    if (tag.includes('platinum')) return '#6E8F2E'
    if (tag.includes('gold')) return '#E5AF00'
    if (tag.includes('silver')) return '#1A8191'
    if (tag.includes('bronze')) return '#CC4F39'
    return '#35495E'
  }

  function isMoreSilver(tags: Array<SponsorType | OptionSponsorType>) {
    return tags.some(
      (tag) => tag === 'platinum' || tag === 'gold' || tag === 'silver',
    )
  }

  return { color, borderColor, isMoreSilver }
}
