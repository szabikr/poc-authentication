import React from 'react'
import { useLocation } from 'react-router-dom'

export default function RegisterSuccess() {
  const { state } = useLocation()

  return (
    <>
      <h1>Registration was successful</h1>
      <h2>Your Email: {state?.email}</h2>
      <h2>Your Username: {state?.username}</h2>
    </>
  )
}
