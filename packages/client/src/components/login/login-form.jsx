import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Stack,
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Link as MuiLink,
} from '@mui/material'
import validate from './validate'
import PasswordField from '../password-field'

export default function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [pageError, setPageError] = useState({ open: false, message: '' })
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginOnClick = async () => {
    const validation = validate(email.value, password.value)
    setEmail({ ...email, error: validation.emailError })
    setPassword({ ...password, error: validation.passwordError })
    setLoginError('')

    if (validation.hasError) {
      return
    }

    setIsLoading(true)

    let response
    try {
      response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      })
    } catch (error) {
      setPageError({
        open: true,
        message: `Network error: ${JSON.stringify(error)}`,
      })
      return
    } finally {
      setIsLoading(false)
    }

    if (response.status === 500) {
      const error = await response.json()
      setPageError({
        open: true,
        message: error.message,
      })
    }

    if (response.status === 422) {
      const error = await response.json()
      setEmail({ ...email, error: error.emailError ?? '' })
      setPassword({ ...password, error: error.passwordError ?? '' })
    }

    if (response.status === 200) {
      const data = await response.json()

      if (data.hasError) {
        setLoginError(data.errorMessage)
        return
      }

      setEmail({ value: '', error: '' })
      setPassword({ value: '', error: '' })

      navigate('/auth/login/success', {
        state: { username: data.username, authToken: data.authToken },
      })
    }
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ mb: 4 }}>
        <Typography align="center" variant="h4">
          Login to your account
        </Typography>
      </Box>

      <TextField
        id="email"
        label="Email address"
        variant="outlined"
        type="email"
        value={email.value}
        onChange={(event) => setEmail({ ...email, value: event.target.value })}
        error={email.error !== ''}
        helperText={email.error}
      />
      <PasswordField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={password.value}
        onChange={(event) =>
          setPassword({ ...password, value: event.target.value })
        }
        onKeyUp={(event) => {
          const enterKeyCode = 13
          if (event.keyCode === enterKeyCode) {
            handleLoginOnClick()
          }
        }}
        error={password.error !== ''}
        helperText={password.error}
      />

      {loginError !== '' && (
        <Alert variant="outlined" severity="error">
          {loginError}
        </Alert>
      )}

      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleLoginOnClick}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>

      <Typography align="center" variant="subtitle1">
        Don&apos;t have an account?{' '}
        <Link to="/auth/register" style={{ textDecoration: 'none' }}>
          <MuiLink underline="hover">Register</MuiLink>
        </Link>
      </Typography>

      <Snackbar
        open={pageError.open}
        autoHideDuration={10000}
        onClose={() => setPageError({ open: false })}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setPageError({ open: false })}
        >
          {pageError.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
