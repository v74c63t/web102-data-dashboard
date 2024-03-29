import { useState, useEffect } from 'react'
import axios from 'axios'
import './Card.css'

const Card = () => {

  const [total, setTotal] = useState(0)

  useEffect (() => {
    const fetchTotal = () => {
      axios.get('https://api.openbrewerydb.org/v1/breweries/meta')
            .then((res) => {
              setTotal(res.data.total)
            })
    }
    fetchTotal()
  }, [])

  return (
    <div className='card'>
      <h2>{total}</h2>
      <p>Total Number of Breweries</p>
    </div>
  )
}

export default Card