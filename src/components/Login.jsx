import React from 'react'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import {client} from '../client'

const Login = () => {
  const navigate = useNavigate()
  const googleResponse = (response) => {
    localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)))
    localStorage.setItem('client_id',response.clientId )
    const { name, given_name, email, picture } = jwt_decode(response.credential)
    const googleId = response.clientId
    const doc ={
      _id: googleId,
      _type: 'user',
      userName: name,
      image: picture
    }
    client.createIfNotExists(doc).then(()=>{navigate('/',{replace: true})})
  }

  return (
    <div className=' flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              onSuccess={(response) => googleResponse(response)}
              onError={(error) => console.log(error)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login