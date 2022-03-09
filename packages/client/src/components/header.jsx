import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import Logo from './logo'

export default function Header() {
  const location = useLocation()

  const isAuthScreen = () => location.pathname.startsWith('/auth')

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
      <Logo />
      {!isAuthScreen() && (
        <Box>
          <Link to="/auth/login" style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }} variant="text">
              Login
            </Button>
          </Link>
          <Link to="/auth/register" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Register</Button>
          </Link>
        </Box>
      )}
    </Box>
  )
}
