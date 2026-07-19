const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

/**
 * Format a number as Australian dollars.
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency (value) {
  if (!Number.isFinite(value)) {
    return ''
  }

  return currencyFormatter.format(value)
}

/**
 * Round a monetary value to the nearest cent.
 * @param {number} value
 * @returns {number}
 */
export function roundToCents (value) {
  return Math.round(value * 100) / 100
}
