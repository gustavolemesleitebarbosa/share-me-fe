import React from 'react'
import Mansory from 'react-masonry-css'
import Pin from './Pin'

const breakPointObj ={
  default:4,
  3000: 6,
  2000:5,
  1200:3,
  1000:2,
  500: 1
}

const MansoryLayout = ({pins, fetchPins}) => {
  return (
  <Mansory className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
    {pins?.map((pin)=>{
      return(<Pin key={pin.id} pin={pin} fetchPins={fetchPins} className="w-max"/>)
    })
    }
  </Mansory>
  )
}

export default MansoryLayout