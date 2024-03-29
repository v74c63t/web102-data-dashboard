import { useState, useEffect } from 'react'
import axios from 'axios'
import './List.css'

const List = ({setTotalResult}) => {

  const [breweries, setBreweries] = useState([])
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [size, setSize] = useState(25)
  const [searchType, setSearchType] = useState('all')

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
      if(searchType !== "all") {
        const url = `https://api.openbrewerydb.org/v1/breweries?by_${searchType}=${query.replace(/ /g,"_")}`
        if(type !== 'all') {
          axios.get(`${url}&by_type=${type}&per_page=${size}`)
              .then((res) => {
                setBreweries(res.data)
              })
          axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_${searchType}=${query.replace(/ /g,"_")}&by_type=${type}`)
              .then((res) => {
                setTotalResult(res.data.total)
              })
        }
        else {
          axios.get(`${url}&per_page=${size}`)
              .then((res) => {
                setBreweries(res.data)
              })
          axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_${searchType}=${query.replace(/ /g,"_")}`)
              .then((res) => {
                setTotalResult(res.data.total)
              })
        }
      }
      else {
        axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${query.replace(/ /g,"_")}&per_page=${size}`)
          .then((res) => {
            setBreweries(res.data)
          })
        axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${query.replace(/ /g,"_")}&per_page=200`)
          .then((res) => {
            setTotalResult(res.data.length)
          })
      }
    }
    else {
      if(type !== 'all') {
        axios.get(`https://api.openbrewerydb.org/v1/breweries?by_type=${type}&per_page=${size}`)
            .then((res) => {
              setBreweries(res.data)
            })
        axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_type=${type}`)
            .then((res) => {
              setTotalResult(res.data.total)
            })
      }
      else {
        axios.get(`https://api.openbrewerydb.org/v1/breweries?per_page=${size}`)
            .then((res) => {
              setBreweries(res.data)
            })
        axios.get(`https://api.openbrewerydb.org/v1/breweries/meta`)
            .then((res) => {
              setTotalResult(res.data.total)
            })
      }
    }
  }

  return (
    <div>
      <div className='search'>
        <label htmlFor="search-type">Search: </label>
        <select name="search-type" id="search-type" value={searchType} onChange={e => setSearchType(e.target.value)}>
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="country">Country</option>
        </select>
        <input type='text' placeholder='Search' value={query} onChange={(event) => setQuery(event.target.value)} />
        <label htmlFor="size">Select Page Size: </label>
        <select name="size" id="size" value={size} onChange={e => setSize(e.target.value)}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        {
          searchType !== "all" ?
          (
            <>
              <label htmlFor="type">Select Type: </label>
              <select name="type" id="type" value={type} onChange={e => setType(e.target.value)}>
                <option value="all">All</option>
                <option value="micro">Micro</option>
                <option value="nano">Nano</option>
                <option value="regional">Regional</option>
                <option value="brewpub">Brewpub</option>
                <option value="planning">Planning</option>
                <option value="contract">Contract</option>
                <option value="proprietor">Proprietor</option>
                <option value="closed">Closed</option>
              </select>
            </>
          ) : ""
        }
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
                  <td>{brewery.name}</td>
                  <td>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</td>
                  <td>{`${brewery.address_1!== null ? brewery.address_1: "N/A"}${brewery.address_2 !== null ? ", " + brewery.address_2 : ""}${brewery.address_3 !== null ? ", " + brewery.address_3 : ""}`}</td>
                  <td>{brewery.city}</td>
                  <td>{brewery.state_province}</td>
                  <td>{brewery.country}</td>
                  <td>{`${brewery.phone!== null ? brewery.phone: "N/A"}`}</td>
                  <td>{brewery.website_url!== null ? (<a href={brewery.website_url}>{brewery.website_url}</a>): "N/A"}</td>
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