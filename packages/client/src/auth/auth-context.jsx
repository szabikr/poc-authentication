import React, { createContext, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext(null)

function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  const login = useCallback((response) => {
    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)
  }, [])

  const contextValue = useMemo(
    () => ({
      accessToken,
      refreshToken,
      login,
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
