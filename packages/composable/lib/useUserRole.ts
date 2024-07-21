import { Role } from '@vuejs-jp/model'
import { match } from 'ts-pattern'

export function useUserRole() {
  const backgroundColor = (role: Role) =>
    match(role)
      .with('staff', () => 'color-mix(in srgb, var(--color-vue-blue), #000 20%)')
      .with('speaker', () => 'var(--color-hiwamoegi200)')
      .with('sponsor', () => 'var(--color-tohoh200)')
      .with('attendee', () => 'var(--color-sangosyo200)')
      .with('attendee + party', () => 'var(--color-asagi200)')
      .exhaustive()

  const textColor = (role: Role) =>
    match(role)
      .with('sponsor', () => '#35495E')
      .with('staff', 'speaker', 'attendee', 'attendee + party', () => '#fff')
      .exhaustive()

  const getRole = (target: string): Role => {
    return target.indexOf('一般＋アフターパーティーチケット') !== -1
      ? 'attendee + party'
      : 'attendee'
  }

  return { backgroundColor, textColor, getRole }
}
