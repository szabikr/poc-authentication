import React, { useContext, useState } from 'react'
import {
  Alert,
  Stack,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'
import { AuthContext } from '../auth'

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadTodosError, setLoadTodosError] = useState('')

  const authContext = useContext(AuthContext)

  const handleLoadTodosButtonClick = async () => {
    setTodos([])
    setIsLoading(true)
    setLoadTodosError('')

    let response
    try {
      response = await fetch('/api/todos', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authContext.accessToken}`,
        },
      })
    } catch (error) {
      setLoadTodosError(`Caugth error: ${JSON.stringify(error)}`)
      return
    } finally {
      setIsLoading(false)
    }

    if (response.status !== 200) {
      const error = await response.json()
      setLoadTodosError(
        `Load Todos request returned with Status Code: ${
          response.status
        } # Error is: ${JSON.stringify(error)}`,
      )
    }

    const data = await response.json()

    setTodos(data)
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
          <strong>Access Token:</strong>
        </Box>
        {authContext.accessToken}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        disabled={isLoading}
        onClick={handleLoadTodosButtonClick}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Load Todos'}
      </Button>
      {loadTodosError && (
        <Alert id="login-error" variant="outlined" severity="error">
          {loadTodosError}
        </Alert>
      )}
      <Box>
        <Typography variant="h4" sx={{ textDecoration: 'underline' }}>
          Todos
        </Typography>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
        ) : (
          <p>no todos available</p>
        )}
      </Box>
    </Stack>
  )
}
