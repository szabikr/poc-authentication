import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

export default function Footer() {
  return (
    <>
      <Divider />
      <Box
        sx={{
          textAlign: 'center',
          mt: 2,
        }}
      >
        a <strong>szabi.space</strong> development
      </Box>
    </>
  )
}
