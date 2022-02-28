import React from 'react'
import { useLocation } from 'react-router-dom'

export default function LoginSuccess() {
  const { state } = useLocation()

  return (
    <>
      <h1>Login was successful</h1>
      <h2>Your username: {state?.username}</h2>
    </>
  )
}
