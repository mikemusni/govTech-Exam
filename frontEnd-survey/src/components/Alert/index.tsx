import { Alert } from '@mui/material'
import React from 'react'

interface AlertMessageProps {
  message: string
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <Alert severity='error' sx={{ ml: 1, mb: 1, width: '96%' }}>
      {message}
    </Alert>
  )
}

export default AlertMessage
