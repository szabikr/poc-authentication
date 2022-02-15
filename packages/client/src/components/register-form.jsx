import React, { useState } from 'react'
import { Container, Stack, TextField, Button } from '@mui/material'

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

    if (email.value === '') {
      setEmail({ ...email, error: 'Enter your email address' })
    }

    if (password.value === '') {
      setPassword({ ...password, error: 'Enter your password' })
    }
    if (confirmPassword.value === '') {
      setConfirmPassword({ ...confirmPassword, error: 'Confirm your password' })
    }

    if (password.value !== confirmPassword.value) {
      return
    }

    console.log('we are ready to register with')
    console.log(`email: ${email.value}`)
    console.log(`password: ${password.value}`)
    console.log(`confirmPassword: ${confirmPassword.value}`)
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email.value}
          onChange={(event) =>
            setEmail({ ...email, value: event.target.value })
          }
          error={email.error !== ''}
          helperText={email.error}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password.value}
          onChange={(event) =>
            setPassword({ ...password, value: event.target.value })
          }
          error={password.error !== ''}
          helperText={password.error}
        />
        <TextField
          id="password"
          label="Confirm password"
          variant="outlined"
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
    </Container>
  )
}
