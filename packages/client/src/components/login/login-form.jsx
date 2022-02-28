import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import PasswordField from '../password-field'

export default function LoginForm() {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [pageError, setPageError] = useState({ open: false, message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginOnClick = () => {
    setIsLoading(true)

    console.log('Login attempt is happening with:')
    console.log(`email: ${email.value}`)
    console.log(`password: ${password.value}`)

    setIsLoading(false)
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
        label="Email"
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
