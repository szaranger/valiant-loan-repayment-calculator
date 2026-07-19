import { describe, expect, it } from 'vitest'
import {
  calculateRepayments,
  LOAN_AMOUNT_MAX,
  LOAN_AMOUNT_MIN,
} from '@/utils/calculateRepayments'

describe('calculateRepayments', () => {
  it('reproduces the brief worked example ($30,000, 10%, 2 years, monthly)', () => {
    const result = calculateRepayments({
      loanAmount: 30000,
      annualRate: 0.1,
      periodsPerYear: 12,
      termMonths: 24,
    })

    expect(result).not.toBeNull()
    expect(result.numberOfPeriods).toBe(24)
    expect(result.repaymentPerPeriod).toBe(1384.35)
    expect(result.totalRepayments).toBe(33224.4)
  })

  it('handles weekly repayments', () => {
    const result = calculateRepayments({
      loanAmount: 30000,
      annualRate: 0.1,
      periodsPerYear: 52,
      termMonths: 24,
    })

    expect(result.numberOfPeriods).toBe(104)
    expect(result.repaymentPerPeriod).toBeGreaterThan(0)
    expect(result.totalRepayments).toBe(
      Math.round(result.repaymentPerPeriod * 104 * 100) / 100
    )
  })

  it('handles fortnightly repayments', () => {
    const result = calculateRepayments({
      loanAmount: 30000,
      annualRate: 0.1,
      periodsPerYear: 26,
      termMonths: 24,
    })

    expect(result.numberOfPeriods).toBe(52)
    expect(result.repaymentPerPeriod).toBeGreaterThan(0)
  })

  it('uses the purpose annual rate (vehicle 4.5%)', () => {
    const result = calculateRepayments({
      loanAmount: 30000,
      annualRate: 0.045,
      periodsPerYear: 12,
      termMonths: 24,
    })

    expect(result.repaymentPerPeriod).toBe(1309.43)
  })

  it('works at the minimum loan amount', () => {
    const result = calculateRepayments({
      loanAmount: LOAN_AMOUNT_MIN,
      annualRate: 0.1,
      periodsPerYear: 12,
      termMonths: 12,
    })

    expect(result).not.toBeNull()
    expect(result.repaymentPerPeriod).toBeGreaterThan(0)
  })

  it('works at the maximum loan amount', () => {
    const result = calculateRepayments({
      loanAmount: LOAN_AMOUNT_MAX,
      annualRate: 0.029,
      periodsPerYear: 12,
      termMonths: 240,
    })

    expect(result).not.toBeNull()
    expect(result.repaymentPerPeriod).toBeGreaterThan(0)
  })

  it('rounds repayment amounts to cents', () => {
    const result = calculateRepayments({
      loanAmount: 30000,
      annualRate: 0.1,
      periodsPerYear: 12,
      termMonths: 24,
    })

    expect(Number.isInteger(result.repaymentPerPeriod * 100)).toBe(true)
    expect(Number.isInteger(result.totalRepayments * 100)).toBe(true)
  })

  it('returns null for invalid inputs', () => {
    expect(calculateRepayments({
      loanAmount: 0,
      annualRate: 0.1,
      periodsPerYear: 12,
      termMonths: 24,
    })).toBeNull()

    expect(calculateRepayments({
      loanAmount: 30000,
      annualRate: 0.1,
      periodsPerYear: 0,
      termMonths: 24,
    })).toBeNull()
  })
})
