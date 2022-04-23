import React, { useContext, useState } from 'react'
import { Alert, Button, Box, Stack, CircularProgress } from '@mui/material'
import { AuthContext } from '../auth'

export default function TestUserTokens() {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshError, setRefreshError] = useState('')

  const authContext = useContext(AuthContext)

  const handleRefreshTokensButtonClick = async () => {
    setIsLoading(true)
    setRefreshError('')

    let response
    try {
      response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: authContext.refreshToken }),
      })
    } catch (error) {
      setRefreshError(`Caught error: ${JSON.stringify(error)}`)
      return
    } finally {
      setIsLoading(false)
    }

    if (response.status !== 200) {
      setRefreshError(
        `Refresh request returned with Status Code: ${response.status}`,
      )
    }

    const data = await response.json()

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
      <Box sx={{ maxWidth: 600, wordWrap: 'break-word' }}>
        <Box>
          <strong>Refresh Token:</strong>
        </Box>
        {authContext.refreshToken}
      </Box>
      <Button
        variant="contained"
        color="warning"
        disabled={isLoading}
        onClick={handleRefreshTokensButtonClick}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Refresh Tokens'}
      </Button>
      {refreshError !== '' && (
        <Alert id="refresh-error" variant="outlined" severity="error">
          {refreshError}
        </Alert>
      )}
    </Stack>
  )
}
