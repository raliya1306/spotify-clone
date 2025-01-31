import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/MainLayout'
import AlbumPage from './pages/AlbumPage'
import AdminPage from './pages/AdminPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Routes>
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/albums/:id' element={<AlbumPage />} />
      </Route>
    </Routes>
    <Toaster />
    </>
  )
}

export default App
