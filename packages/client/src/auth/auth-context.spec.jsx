import React from 'react'
import { render } from '@testing-library/react'
import AuthContextProvider from './auth-context'

describe('Auth Context Provider', () => {
  it('should render AuthContextProvider without problem', () => {
    render(
      <AuthContextProvider>
        <h1>Authenticated components</h1>
      </AuthContextProvider>,
    )

    // TODO: Implement the tests
    expect(true).toBe(false)
  })
})
