<script setup>
import { formatCurrency } from '@/utils/currency'

defineOptions({
  name: 'RepaymentSummary',
})

defineProps({
  repaymentPerPeriod: {
    type: Number,
    required: true,
  },
  totalRepayments: {
    type: Number,
    required: true,
  },
  periodLabel: {
    type: String,
    default: 'period',
  },
})
</script>

<template>
  <section
    class="rounded-xl bg-valiant-charcoal px-5 py-6 text-white"
    data-testid="repayment-summary"
    aria-live="polite"
  >
    <h2 class="text-xs font-extrabold uppercase tracking-[0.14em] text-valiant-yellow">
      Estimated repayments
    </h2>

    <dl class="mt-4 grid gap-5 sm:grid-cols-2">
      <div>
        <dt class="text-sm text-white/70">
          {{ periodLabel }} repayment
        </dt>
        <dd
          class="mt-1 text-2xl font-extrabold tracking-tight text-valiant-yellow"
          data-testid="repayment-per-period"
        >
          {{ formatCurrency(repaymentPerPeriod) }}
        </dd>
      </div>
      <div>
        <dt class="text-sm text-white/70">
          Total repayments
        </dt>
        <dd
          class="mt-1 text-2xl font-extrabold tracking-tight"
          data-testid="total-repayments"
        >
          {{ formatCurrency(totalRepayments) }}
        </dd>
      </div>
    </dl>
  </section>
</template>
