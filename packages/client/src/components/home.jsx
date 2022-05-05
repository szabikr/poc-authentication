import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import LoginTestUserButton from './login-test-user-button'
import RefreshAuthTokensButton from './refresh-auth-tokens-button'

export default function Home() {
  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Move 2 Done
          </Typography>
          <LoginTestUserButton />
          <RefreshAuthTokensButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
