import React from 'react'
import Button from '@mui/material/Button'
import Header from './header'
import Footer from './footer'

export default function App() {
  return (
    <div>
      <Header />
      <Button variant="contained">Login</Button>
      <Footer />
    </div>
  )
}
