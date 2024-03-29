import { useState, useEffect } from 'react'
import axios from 'axios'
import './Card.css'

const Card = ({data, name}) => {

  // const [total, setTotal] = useState(0)

  // useEffect (() => {
  //   const fetchTotal = () => {
  //     axios.get('https://api.openbrewerydb.org/v1/breweries/meta')
  //           .then((res) => {
  //             setTotal(res.data.total)
  //           })
  //   }
  //   fetchTotal()
  // }, [])

  return (
    <div className='card'>
      <h2>{data}</h2>
      <p>{name}</p>
    </div>
  )
}

export default Card