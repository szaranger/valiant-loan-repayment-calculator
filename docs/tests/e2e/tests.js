describe('Loan repayment calculator', () => {
  const purposes = [
    { label: 'Day-to-day capital', value: 'general', annualRate: 0.1 },
    { label: 'Vehicle or transport', value: 'vehicle', annualRate: 0.045 },
    { label: 'Financing a property', value: 'property', annualRate: 0.029 },
  ]

  const periods = [
    { label: 'Weekly', value: 52 },
    { label: 'Fortnightly', value: 26 },
    { label: 'Monthly', value: 12 },
  ]

  const terms = [
    { label: '6 months', value: 6 },
    { label: '12 months', value: 12 },
    { label: '2 years', value: 24 },
    { label: '3 years', value: 36 },
    { label: '5 years', value: 60 },
    { label: '10 years', value: 120 },
    { label: '20 years', value: 240 },
  ]

  beforeEach(() => {
    cy.intercept('GET', '**/loan-purposes', purposes).as('loanPurposes')
    cy.intercept('GET', '**/requested-repayment-periods', periods).as('repaymentPeriods')
    cy.intercept('GET', '**/requested-term-months', terms).as('termMonths')
  })

  it('calculates repayments for the worked example', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(['@loanPurposes', '@repaymentPeriods', '@termMonths'])

    cy.get('[data-testid="loan-amount-input"]').type('30000')
    cy.get('[data-testid="loan-purpose-select"]').select('general')
    cy.get('[data-testid="repayment-period-select"]').select('12')
    cy.get('[data-testid="loan-term-select"]').select('24')

    cy.get('[data-testid="repayment-summary"]').should('be.visible')
    cy.get('[data-testid="repayment-per-period"]').should('contain', '$1,384.35')
    cy.get('[data-testid="total-repayments"]').should('contain', '$33,224.40')
  })

  it('shows validation error and hides results for an out-of-range amount', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(['@loanPurposes', '@repaymentPeriods', '@termMonths'])

    cy.get('[data-testid="loan-amount-input"]').type('500')
    cy.get('[data-testid="loan-purpose-select"]').select('general')
    cy.get('[data-testid="repayment-period-select"]').select('12')
    cy.get('[data-testid="loan-term-select"]').select('24')

    cy.get('[data-testid="loan-amount-error"]').should('be.visible')
    cy.get('[data-testid="repayment-summary"]').should('not.exist')
    cy.get('[data-testid="results-placeholder"]').should('be.visible')
  })

  it('strips non-digit characters from the loan amount input', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(['@loanPurposes', '@repaymentPeriods', '@termMonths'])

    cy.get('[data-testid="loan-amount-input"]').type('30abc000')
    cy.get('[data-testid="loan-amount-input"]').should('have.value', '30000')
  })

  it('shows an error state when option endpoints fail', () => {
    cy.intercept('GET', '**/loan-purposes', { statusCode: 500 }).as('loanPurposesFail')
    cy.intercept('GET', '**/requested-repayment-periods', { statusCode: 500 }).as('repaymentPeriodsFail')
    cy.intercept('GET', '**/requested-term-months', { statusCode: 500 }).as('termMonthsFail')

    cy.visit('http://localhost:5173/')
    cy.wait(['@loanPurposesFail', '@repaymentPeriodsFail', '@termMonthsFail'])

    cy.get('[data-testid="options-error"]').should('be.visible')
    cy.get('[data-testid="loan-purpose-select"]').should('be.disabled')
  })
})
