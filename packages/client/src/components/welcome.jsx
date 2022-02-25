import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography, Box, Button } from '@mui/material'

export default function Welcome() {
  return (
    <Stack>
      <Typography variant="subtitle1" align="center">
        Give your day the structure that you want.
      </Typography>
      <Box sx={{ mt: 4 }} textAlign="center">
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Create your account</Button>
        </Link>
      </Box>
    </Stack>
  )
}
