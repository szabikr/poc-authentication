import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material'
import validate from './validate'
import PasswordField from '../password-field'

export default function RegisterForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  })
  const [pageError, setPageError] = useState({ open: false, message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleRegisterOnClick = async () => {
    const validation = validate(
      email.value,
      password.value,
      confirmPassword.value,
    )

    setEmail({ ...email, error: validation.emailError })
    setPassword({ ...password, error: validation.passwordError })
    setConfirmPassword({
      ...confirmPassword,
      error: validation.confirmPasswordError,
    })

    if (validation.hasError) {
      return
    }

    setIsLoading(true)

    let response
    try {
      response = await fetch('/api/user/register', {
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

    if (response.status === 409) {
      const error = await response.json()
      setEmail({ ...email, error: error.message })
    }

    if (response.status === 201) {
      const data = await response.json()

      setEmail({ value: '', error: '' })
      setPassword({ value: '', error: '' })
      setConfirmPassword({ value: '', error: '' })

      navigate('/register/success', {
        state: { email: data.email, username: data.username },
      })
    }

    setIsLoading(false)
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ mb: 4 }}>
        <Typography align="center" variant="h4">
          Create your account
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
        error={password.error !== ''}
        helperText={password.error}
      />
      <PasswordField
        id="confirm-password"
        label="Confirm password"
        variant="outlined"
        type="password"
        value={confirmPassword.value}
        onChange={(event) =>
          setConfirmPassword({
            ...confirmPassword,
            value: event.target.value,
          })
        }
        onKeyUp={(event) => {
          const enterKeyCode = 13
          if (event.keyCode === enterKeyCode) {
            handleRegisterOnClick()
          }
        }}
        error={confirmPassword.error !== ''}
        helperText={confirmPassword.error}
      />
      <Alert severity="info">
        If you can, do not reuse any of your existing passwords
      </Alert>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleRegisterOnClick}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Register'}
      </Button>

      <Typography align="center" variant="subtitle1">
        Already have an account?{' '}
        <Link to="/auth/login" style={{ textDecoration: 'none' }}>
          <MuiLink underline="hover">Login</MuiLink>
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
