import React, {
  Suspense, useCallback
} from 'react'
import {
  BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom'
import './App.sass'
import { Backdrop, CircularProgress } from '@mui/material'
import routes from '@/router/routes'
import history from '@/router/history'
import Navbar from '@/components/navbar'
import SubNavbar from '@/components/subNavbar/SubNavbar'
import loading from '@/zustand/loading'
import PopDialog from '@/components/popDialog'
import vars from '@/globalTheme/variables.module.sass'
import Notifier from '@/components/notifier'
import Home from '@/views/home'
import InvalidPage from '@/views/invalidPage'

function RouterPage() {
  const privateRoute = useCallback(route => (
    <Route
      key={route.id}
      path={route.path}
      exact={route.exact}
      element={<route.component />}
    />
  ), [])

  return (
    <Routes>
      {routes?.map((mainRoute) => {
        if (!mainRoute?.routes) return privateRoute(mainRoute)
        return mainRoute?.routes?.map(route => privateRoute(route))
      })}
      <Route path="/" element={<Home />} />
      <Route path="/invalidPage" element={<InvalidPage />} />
      <Route path="*" element={<Navigate to="/invalidPage" replace />} />
    </Routes>
  )
}

function App() {
  const { isLoading } = loading()

  return (
    <div className="App">
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div />}>
          <div
            style={{
              padding: '2rem 3rem',
              width: '100%',
              height: '100vh',
              overflowY: 'auto',
            }}
          >
            <RouterPage />
          </div>
        </Suspense>
        <Suspense fallback={<div />}>
          <SubNavbar />
        </Suspense>
      </Router>
      <Suspense>
        <Notifier />
      </Suspense>
      <Backdrop open={isLoading}>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="gradientCircle" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={vars.cPrimary} />
              <stop offset="100%" stopColor={vars.cNavBackground} />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#gradientCircle)' } }} />
      </Backdrop>
      <PopDialog />
    </div>
  )
}

export default App
