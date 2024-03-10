import { match } from 'ts-pattern'
import type { Color } from '@vuejs-jp/model'

export function useColor() {
  const color = (text: Color) =>
    match<Color>(text)
      .with('white', () => '#ffffff')
      .with('vue-blue', () => '#35495e')
      .with('vue-green', () => '#42b883')
      .with('sangosyo/200', () => '#CC4F39')
      .with('gray/200', () => '#C6CACF')
      .exhaustive()

  return { color }
}
