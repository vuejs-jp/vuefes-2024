import { describe, it, expect } from 'vitest'
import { useString } from '../lib/useString'

describe('useString', () => {
  it('should be count', () => {
    const { count } = useString()
    const result = count('あいうえおかきくけこ')

    expect(result).toBe(20)
  })

  it('should be count (mixed)', () => {
    const { count } = useString()
    const result = count('あいabcdef')

    expect(result).toBe(10)
  })

  it('should be count (exceed max-length)', () => {
    const { count } = useString()
    const result = count('あいうえおかきくけこさしすせそ')

    expect(result).toBe(30)
  })
})
