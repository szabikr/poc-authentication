import refreshTokens from '../auth/refresh-tokens'

const TOKEN_EXPIRED_ERROR = 'Token Expired Error'
export const AUTHENTICATION_ERROR = 'Authnentication Error'

async function fetchTodos(accessToken) {
  try {
    const response = await fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 401) {
      const { error } = await response.json()

      if (error !== TOKEN_EXPIRED_ERROR) {
        return { hasError: true, error: AUTHENTICATION_ERROR }
      }

      return { hasError: true, error: TOKEN_EXPIRED_ERROR }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.log('error while making fetch request', error)
    return { hasError: true, error }
  }
}

async function getTodos(accessToken, refreshToken) {
  const result = await fetchTodos(accessToken)

  if (result.error !== TOKEN_EXPIRED_ERROR) {
    return result
  }

  console.log(
    'error is that token has expired, should use refresh token to get a new one',
  )
  const tokens = await refreshTokens(refreshToken)
  console.log('we have to save the new refresh_token', tokens.refreshToken)
  return fetchTodos(tokens.accessToken)
}

export default getTodos
