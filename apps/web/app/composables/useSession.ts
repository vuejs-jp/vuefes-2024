import type { Track } from '@vuejs-jp/model'
import { match } from 'ts-pattern'

export function useSession() {
  function color(track?: Track) {
    if (!track) return ''

    return match(track)
      .with('medpeer', () => 'hiwamoegi/200')
      .with('mntsq', () => 'tohoh/200')
      .with('kickflow', () => 'asagi/200')
      .with('vue', () => 'sangosyo/200')
      .exhaustive()
  }

  function trackName(track?: Track) {
    if (!track) return ''

    return match(track)
      .with('medpeer', () => 'メドピアトラック')
      .with('mntsq', () => 'MNTSQ全ての合意をフェアにするぞトラック')
      .with('kickflow', () => 'kickflowトラック')
      .with('vue', () => 'vueトラック')
      .exhaustive()
  }

  return { color, trackName }
}
