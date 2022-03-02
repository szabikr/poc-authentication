import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Home() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function doEffect() {
      const authToken = state?.authToken
      try {
        const response = await fetch('/api/todos', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        })

        if (response.status === 401) {
          navigate('/auth/login')
        }

        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.log('error while making fetch request', error)
      }
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
