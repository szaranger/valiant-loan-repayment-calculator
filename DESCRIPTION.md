# DESCRIPTION.md

## Scratch to-do breakdown

1. Confirmed starter template runs (`npm install`, backend, Vite). Backend moved to **port 5001** because macOS AirPlay Receiver (Control Center) already binds port 5000.
2. Explored mock API shapes: `/loan-purposes` (label, value, annualRate), `/requested-repayment-periods` (label, value = periods/year), `/requested-term-months` (label, value = months).
3. Built `useLoanOptions` to fetch all three lists with loading + error + retry.
4. Built `LoanAmountInput` — `type="text"`, digits-only on input, min $1,000 / max $20,000,000 validated live.
5. Built purpose / period / term select components wired to fetched options.
6. Built pure `calculateRepayments` wrapping `PMT.js` (TDD against the brief worked example), plus `useLoanCalculator` for reactive results.
7. Built `RepaymentSummary` with AUD formatting via `Intl.NumberFormat`, PMT sign flipped with `Math.abs`.
8. Assembled `LoanCalculator.vue` and mounted it from `App.vue`; results only show when all inputs are valid.
9. Styled with Tailwind — Valiant charcoal/yellow embeddable card, Manrope, loading/error/empty states.
10. Unit tests: calculation (worked example, frequencies, min/max, rounding), currency helpers, amount input digits + validation.
11. Cypress E2E: happy path, validation path, digits stripping, options fetch failure (via `cy.intercept`).
12. Lint + unit test clean pass before wrap-up.

## QA / manual testing

- Worked example: $30,000 · Day-to-day capital · Monthly · 2 years → **$1,384.35** / period, **$33,224.40** total.
- Boundary amounts: 999 (error), 1000 / 20000000 (valid), 20000001 (error).
- Non-numeric typing stripped (e.g. `30abc000` → `30000`).
- Weekly / fortnightly / monthly frequencies recalculate as expected.
- Backend stopped → error banner + disabled selects; retry after restart works.
- Responsive check at mobile width.

## Automated tests

- **Vitest** (`npm run test:unit`): `PMT.spec.js`, `calculateRepayments.spec.js`, `currency.spec.js`, `LoanAmountInput.spec.js`.
- **Cypress** (`npm run test:e2e`): happy path, invalid amount, digits-only, options error state.
