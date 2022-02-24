import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Header from './components/header'
import Footer from './components/footer'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Header />
          <Box sx={{ mt: 4, mb: 8 }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
