import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import refreshTokens from '../auth/refresh-tokens'

const TOKEN_EXPIRED_ERROR = 'Token Expired Error'

export default function Home() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  console.log('access token is', state?.accessToken)

  useEffect(() => {
    async function fetchTodos() {
      const accessToken = state?.accessToken
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
            navigate('/auth/login')
            return
          }

          console.log(
            'error is that token has expired, should use refresh token to get a new one',
          )

          const tokens = await refreshTokens(state?.refreshToken)

          console.log('tokens:', JSON.stringify(tokens, null, 2))

          return
        }

        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.log('error while making fetch request', error)
      }
    }

    fetchTodos()
  }, [])

  return (
    <>
      <h1>Home page</h1>
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
