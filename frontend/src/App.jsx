import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './lib/layout'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import { UserContext } from './lib/UserContext'

const App = () => {

  const { authState } = useContext(UserContext)

  const protectedRoute = () => {
    if (!authState) {
      return <Navigate to="/login" />
    }
  }

  return (
    <>

      <Toaster />

      <Routes>

        <Route path='/login' element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route element={protectedRoute()}>

            <Route path='/' element={<ChatPage />} />

          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App