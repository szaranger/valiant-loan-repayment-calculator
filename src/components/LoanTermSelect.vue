<script setup>
defineOptions({
  name: 'LoanTermSelect',
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
    default: 'loan-term',
  },
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="id"
      class="valiant-label"
    >
      Requested loan term
    </label>
    <select
      :id="id"
      v-model="model"
      :disabled="disabled"
      class="valiant-field disabled:cursor-not-allowed disabled:bg-valiant-soft disabled:text-valiant-disabled"
      data-testid="loan-term-select"
    >
      <option
        disabled
        value=""
      >
        Select a term
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
