<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import LoanAmountInput from '@/components/LoanAmountInput.vue'
import LoanPurposeSelect from '@/components/LoanPurposeSelect.vue'
import LoanTermSelect from '@/components/LoanTermSelect.vue'
import RepaymentPeriodSelect from '@/components/RepaymentPeriodSelect.vue'
import RepaymentSummary from '@/components/RepaymentSummary.vue'
import { useLoanCalculator } from '@/composables/useLoanCalculator'
import { useLoanOptions } from '@/composables/useLoanOptions'
import {
  LOAN_AMOUNT_MAX,
  LOAN_AMOUNT_MIN,
} from '@/utils/calculateRepayments'

defineOptions({
  name: 'LoanCalculator',
})

const {
  loanPurposes,
  repaymentPeriods,
  termMonths,
  isLoading,
  error,
  loadOptions,
} = useLoanOptions()

const loanAmountInput = ref('')
const selectedPurpose = ref('')
const selectedPeriod = ref('')
const selectedTerm = ref('')

const loanAmount = computed(() => {
  if (!loanAmountInput.value) {
    return null
  }

  const parsed = Number(loanAmountInput.value)
  return Number.isFinite(parsed) ? parsed : null
})

const selectedPurposeOption = computed(() => {
  return loanPurposes.value.find((option) => option.value === selectedPurpose.value) ?? null
})

const annualRate = computed(() => selectedPurposeOption.value?.annualRate ?? null)

const periodsPerYear = computed(() => {
  if (selectedPeriod.value === '' || selectedPeriod.value == null) {
    return null
  }

  return Number(selectedPeriod.value)
})

const termMonthsValue = computed(() => {
  if (selectedTerm.value === '' || selectedTerm.value == null) {
    return null
  }

  return Number(selectedTerm.value)
})

const selectedPeriodLabel = computed(() => {
  const match = repaymentPeriods.value.find(
    (option) => Number(option.value) === periodsPerYear.value
  )
  return match?.label ?? 'period'
})

const { result } = useLoanCalculator({
  loanAmount,
  annualRate,
  periodsPerYear,
  termMonths: termMonthsValue,
})

const selectsDisabled = computed(() => isLoading.value || Boolean(error.value))

onMounted(() => {
  loadOptions()
})

watch(error, (message) => {
  if (message) {
    selectedPurpose.value = ''
    selectedPeriod.value = ''
    selectedTerm.value = ''
  }
})
</script>

<template>
  <div
    class="w-full max-w-xl rounded-2xl bg-white p-6 shadow-valiant sm:p-8"
    data-testid="loan-calculator"
  >
    <header class="mb-6 border-b border-valiant-line pb-5">
      <div class="flex items-center gap-3">
        <img
          src="https://a.storyblok.com/f/157352/96x96/000de54d59/valiant-icon.png"
          alt="Valiant"
          class="size-10 rounded-md"
          width="40"
          height="40"
        >
        <div>
          <p class="text-xs font-extrabold uppercase tracking-[0.16em] text-valiant-charcoal">
            Valiant Finance
          </p>
          <h1 class="mt-0.5 text-xl font-extrabold tracking-tight text-valiant-charcoal sm:text-2xl">
            Loan repayment calculator
          </h1>
        </div>
      </div>
      <p class="mt-3 text-sm leading-relaxed text-valiant-body">
        Compare estimated repayments for business loans from
        ${{ LOAN_AMOUNT_MIN.toLocaleString('en-AU') }} to
        ${{ LOAN_AMOUNT_MAX.toLocaleString('en-AU') }} — amount, purpose, frequency, and term.
      </p>
    </header>

    <div
      v-if="isLoading"
      class="rounded-md border border-valiant-line bg-valiant-cream px-4 py-3 text-sm text-valiant-charcoal"
      data-testid="options-loading"
      role="status"
    >
      Loading loan options…
    </div>

    <div
      v-else-if="error"
      class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      data-testid="options-error"
      role="alert"
    >
      <p class="font-bold">
        Couldn’t load loan options
      </p>
      <p class="mt-1">
        Make sure the backend is running (`npm run backend`), then try again.
      </p>
      <button
        type="button"
        class="valiant-btn mt-3"
        data-testid="options-retry"
        @click="loadOptions"
      >
        Try again
      </button>
    </div>

    <form
      class="flex flex-col gap-4"
      @submit.prevent
    >
      <LoanAmountInput v-model="loanAmountInput" />

      <LoanPurposeSelect
        v-model="selectedPurpose"
        :options="loanPurposes"
        :disabled="selectsDisabled"
      />

      <RepaymentPeriodSelect
        v-model="selectedPeriod"
        :options="repaymentPeriods"
        :disabled="selectsDisabled"
      />

      <LoanTermSelect
        v-model="selectedTerm"
        :options="termMonths"
        :disabled="selectsDisabled"
      />
    </form>

    <div class="mt-6">
      <RepaymentSummary
        v-if="result"
        :repayment-per-period="result.repaymentPerPeriod"
        :total-repayments="result.totalRepayments"
        :period-label="selectedPeriodLabel"
      />
      <p
        v-else
        class="rounded-md border border-dashed border-valiant-border bg-valiant-cream px-4 py-5 text-center text-sm text-valiant-subtle"
        data-testid="results-placeholder"
      >
        Enter a valid loan amount and select all options to see your estimated repayments.
      </p>
    </div>
  </div>
</template>
