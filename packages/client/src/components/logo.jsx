import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Link as MuiLink } from '@mui/material'

export default function Logo() {
  return (
    <Typography variant="subtitle1">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <MuiLink underline="hover">Move to Done (Logo)</MuiLink>
      </Link>
    </Typography>
  )
}
