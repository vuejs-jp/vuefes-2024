import { Role } from '@vuejs-jp/model'
import { match } from 'ts-pattern'

export function useUserRole() {
  const backgroundColor = (role: Role) =>
    match(role)
      .with('staff', () => '#233445')
      .with('speaker', () => '#90B44B')
      .with('sponsor', () => '#FFC408')
      .with('attendee', () => '#F17C67')
      .with('attendee + party', () => '#33A6B8')
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
