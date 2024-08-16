import { describe, it, expect } from 'vitest'
import { useRange } from '../lib/useRange'

describe('useRange', () => {
  it('should be format by time range', () => {
    const { range } = useRange()
    const result = range('2024-10-19 01:40:00+00', 40)

    expect(result).toBe('10:40〜11:20')
  })
})
