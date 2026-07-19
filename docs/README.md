# Interview / architecture snapshot

Standalone reference copy of the loan calculator’s key files, plus the architecture guide.

## View the guide

```bash
open loan-calculator-architecture.html
```

Or double-click `loan-calculator-architecture.html`.

## What’s included

```
docs/
  loan-calculator-architecture.html   # interactive architecture guide
  backend/index.js                    # mock API
  src/
    App.vue
    components/                       # calculator UI
    composables/                      # options fetch + reactive calc
    utils/                            # PMT, calculateRepayments, currency
  tests/
    unit/                             # Vitest specs
    e2e/tests.js                      # Cypress specs
```

## Note

This folder is for reading and interview prep. It is **not** a runnable Vue app on its own — use the project root (`npm run backend` + `npm run dev`) to run the calculator.
