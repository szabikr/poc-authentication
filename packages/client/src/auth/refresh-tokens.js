async function refreshTokens(refreshToken) {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (response.status === 400) {
      return { error: 'refresh tokens, Invalid Request Body' }
    }

    if (response.status === 500) {
      return { error: 'refresh tokens, Internal server error' }
    }

    if (response.status === 401) {
      return { error: 'refresh tokens, Access denied' }
    }

    const data = await response.json()

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    }
  } catch (error) {
    console.log('error while refreshing tokens', error)

    return { error }
  }
}

export default refreshTokens
