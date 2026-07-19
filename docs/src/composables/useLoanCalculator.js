import { computed, unref } from 'vue'
import {
  calculateRepayments,
  LOAN_AMOUNT_MAX,
  LOAN_AMOUNT_MIN,
} from '@/utils/calculateRepayments'

/**
 * Reactive wrapper around calculateRepayments.
 *
 * @param {object} sources
 * @param {import('vue').Ref<number|null>|number|null} sources.loanAmount
 * @param {import('vue').Ref<number|null>|number|null} sources.annualRate
 * @param {import('vue').Ref<number|null>|number|null} sources.periodsPerYear
 * @param {import('vue').Ref<number|null>|number|null} sources.termMonths
 */
export function useLoanCalculator ({
  loanAmount,
  annualRate,
  periodsPerYear,
  termMonths,
}) {
  const isAmountValid = computed(() => {
    const amount = unref(loanAmount)
    return (
      Number.isFinite(amount) &&
      amount >= LOAN_AMOUNT_MIN &&
      amount <= LOAN_AMOUNT_MAX
    )
  })

  const result = computed(() => {
    const amount = unref(loanAmount)
    const rate = unref(annualRate)
    const periods = unref(periodsPerYear)
    const term = unref(termMonths)

    if (
      !isAmountValid.value ||
      rate == null ||
      periods == null ||
      term == null
    ) {
      return null
    }

    return calculateRepayments({
      loanAmount: amount,
      annualRate: rate,
      periodsPerYear: periods,
      termMonths: term,
    })
  })

  return {
    isAmountValid,
    result,
  }
}
