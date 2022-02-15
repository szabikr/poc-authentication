import React, { useState } from 'react'
import { Stack, TextField, Button, Typography } from '@mui/material'

export default function RegisterForm() {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  })

  const handleRegisterOnClick = () => {
    setEmail({ ...email, error: '' })
    setPassword({ ...password, error: '' })
    setConfirmPassword({ ...confirmPassword, error: '' })

    let hasError = false
    if (email.value === '') {
      setEmail({ ...email, error: 'Enter your email address' })
      hasError = true
    }

    if (password.value === '') {
      setPassword({ ...password, error: 'Enter your password' })
      hasError = true
    }

    if (confirmPassword.value === '') {
      setConfirmPassword({ ...confirmPassword, error: 'Confirm your password' })
      hasError = true
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        error: 'Passwords have to match',
      })
      hasError = true
    }

    if (hasError) {
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
