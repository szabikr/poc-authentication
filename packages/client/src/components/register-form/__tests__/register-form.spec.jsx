import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RegisterForm from '../register-form'

describe('Register Form component', () => {
  it('should render info message', () => {
    const { getByText } = render(<RegisterForm />)
    expect(
      getByText('If you can, do not reuse any of your existing passwords'),
    ).toBeInTheDocument()
  })
})
