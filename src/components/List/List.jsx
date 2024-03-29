import { useState, useEffect } from 'react'
import axios from 'axios'
import './List.css'

const List = () => {

  const [breweries, setBreweries] = useState([])

  useEffect (() => {
    const fetchInitialInfo = () => {
      axios.get('https://api.openbrewerydb.org/v1/breweries?per_page=3')
            .then((res) => {
              setBreweries(res.data)
            })
    }
    fetchInitialInfo()
  }, [])

  return (
    <div className='list'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {breweries.map((brewery, i) => {
            return (
              <tr key={i}>
                <th>{brewery.name}</th>
                <th>{brewery.brewery_type}</th>
                <th>{`${brewery.address_1}${brewery.address_2 !== null ? ", " + brewery.address_2 : ""}${brewery.address_3 !== null ? ", " + brewery.address_3 : ""}`}</th>
                <th>{brewery.city}</th>
                <th>{brewery.state_province}</th>
                <th>{brewery.country}</th>
                <th>{brewery.phone}</th>
                <th><a href={brewery.website_url}>{brewery.website_url}</a></th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default List