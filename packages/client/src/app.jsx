import React from 'react'
import Box from '@mui/material/Box'
import Header from './components/header'
import Footer from './components/footer'
import RegisterForm from './components/register-form'

export default function App() {
  return (
    <Box sx={{ mt: 8 }}>
      <Header />
      <Box sx={{ mt: 4, mb: 8 }}>
        <RegisterForm />
      </Box>
      <Footer />
    </Box>
  )
}
