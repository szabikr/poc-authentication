import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import getTodos, { AUTHENTICATION_ERROR } from '../service/get-todos'

export default function Home() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function doEffect() {
      const result = await getTodos(state?.accessToken, state?.refreshToken)

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
