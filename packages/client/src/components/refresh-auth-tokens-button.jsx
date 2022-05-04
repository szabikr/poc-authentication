import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress } from '@mui/material'
import { AuthContext } from '../auth'

function RefreshAuthTokensButton({ handleError }) {
  const [isLoading, setIsLoading] = useState(false)

  const authContext = useContext(AuthContext)

  const handleRefreshTokensButtonClick = async () => {
    setIsLoading(true)

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
      handleError({
        message: `Caught error: ${JSON.stringify(error)}`,
        error,
      })
      return
    } finally {
      setIsLoading(false)
    }

    if (response.status !== 200) {
      handleError({
        message: `Refresh request returned with Status Code: ${response.status}`,
      })
    }

    const data = await response.json()

    authContext.login({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
  }
  return (
    <Button
      variant="contained"
      color="warning"
      disabled={isLoading}
      onClick={handleRefreshTokensButtonClick}
    >
      {isLoading ? <CircularProgress size={24} /> : 'Refresh Tokens'}
    </Button>
  )
}

RefreshAuthTokensButton.propTypes = {
  handleError: PropTypes.func,
}

RefreshAuthTokensButton.defaultProps = {
  handleError: ({ message }) => console.log(`Error message: ${message}`),
}

export default RefreshAuthTokensButton
