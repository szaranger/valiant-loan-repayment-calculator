import { describe, expect, it } from 'vitest'
import { formatCurrency, roundToCents } from '@/utils/currency'

describe('currency helpers', () => {
  it('formats AUD with en-AU locale', () => {
    expect(formatCurrency(1384.35)).toBe('$1,384.35')
    expect(formatCurrency(33224.4)).toBe('$33,224.40')
  })

  it('returns an empty string for non-finite values', () => {
    expect(formatCurrency(NaN)).toBe('')
    expect(formatCurrency(Infinity)).toBe('')
  })

  it('rounds to the nearest cent', () => {
    expect(roundToCents(1384.3477901254998)).toBe(1384.35)
    expect(roundToCents(10.994)).toBe(10.99)
  })
})
