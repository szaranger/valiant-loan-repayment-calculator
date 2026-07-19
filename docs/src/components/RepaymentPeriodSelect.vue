<script setup>
defineOptions({
  name: 'RepaymentPeriodSelect',
})

const model = defineModel({ type: [Number, String], default: '' })

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: 'repayment-period',
  },
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="id"
      class="valiant-label"
    >
      Requested repayment period
    </label>
    <select
      :id="id"
      v-model="model"
      :disabled="disabled"
      class="valiant-field disabled:cursor-not-allowed disabled:bg-valiant-soft disabled:text-valiant-disabled"
      data-testid="repayment-period-select"
    >
      <option
        disabled
        value=""
      >
        Select a frequency
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
