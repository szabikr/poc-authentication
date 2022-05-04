import React, { useState, useContext } from 'react'
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material'
import { AuthContext } from '../auth'

const testUsername = 'thisaccount@email.com'
const testPassword = 'Password123!'

export default function TestUserLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const authContext = useContext(AuthContext)

  const handleTestUserLoginButtonClick = async () => {
    setIsLoading(true)
    setLoginError('')
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
      setLoginError(`Caugth error: ${JSON.stringify(error)}`)
      return
    } finally {
      setIsLoading(false)
    }

    if (response.status !== 200) {
      const error = await response.json()
      setLoginError(
        `Login request returned with Status Code: ${
          response.status
        } # Error is ${JSON.stringify(error)}`,
      )
    }

    const data = await response.json()

    if (data.hasError) {
      setLoginError(
        `Login request returned with 200 but Error is: '${data.errorMessage}'`,
      )
      return
    }

    authContext.login({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
  }

  return (
    <Stack
      sx={{ m: 4 }}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Box>
        <strong>Username:</strong> {testUsername}
      </Box>
      <Box>
        <strong>Password:</strong> {testPassword}
      </Box>
      <Button
        variant="contained"
        color="success"
        disabled={isLoading}
        onClick={handleTestUserLoginButtonClick}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login Test User'}
      </Button>
      {loginError !== '' && (
        <Alert id="login-error" variant="outlined" severity="error">
          {loginError}
        </Alert>
      )}
    </Stack>
  )
}
