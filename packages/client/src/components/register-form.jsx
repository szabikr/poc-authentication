import React, { useState } from 'react'
import { Stack, TextField, Button, Typography } from '@mui/material'

function validate(email, password, confirmPassword) {
  let emailError = ''
  let passwordError = ''
  let confirmPasswordError = ''

  if (email === '') {
    emailError = 'Enter your email address'
  }

  if (password === '') {
    passwordError = 'Enter your password'
  }

  if (confirmPassword === '') {
    confirmPasswordError = 'Confirm your password'
  }

  if (password !== confirmPassword) {
    confirmPasswordError = 'Passwords must match'
  }

  return {
    hasError:
      emailError !== '' || passwordError !== '' || confirmPasswordError !== '',
    emailError,
    passwordError,
    confirmPasswordError,
  }
}

export default function RegisterForm() {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  })

  const handleRegisterOnClick = () => {
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

    console.log('we are ready to register with')
    console.log(`email: ${email.value}`)
    console.log(`password: ${password.value}`)
    console.log(`confirmPassword: ${confirmPassword.value}`)
  }

  return (
    <Stack spacing={2}>
      <Typography align="center" variant="subtitle1">
        Create your account
      </Typography>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={email.value}
        onChange={(event) => setEmail({ ...email, value: event.target.value })}
        error={email.error !== ''}
        helperText={email.error}
      />
      <TextField
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
      <TextField
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
        error={confirmPassword.error !== ''}
        helperText={confirmPassword.error}
      />
      <Button variant="contained" onClick={handleRegisterOnClick}>
        Register
      </Button>
    </Stack>
  )
}
