import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MansoryLayout from './MansoryLayout'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {categoryId}= useParams()

  const fetchPins = useCallback(()=>{
    setLoading(true)
    if(categoryId){
      // create a query first because it does have parameters
      const query = searchQuery(categoryId)
      client.fetch(query).then((data)=>{

        setPins(data)
        setLoading(false)
      })
    } 
    else{
    // does not  need top create a query first because it does not have parameters
      client.fetch(feedQuery).then((data)=>{
        console.log('all pins',data)
        setPins(data)
        setLoading(false)
      })
    }
  },[categoryId])

  useEffect (() => { 
    fetchPins()
   }, [categoryId, fetchPins])

   if (loading) return <Spinner message={`We are adding new ideas to your feed!`} />

  return (
    <div> {pins && <MansoryLayout pins={pins} fetchPins={fetchPins}/>}</div>
  )
}

export default Feed