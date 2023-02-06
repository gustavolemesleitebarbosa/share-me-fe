import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import {fetchUserId } from '../utils/fetchUser'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client'

const Pin = ({ pin: { postedBy, image, _id, destination, save }, fetchPins }) => {

  const [postHovered, setPostHovered] = useState(false)
  const navigate = useNavigate()
  const userInfoId = fetchUserId()
  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === userInfoId))?.length

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidV4(),
          userId: userInfoId,
          postedBy: {
            _type: 'postedBy',
            _ref: userInfoId
          }
        }]
        ).commit().then(() => {
          fetchPins()
          // window.location.reload()
        })
    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        fetchPins()
        // window.location.reload()
      })
  }

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-100 ease-in-out"
      >
        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1n pr-2 pb-2 z-50'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between '>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md  outline-none'
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (<button type="button" onClick={(e) => {
                e.stopPropagation()
              }} className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-2 mt-2 text-base rounded-3xl hover:shadow-md outlined-none cursor-help' style={{cursor:'default'}} >{save?.length} Saved</button>) :
                (<button type="button" onClick={(e) => {
                  e.stopPropagation()
                  savePin(_id)
                }} className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-2 mt-2 text-base rounded-3xl hover:shadow-md outlined-none cursor-help'>Save</button>)}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a href={destination}
                  onClick={(e)=>{e.stopPropagation()}}
                  target="_blak"
                  rel="noreferrer"
                  className='bg-white flex items-center gap-2  text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8, 20)}
                </a>)}
              {postedBy?._id === userInfoId && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }} className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold mt-2 text-base rounded-3xl hover:shadow-md outlined-none'
                >
                  <AiTwotoneDelete/>
                </button>
              )}
            </div>

          </div>
        )}
      </div>
       <Link to ={`/user-profile/${postedBy?._id}`} className="flex mt-3 ml-2 gap-2 items-center">
         <img
          className='w-8 h-8 rounded-full object-cover'
          src={postedBy.image}
          alt ="user-profile"
         />
         <p className='font-semibold capitalize'>{postedBy.userName.split(" ")[0]}</p>
       </Link>
    </div>
  )
}

export default Pin