import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
// import { useNavigate } from 'react-router-dom'
import refreshTokens from './refresh-tokens'

export const AuthContext = createContext(null)

// TODO: These constants should not leave this Auth Context
export const TOKEN_EXPIRED_ERROR = 'Token Expired Error'
export const ACCESS_DENIED_ERROR = 'Access Denied Error'
export const AUTHENTICATION_ERROR = 'Authnentication Error'

function AuthContextProvider({ children }) {
  // const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState(null)

  // The localStorage related code can potentially be separated out into its own custom hook
  // See: https://blog.logrocket.com/using-localstorage-react-hooks
  const [refreshToken, setRefreshToken] = useState(() => {
    const savedRefreshToken = localStorage.getItem('refresh_token')
    if (savedRefreshToken === 'undefined') {
      return null
    }
    return savedRefreshToken || null
  })

  useEffect(() => {
    // For more information see this article about syncing localStorage between tabs
    // https://medium.com/@mfreundlich1/syncing-localstorage-across-multiple-tabs-cb5d0b1feaab
    const syncRefreshTokens = (e) => {
      console.log(`Key Changed: ${e.key}`)
      console.log(`New Value: ${e.newValue}`)
      if (e.newValue !== refreshToken) {
        setRefreshToken(e.newValue)
      }
    }
    window.addEventListener('storage', syncRefreshTokens)
    return () => {
      window.removeEventListener('storage', syncRefreshTokens)
    }
  }, [])

  useEffect(() => {
    const savedRefreshToken = localStorage.getItem('refresh_token')
    if (savedRefreshToken === refreshToken) {
      console.log('refresh token has not changed')
      return
    }
    localStorage.setItem('refresh_token', refreshToken)
  }, [refreshToken])

  const login = useCallback((response) => {
    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)
  }, [])

  const makeAuthenticatedRequest = useCallback((request, params) => {
    // TODO: Implement this function that encapsulates the refreshing mechanism of the accessToken
    //       and it makes it so that the rest of the application doesn't have to deal with accessTokens at all
    console.log('Not yet implemented')
    console.log('request is', request)
    console.log('params are', params)
  })

  const refreshAccessToken = async () => {
    if (refreshToken === null) {
      console.log('There is no refresh token', 'should navigate to login page')
      // navigate('/auth/login')
    }

    const response = await refreshTokens(refreshToken)
    if (response.hasError) {
      console.log('Error while refreshing tokens: ', response.error)
      console.log('should navigate to login page')
      // navigate('/auth/login')
    }

    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)
  }

  // useEffect(() => {
  //   console.log('Initial refresh of the tokens')
  //   refreshAccessToken()
  // }, [])

  const contextValue = useMemo(
    () => ({
      accessToken,
      refreshToken,
      login,
      refreshAccessToken,
      makeAuthenticatedRequest,
    }),
    [accessToken, refreshToken, login],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthContextProvider
