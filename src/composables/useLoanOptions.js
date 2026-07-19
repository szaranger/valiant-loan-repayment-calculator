import { ref } from 'vue'

const API_BASE_URL = 'http://localhost:5001'

async function fetchJson (path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetches loan purpose, repayment period, and term options from the mock API.
 */
export function useLoanOptions () {
  const loanPurposes = ref([])
  const repaymentPeriods = ref([])
  const termMonths = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function loadOptions () {
    isLoading.value = true
    error.value = null

    try {
      const [purposes, periods, terms] = await Promise.all([
        fetchJson('/loan-purposes'),
        fetchJson('/requested-repayment-periods'),
        fetchJson('/requested-term-months'),
      ])

      loanPurposes.value = purposes
      repaymentPeriods.value = periods
      termMonths.value = terms
    } catch (err) {
      error.value = err instanceof Error
        ? err.message
        : 'Unable to load loan options. Is the backend running?'
      loanPurposes.value = []
      repaymentPeriods.value = []
      termMonths.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    loanPurposes,
    repaymentPeriods,
    termMonths,
    isLoading,
    error,
    loadOptions,
  }
}
