import React from 'react'
import { Divider } from '@mui/material'

import TestUserLogin from './test-user-login'
import TestUserTokens from './test-user-tokens'
import Todos from './todos'

export default function AuthDemo() {
  return (
    <>
      <h1>Auth Demo</h1>
      <TestUserLogin />
      <Divider />
      <TestUserTokens />
      <Divider />
      <Todos />
    </>
  )
}
