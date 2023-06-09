import React from 'react'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'


const NavBar = ({ searchTerm, setSearchTerm, user }) => {

  const navigate = useNavigate()
  if (!user) return null
  const destinationUrl = `user-profile/${user._id}`

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
      <IoMdSearch  fontSize={21} className='ml-1' />
      <input
      type="text"
      onChange={(e)=>setSearchTerm(e.target.value)}
      placeholder={user.email}
      value ={searchTerm}
      onFocus={()=>{navigate("/search")}}
      className ="p-2 w-full bg-white outline-none"
      />
      <div className='flex gap-3'>
        { user._id && <Link to={destinationUrl} className="hidden md:block" >
        <img src={user.image} alt="user" className='w-14 h-12 rounded-lg' />
        </Link>}
        <Link to={`create-pin`} className="bg-slate-800 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center " >
        <IoMdAdd fontSize={28}/>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default NavBar