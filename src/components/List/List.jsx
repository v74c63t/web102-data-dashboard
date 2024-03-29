import { useState, useEffect } from 'react'
import axios from 'axios'
import './List.css'

const List = () => {

  const [breweries, setBreweries] = useState([])
  const [query, setQuery] = useState('')

  useEffect (() => {
    const fetchInitialInfo = () => {
      axios.get('https://api.openbrewerydb.org/v1/breweries?per_page=25')
            .then((res) => {
              setBreweries(res.data)
            })
    }
    fetchInitialInfo()
  }, [])

  const handleSearch = () => {
    if(query !== "")
    {
      axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${query.replace(/ /g,"_")}&per_page=25`)
        .then((res) => {
          setBreweries(res.data)
        })
    }
  }

  return (
    <div>
      <div className='search'>
        <input type='text' placeholder='Search' value={query} onChange={(event) => setQuery(event.target.value)} />
        <button type='submit' onClick={handleSearch}>Search</button>
      </div>
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
                  <th>{`${brewery.address_1!== null ? brewery.address_1: "N/A"}${brewery.address_2 !== null ? ", " + brewery.address_2 : ""}${brewery.address_3 !== null ? ", " + brewery.address_3 : ""}`}</th>
                  <th>{brewery.city}</th>
                  <th>{brewery.state_province}</th>
                  <th>{brewery.country}</th>
                  <th>{`${brewery.phone!== null ? brewery.phone: "N/A"}`}</th>
                  <th>{brewery.website_url!== null ? (<a href={brewery.website_url}>{brewery.website_url}</a>): "N/A"}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List