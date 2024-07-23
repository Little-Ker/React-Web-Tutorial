import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { StylesProvider } from '@mui/styles'
import { SnackbarProvider } from 'notistack'
import { snackbarClasses } from '@/components/notifier'
import App from './App'
import reportWebVitals from './reportWebVitals'
import globalTheme from './globalTheme/muiGlobalTheme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={globalTheme}>
    <SnackbarProvider classes={snackbarClasses} maxSnack={3}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <App />
      </StylesProvider>
    </SnackbarProvider>
  </ThemeProvider>
)

reportWebVitals()
