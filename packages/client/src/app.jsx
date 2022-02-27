import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Logo from './components/logo'
import Footer from './components/footer'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Logo />
        <Outlet />
        <Footer />
      </Container>
    </ThemeProvider>
  )
}
