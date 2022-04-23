import React from 'react'
import { Divider } from '@mui/material'

import TestUserLogin from './test-user-login'
import TestUserTokens from './test-user-tokens'
import Todos from './todos'

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <TestUserLogin />
      <Divider />
      <TestUserTokens />
      <Divider />
      <Todos />
    </>
  )
}
