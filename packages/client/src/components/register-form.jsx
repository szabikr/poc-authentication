import React from 'react'
import { Container, Stack, TextField, Button } from '@mui/material'

export default function RegisterForm() {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <TextField id="email" label="Email" variant="outlined" />
        <TextField id="password" label="Password" variant="outlined" />
        <TextField id="password" label="Confirm password" variant="outlined" />
        <Button variant="contained">Register</Button>
      </Stack>
    </Container>
  )
}
