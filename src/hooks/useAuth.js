import { googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react';
import { client } from '../client';

export const AuthContext = createContext(
  {},
);

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const user = localStorage.getItem('client_id');
    if (user) {
      return user;
    }
    return null
  });

  const googleResponse = (response, callback) => {
    localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)))
    const { name, given_name, email, picture, sub } = jwt_decode(response.credential)
    localStorage.setItem('client_id',sub )
    const googleId = response.clientId

    const doc ={
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
    console.log('testing', response.clientId)
    setData(response.clientId )
    client.createIfNotExists(doc).then(()=>{callback()})
  }

  const logout =(callback) => {
    localStorage.clear()
    setData(null)
    googleLogout()
    callback()
 }


  return (
    <AuthContext.Provider
      value={{ user: data, googleResponse, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an authprovider');
  }
  return context;
}