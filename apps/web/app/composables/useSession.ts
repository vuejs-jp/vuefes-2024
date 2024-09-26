import { computed } from 'vue'
import { useI18n } from '#i18n'
import { match } from 'ts-pattern'

import type { Track } from '@vuejs-jp/model'

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
      .with('mntsq', () => 'MNTSQが全ての合意をフェアにするぞトラック')
      .with('kickflow', () => 'kickflowトラック')
      .with('vue', () => 'Vueトラック')
      .exhaustive()
  }
  
  const { locale } = useI18n({ useScope: 'global' })
  const getSessionPath = computed(
    () => (id: string) => (locale.value === 'ja' ? `/sessions/${id}` : `/en/sessions/${id}`),
  )

  return { color, trackName, getSessionPath }
}
