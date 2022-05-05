import React, { useState, useContext } from 'react'
import { Button, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'
import { AuthContext } from '../auth'

const testUsername = 'thisaccount@email.com'
const testPassword = 'Password123!'

function LoginTestUserButton({ handleError }) {
  const [isLoading, setIsLoading] = useState(false)

  const authContext = useContext(AuthContext)

  const handleTestUserLoginButtonClick = async () => {
    setIsLoading(true)
    let response
    try {
      response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: testUsername, password: testPassword }),
      })
    } catch (error) {
      handleError({
        message: `Caugth error: ${JSON.stringify(error)}`,
        error,
      })
      return
    } finally {
      setIsLoading(false)
    }

    if (response.status !== 200) {
      const error = await response.json()
      handleError({
        message: `Login request returned with Status Code: ${response.status}`,
        error,
      })
    }

    const data = await response.json()

    if (data.hasError) {
      handleError({
        message: `Login request returned with 200 but Error is: '${data.errorMessage}'`,
        error: data.errorMessage,
      })
      return
    }

    authContext.login({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
  }

  return (
    <Button
      variant="text"
      color="success"
      disabled={isLoading}
      onClick={handleTestUserLoginButtonClick}
    >
      {isLoading ? <CircularProgress size={24} /> : 'Login Test User'}
    </Button>
  )
}

LoginTestUserButton.propTypes = {
  handleError: PropTypes.func,
}

LoginTestUserButton.defaultProps = {
  handleError: ({ message }) => console.log(`Error message: ${message}`),
}

export default LoginTestUserButton
