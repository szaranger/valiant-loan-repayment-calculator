<script setup>
import { computed } from 'vue'
import { LOAN_AMOUNT_MAX, LOAN_AMOUNT_MIN } from '@/utils/calculateRepayments'

defineOptions({
  name: 'LoanAmountInput',
})

const model = defineModel({ type: String, default: '' })

defineProps({
  id: {
    type: String,
    default: 'loan-amount',
  },
})

const numericValue = computed(() => {
  if (!model.value) {
    return null
  }

  const parsed = Number(model.value)
  return Number.isFinite(parsed) ? parsed : null
})

const errorMessage = computed(() => {
  if (model.value === '') {
    return ''
  }

  if (numericValue.value === null) {
    return 'Enter a valid loan amount'
  }

  if (numericValue.value < LOAN_AMOUNT_MIN) {
    return `Minimum loan amount is $${LOAN_AMOUNT_MIN.toLocaleString('en-AU')}`
  }

  if (numericValue.value > LOAN_AMOUNT_MAX) {
    return `Maximum loan amount is $${LOAN_AMOUNT_MAX.toLocaleString('en-AU')}`
  }

  return ''
})

const isValid = computed(() => {
  return (
    numericValue.value !== null &&
    numericValue.value >= LOAN_AMOUNT_MIN &&
    numericValue.value <= LOAN_AMOUNT_MAX
  )
})

function onInput (event) {
  const digitsOnly = event.target.value.replace(/\D/g, '')
  model.value = digitsOnly
  event.target.value = digitsOnly
}

defineExpose({
  isValid,
  errorMessage,
  numericValue,
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="id"
      class="valiant-label"
    >
      Requested loan amount
    </label>
    <div class="relative">
      <span
        class="pointer-events-none absolute inset-y-0 left-3 flex items-center font-bold text-valiant-charcoal"
        aria-hidden="true"
      >
        $
      </span>
      <input
        :id="id"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder="e.g. 30000"
        :value="model"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        :aria-describedby="errorMessage ? `${id}-error` : undefined"
        class="valiant-field pl-7"
        :class="{ 'valiant-field-error': errorMessage }"
        data-testid="loan-amount-input"
        @input="onInput"
      >
    </div>
    <p
      v-if="errorMessage"
      :id="`${id}-error`"
      class="text-sm font-medium text-red-600"
      data-testid="loan-amount-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
