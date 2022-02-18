import React, { useState } from 'react'
import { Stack, TextField, Button, Typography } from '@mui/material'
import validate from './validate'

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

    fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => {
        console.log(response.status)
        if (response.status === 409) {
          response
            .json()
            .then((error) => setEmail({ ...email, error: error.message }))
        }
        if (response.status === 422) {
          response.json().then((error) => {
            setEmail({ ...email, error: error.emailError ?? '' })
            setPassword({ ...password, error: error.passwordError ?? '' })
          })
        }
        if (response.status === 201) {
          response.json().then((data) => {
            console.log('You have created your account successfuly with:')
            console.log(`email: ${data.email}`)
            console.log(`username: ${data.username}`)
          })

          setEmail({ value: '', error: '' })
          setPassword({ value: '', error: '' })
          setConfirmPassword({ value: '', error: '' })
        }
      })
      .catch((error) => console.log(`error is: ${JSON.stringify(error)}`))
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
