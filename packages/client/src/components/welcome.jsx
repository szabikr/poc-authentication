import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography, Box, Button } from '@mui/material'

export default function Welcome() {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography align="center" variant="h2">
        Move to Done
      </Typography>
      <Box sx={{ mt: 4, mb: 8 }}>
        <Stack>
          <Typography variant="subtitle1" align="center">
            Give your day the structure that you want.
          </Typography>
          <Box sx={{ mt: 4 }} textAlign="center">
            <Link to="/auth/register" style={{ textDecoration: 'none' }}>
              <Button id="create-your-account-button" variant="contained">
                Create your account
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
