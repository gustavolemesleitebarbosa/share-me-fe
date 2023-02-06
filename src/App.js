import React,{useEffect} from 'react'
import { Routes, Route, UseNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import Home from './container/Home'


const App = () => {

 const { REACT_APP_PUBLIC_GOOGLE_API_TOKEN } = process.env

  return (
    <GoogleOAuthProvider clientId={ REACT_APP_PUBLIC_GOOGLE_API_TOKEN }>
    <Routes>
      <Route path="login" element ={<Login/>}/>
      <Route path="/*" element ={<Home/>}/>
    </Routes>
    </GoogleOAuthProvider>
  )
  
}

export default App