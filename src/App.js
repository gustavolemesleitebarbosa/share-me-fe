import React, { useEffect } from 'react'
import { Routes, Route, UseNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './hooks/useAuth'
import Login from './components/Login'
import {useAuth} from './hooks/useAuth'
import Home from './container/Home'


const App = () => {

  const { REACT_APP_PUBLIC_GOOGLE_API_TOKEN } = process.env

  return (
    <GoogleOAuthProvider clientId={REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
      <AuthProvider>
        <RoutesComponent/>
      </AuthProvider>
    </GoogleOAuthProvider>
  )

}

const RoutesComponent = () => {

  const {user} = useAuth()

  return (
    <>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={user?<Home/>:<Login/>}/>
        </Routes>
    </>
  )

}

export default App