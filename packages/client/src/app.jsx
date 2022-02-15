import React from 'react'
import { Container, Box } from '@mui/material'
import Header from './components/header'
import Footer from './components/footer'
import RegisterForm from './components/register-form'

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Header />
        <Box sx={{ mt: 4, mb: 8 }}>
          <RegisterForm />
        </Box>
        <Footer />
      </Box>
    </Container>
  )
}
