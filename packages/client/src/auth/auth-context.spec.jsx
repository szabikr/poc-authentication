import React, { useContext } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthContextProvider, { AuthContext } from './auth-context'

const ACCESS_TOKEN = 'ACCESS TOKEN VALUE'
const REFRESH_TOKEN = 'REFRESH TOKEN VALUE'

function AuthContextConsumer() {
  const auth = useContext(AuthContext)
  return (
    <>
      <div>access token is: {auth.accessToken ?? 'null'}</div>
      <div>refresh token is: {auth.refreshToken ?? 'null'}</div>
      <div>
        <button
          type="button"
          onClick={() =>
            auth.login({
              accessToken: ACCESS_TOKEN,
              refreshToken: REFRESH_TOKEN,
            })
          }
        >
          Login
        </button>
      </div>
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

  it('should do login functionality correctly and store the tokens', () => {
    render(
      <AuthContextProvider>
        <AuthContextConsumer />
      </AuthContextProvider>,
    )

    fireEvent.click(screen.getByText('Login'))

    expect(screen.getByText(/^access token is:/)).toHaveTextContent(
      `access token is: ${ACCESS_TOKEN}`,
    )
    expect(screen.getByText(/^refresh token is:/)).toHaveTextContent(
      `refresh token is: ${REFRESH_TOKEN}`,
    )
  })
})
