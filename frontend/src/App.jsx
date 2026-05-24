import React, { useCallback, useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './lib/Layout'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import { UserContext } from './lib/UserContext'
import ForgetPassword from './pages/ForgetPassword'

const App = () => {

  const { authState, isLoading } = useContext(UserContext);

  const ProtectedRoute = useCallback(() => {

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!authState) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;

  }, [authState, isLoading])

  return (
    <>

      <Toaster />

      <Routes>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>

            <Route path='/' element={<ChatPage />} />

          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App