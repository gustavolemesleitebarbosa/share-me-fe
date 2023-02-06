import React, { useEffect, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import { client } from '../client'
import Pins from './Pins'
import { userQuery } from '../utils/data'
import logo from '../assets/logo.png'

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  

  useEffect(() => {
    const userInfoId = localStorage.getItem('client_id')!== undefined ?localStorage.getItem('client_id'):localStorage.clear()
    const query = userQuery(userInfoId)
    client.fetch(query).then((data) => { 
      setUser(data[0])
    })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])


  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out' >
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSideBar(true)} />
          <Link to="/">
            <img src={logo} className="w-28" alt='logo' />
          </Link>
          <Link to={`user-profile/${user?.id}`}>
            <img src={user?.image} className="w-28" alt='logo' />
          </Link>
        </div>
        {
          toggleSideBar && (
            <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(false)} />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSideBar} />
            </div>)
        }
      </div>
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
          </Routes>
        </div>
    </div>
  )
}

export default Home