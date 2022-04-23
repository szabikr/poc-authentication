import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

export default function Logo() {
  return (
    <Typography variant="subtitle1">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button id="create-your-account-button" variant="text">
          Move to Done (Logo)
        </Button>
      </Link>
    </Typography>
  )
}
