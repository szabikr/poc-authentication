import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthContextProvider, { AuthContext } from './auth-context'

function AuthContextConsumer() {
  const auth = useContext(AuthContext)
  return (
    <>
      <div>access token is: {auth.accessToken ?? 'null'}</div>
      <div>refresh token is: {auth.refreshToken ?? 'null'}</div>
    </>
  )
}

describe('Auth Context Provider', () => {
  it('should render components in AuthContextProvider with default values', () => {
    render(
      <AuthContextProvider>
        <AuthContextConsumer />
      </AuthContextProvider>,
    )

    expect(screen.getByText(/^access token is:/)).toHaveTextContent(
      'access token is: null',
    )
    expect(screen.getByText(/^refresh token is:/)).toHaveTextContent(
      'refresh token is: null',
    )
  })
})
