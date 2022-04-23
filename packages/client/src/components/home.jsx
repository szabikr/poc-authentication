import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, CircularProgress } from '@mui/material'
import { AuthContext, ACCESS_DENIED_ERROR, TOKEN_EXPIRED_ERROR } from '../auth'
import fetchTodos from '../service/get-todos'

export default function Home() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayRefreshMessage, setDisplayRefreshMessage] = useState(false)

  const handleLoadTodosButtonClick = async () => {
    console.log('handling load todos button click...')
    setDisplayRefreshMessage(false)
    setTodos([])
    setIsLoading(true)
    const result = await fetchTodos(authContext.accessToken)

    if (result.hasError) {
      if (result.error === ACCESS_DENIED_ERROR) {
        console.log(
          'Authentication error has happened, most likely the accessToken was malformed',
        )
        setIsLoading(false)
        navigate('/auth/login')
        return
      }

      if (result.error === TOKEN_EXPIRED_ERROR) {
        console.log(
          'Token expired error has happened, should refresh access token',
        )
        await authContext.refreshAccessToken()
        setDisplayRefreshMessage(true)
        setIsLoading(false)
        return
      }

      console.log('Something went wrong and the error is', result.error)
      setIsLoading(false)
      return
    }

    setTodos(result.data)
    setIsLoading(false)
  }

  return (
    <>
      <h1>Home page</h1>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleLoadTodosButtonClick}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Load Todos'}
      </Button>
      {displayRefreshMessage && (
        <Alert id="login-error" variant="outlined" severity="warning">
          Tokens are refreshed, please click Load Todos again.
        </Alert>
      )}
      {todos !== [] ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      ) : (
        <p>no todos available</p>
      )}
    </>
  )
}
