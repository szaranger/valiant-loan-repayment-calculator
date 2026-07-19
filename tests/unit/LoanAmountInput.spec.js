import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LoanAmountInput from '@/components/LoanAmountInput.vue'

describe('LoanAmountInput', () => {
  it('strips non-digit characters as the user types', async () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })

    const input = wrapper.get('[data-testid="loan-amount-input"]')
    await input.setValue('12a3b4')

    expect(wrapper.props('modelValue')).toBe('1234')
    expect(input.element.value).toBe('1234')
  })

  it('shows an error below the minimum amount', async () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })

    await wrapper.get('[data-testid="loan-amount-input"]').setValue('999')

    expect(wrapper.get('[data-testid="loan-amount-error"]').text()).toContain('Minimum')
  })

  it('shows an error above the maximum amount', async () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })

    await wrapper.get('[data-testid="loan-amount-input"]').setValue('20000001')

    expect(wrapper.get('[data-testid="loan-amount-error"]').text()).toContain('Maximum')
  })

  it('accepts amounts within the valid range without an error', async () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })

    await wrapper.get('[data-testid="loan-amount-input"]').setValue('30000')

    expect(wrapper.find('[data-testid="loan-amount-error"]').exists()).toBe(false)
  })
})
