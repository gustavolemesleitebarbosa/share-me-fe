import React, { useState, useEffect } from 'react'
import MansoryLayout from './MansoryLayout'
import { client } from '../client'
import { useDebounce } from '../hooks/useDebounce'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'


const Search = ({ searchTerm }) => {

  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm,500)

  useEffect(() => {
    const query = searchQuery(debouncedSearchTerm.toLowerCase())
    if (debouncedSearchTerm) {
      setLoading(true)
      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
    else {
      client.fetch(feedQuery).then((data) => {
        setPins(data)
        setLoading(false)
      }
      )
    }
  }, [debouncedSearchTerm])


  return (
    <div>
      {loading && <Spinner message="Searching for pins" />}
      {pins?.length !== 0 && <MansoryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && <div className='MT-10 text-center text-xl'>
        No Pins found
      </div>}
    </div>
  )
}

export default Search