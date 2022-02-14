import React from 'react'
import Button from '@mui/material/Button'
import Header from './components/header'
import Footer from './components/footer'

export default function App() {
  return (
    <div>
      <Header />
      <Button variant="contained">Login</Button>
      <Footer />
    </div>
  )
}
