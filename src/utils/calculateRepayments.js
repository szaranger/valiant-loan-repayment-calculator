import PMT from '@/utils/PMT'
import { roundToCents } from '@/utils/currency'

/**
 * Calculate loan repayments using the Excel-compatible PMT formula.
 *
 * @param {object} params
 * @param {number} params.loanAmount - Principal in dollars
 * @param {number} params.annualRate - Annual interest rate as a decimal (e.g. 0.1 for 10%)
 * @param {number} params.periodsPerYear - Repayment frequency (12, 26, or 52)
 * @param {number} params.termMonths - Loan term in months
 * @returns {{ repaymentPerPeriod: number, totalRepayments: number, numberOfPeriods: number } | null}
 */
export function calculateRepayments ({
  loanAmount,
  annualRate,
  periodsPerYear,
  termMonths,
}) {
  if (
    !Number.isFinite(loanAmount) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(periodsPerYear) ||
    !Number.isFinite(termMonths) ||
    loanAmount <= 0 ||
    periodsPerYear <= 0 ||
    termMonths <= 0
  ) {
    return null
  }

  const ratePerPeriod = annualRate / periodsPerYear
  const numberOfPeriods = termMonths * (periodsPerYear / 12)
  const rawPayment = PMT(ratePerPeriod, numberOfPeriods, loanAmount)
  const repaymentPerPeriod = roundToCents(Math.abs(rawPayment))
  const totalRepayments = roundToCents(repaymentPerPeriod * numberOfPeriods)

  return {
    repaymentPerPeriod,
    totalRepayments,
    numberOfPeriods,
  }
}

export const LOAN_AMOUNT_MIN = 1000
export const LOAN_AMOUNT_MAX = 20000000
