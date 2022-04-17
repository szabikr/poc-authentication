import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth'
import getTodos, { AUTHENTICATION_ERROR } from '../service/get-todos'

export default function Home() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function doEffect() {
      const result = await getTodos(
        authContext.accessToken,
        authContext.refreshToken,
      )

      if (result.hasError) {
        if (result.error === AUTHENTICATION_ERROR) {
          navigate('/auth/login')
          return
        }

        console.log('Something went wrong and the error is', result.error)
        return
      }

      setTodos(result.data)
    }

    doEffect()
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
