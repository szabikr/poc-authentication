import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Box } from '@mui/material'

export default function Auth() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Outlet />
      </Box>
    </Container>
  )
}
