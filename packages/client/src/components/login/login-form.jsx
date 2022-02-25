import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography, Link as MuiLink } from '@mui/material'

export default function LoginForm() {
  return (
    <Stack>
      <h1>Login Form</h1>
      <Typography align="center" variant="subtitle1">
        Don&apos;t have an account?{' '}
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <MuiLink underline="hover">Register</MuiLink>
        </Link>
      </Typography>
    </Stack>
  )
}
