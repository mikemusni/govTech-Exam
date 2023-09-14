import { CssBaseline } from '@mui/material'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import router from './router'
import ThemeProvider from './theme/ThemeProvider'

const App: React.FC = () => {
  const content = useRoutes(router)

  return (
    <ThemeProvider>
      <CssBaseline>{content}</CssBaseline>
    </ThemeProvider>
  )
}

export default App
