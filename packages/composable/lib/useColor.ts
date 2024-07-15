import { match } from 'ts-pattern'
import type { Color } from '@vuejs-jp/model'

export function useColor() {
  const color = (text: Color) =>
    match<Color>(text)
      .with('white', () => '#ffffff')
      .with('vue-blue', () => '#35495e')
      .with('vue-green', () => '#42b883')
      .with('vue-green/100', () => '#42B883')
      .with('vue-green/200', () => '#208558')
      .with('asagi/100', () => '#33A6B8')
      .with('asagi/200', () => '#1A8191')
      .with('tohoh/100', () => '#FFC408')
      .with('tohoh/200', () => '#E5AF00')
      .with('sangosyo/100', () => '#F17C67')
      .with('sangosyo/200', () => '#CC4F39')
      .with('hiwamoegi/100', () => '#90B44B')
      .with('hiwamoegi/200', () => '#6E8F2E')
      .with('gray/100', () => '#C6CACF')
      .with('svg-icon', () => 'currentColor')
      .exhaustive()

  return { color }
}
