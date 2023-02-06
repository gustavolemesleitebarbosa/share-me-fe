import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

import { client, urlFor } from '../client'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import MansoryLayout from './MansoryLayout'

import Spinner from './Spinner'

const PinDetail = ({ user }) => {

  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComent] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const { pinId } = useParams()


  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0])
          if (data[0]) {
            query = pinDetailMorePinQuery(data[0])
            client.fetch(query).then((res) => setPins(res))
          }
        })
    }
  }

  const addComment = () => {
    if (comment) {
      setAddingComent(true)
      client.patch(pinId).setIfMissing({ comments: [] }).insert('after', 'comments[-1]', [{
        comment,
        _key: uuidV4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        }
      }
      ])
        .commit()
        .then(() => {
          fetchPinDetails()
          setAddingComent(false)
          setComment('')
        })
    }
  }

  useEffect(() => {
    fetchPinDetails()
  }, [pinId])


  if (!pinDetail) return <Spinner message='Loading detail' />

  return (
    <>
      <div className='flex xl-flex-row flex-col m-auto bg-white' style={{ minWidth: 150, borderRadius: 32 }}>
        <div className='relative flex justify-center items-center md:items-start flex-initial'>
          <div className=' absolute top-0 right-0 px-4 py-4'>
            <a
              href={`${pinDetail?.image?.asset?.url}?dl=`}
              download
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md '
              onClick={(e) => e.stopPropagation()}
            >
              <MdDownloadForOffline fontSize={40} />
            </a>
          </div>
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            className="rounded-t-3xl rounded-b-lg"
            alt='user-post'
          ></img>
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='w-full flex items-center justify-end lg:justify-end'>
            <a
              className='text-xl font-semibold text-gray-500 border-2 border-l-2 rounded-lg py-2 px-4'
              href={pinDetail?.destination}
              target='_blank'
              rel='noreferrer'>
              {pinDetail?.destination}
            </a>
          </div>
          <div>
            <h1 className='font-bold text-xl break-words mt-3'>{pinDetail?.title}</h1>
            <p className='mt-3'> {pinDetail?.about}</p>
          </div>
          <Link to={`/user-profile/${pinDetail?.postedBy?._id}}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
            <img
              className='w-8 h-8 rounded-full object-cover'
              src={pinDetail.postedBy.image}
              alt="user-profile"
            />
            <p className='font-semibold capitalize'>{pinDetail.postedBy.userName?.split(" ")?.[0]}</p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((comment, i) => (<div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
              <img
                src={comment.postedBy.image}
                alt="user-profile"
                className='w-10 h-10 rounded-full cursor-pointer'
              />
              <div className="flex flex-col">
                <p className='font-bold'>
                  {pinDetail.postedBy.userName?.split(" ")?.[0]}
                </p>
                <p>{comment?.comment}</p>
              </div>
            </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3'>
            <Link to={`/user-profile/${pinDetail?.postedBy?._id}}`}>
              <img
                className='w-10 h-10 mt-1 rounded-full cursor-pointer'
                src={pinDetail.postedBy.image}
                alt="user-profile"
              />
            </Link>
            <div onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} className='flex-1 outline-none outline-none border-2 rounded-2xl resize-none py-2 px-2'>
              <textarea
                className='w-full border-none resize-none outline-none '
                type='text'
                placeholder='Add a comment ...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              type='button'
              className='bg-red-500 text-white rounded-full px-12 py-4 font-semibold outline-none text-xl'
              onClick={addComment}
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {
        pins?.length > 0 ? (<>
          <h2 className='text-center font-bold text-2x mt-8 mb-4'>
            More like this
          </h2>
          <MansoryLayout pins={pins} />
        </>) : (<div className='mt-2'><Spinner message="Loading more pins..." /></div>)
      }
    </>
  )
}

export default PinDetail