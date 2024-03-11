import { match } from 'ts-pattern'
import type { Typography } from '@vuejs-jp/model'

export function useTypography() {
  const component = (variant: Typography) =>
    match<Typography>(variant)
      .with('heading/400', () => 'h2')
      .with('heading/300', () => 'h3')
      .with('heading/200', () => 'h4')
      .with('heading/100', () => 'h5')
      .with('heading/50', () => 'h6')
      .with('subtitle', () => 'h5')
      .with('body/400', 'body/300', 'body/200', 'body/100', () => 'p')
      .with('link/200', 'link/100', 'other/200', () => 'span')
      .exhaustive()

  const fontWeight = (variant: Typography) =>
    match<Typography>(variant)
      .with('heading/400', () => '800')
      .with('heading/300', 'heading/200', 'heading/100', 'heading/50', () => '700')
      .with('subtitle', () => '600')
      .with('body/400', 'body/300', 'link/200', 'link/100', 'other/200', () => '500')
      .with('body/200', 'body/100', () => '400')
      .exhaustive()

  const fontSize = (variant: Typography) =>
    match<Typography>(variant)
      .with('heading/400', () => '5.625rem')
      .with('heading/300', () => '2.813rem')
      .with('heading/200', () => '1.5rem')
      .with('heading/100', 'subtitle', () => '1.25rem')
      .with('body/400', 'link/200', () => '1.125rem')
      .with('heading/50', 'body/300', 'other/200', () => '1rem')
      .with('body/200', 'link/100', () => '0.875rem')
      .with('body/100', () => '0.75rem')
      .exhaustive()

  return { component, fontWeight, fontSize }
}
