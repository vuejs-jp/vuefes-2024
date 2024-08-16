import type { SponsorType, OptionSponsorType } from '@vuejs-jp/model'
import { match } from 'ts-pattern'

export function useSponsor() {
  function color(tag: SponsorType | OptionSponsorType) {
    return match(tag)
      .with('platinum', () => 'hiwamoegi/200')
      .with('gold', () => 'tohoh/200')
      .with('silver', () => 'asagi/200')
      .with('bronze', () => 'sangosyo/200')
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
        () => 'vue-blue',
      )
      .with('personal', () => '')
      .exhaustive()
  }

  function borderColor(tag: string[]) {
    if (tag.includes('platinum')) return 'hiwamoegi/200'
    if (tag.includes('gold')) return 'tohoh/200'
    if (tag.includes('silver')) return 'asagi/200'
    if (tag.includes('bronze')) return 'sangosyo/200'
    return 'vue-blue'
  }

  function isMoreSilver(tags: Array<SponsorType | OptionSponsorType>) {
    return tags.some(
      (tag) => tag === 'platinum' || tag === 'gold' || tag === 'silver',
    )
  }

  return { color, borderColor, isMoreSilver }
}
