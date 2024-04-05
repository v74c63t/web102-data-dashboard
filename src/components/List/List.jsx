import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './List.css'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Legend
} from "recharts";

const List = ({setTotalResult, setTotalFilter, totalResult, setPlus, plus}) => {

  const [page, setPage] = useState(1)

  const [breweries, setBreweries] = useState([])
  const [nonFilter, setNonFilter] = useState([])
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [size, setSize] = useState(25)
  const [searchType, setSearchType] = useState('all')

  const [filterType, setFilterType] = useState('all')
  const [filterQuery, setFilterQuery] = useState('')
  const [filterQueryType, setFilterQueryType] = useState('all')

  const [typeData, setTypeData] = useState([])
  const [locationData, setLocationData] = useState([])
  const types = ['micro', 'nano', 'regional', 'brewpub', 'planning', 'contract', 'proprietor', 'closed']

  const [locationType, setLocationType] = useState('country')

  // const [next, setNext] = useState(false)

  useEffect (() => {
    const fetchInitialInfo = async () => {
      axios.get(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=25`)
            .then((res) => {
              setBreweries(res.data)
              setNonFilter(res.data)
              getChartData(res.data)
            })
      axios.get(`https://api.openbrewerydb.org/v1/breweries/meta`)
            .then((res) => {
              setTotalResult(res.data.total)
              setTotalFilter(25)
              // setNext(true)
            })
    }
    fetchInitialInfo()
  }, [])

  const getLocationData = (res) => {
    const locations = Array.from(new Set(res.map((brewery) => brewery[locationType])))
    let temp = []
    locations.forEach((location) => {
      const count = res.reduce((sum,brewery) => sum+(brewery[locationType]===location), 0)
        const obj = {
          "name": location,
          "count": count
        }
        temp.push(obj)
    })
    setLocationData(temp)
  }

  const getTypeData = (res) => {
    let temp = []
    types.forEach((type) => {
      const count = res.reduce((sum,brewery) => sum+(brewery.brewery_type===type), 0)
      // if(count !== 0) {
        const obj = {
          "name": type,
          "count": count
        }
        temp.push(obj)
      // }
    })
    setTypeData(temp)
    // console.log(temp)
    // console.log(typeData)
  }

  const getChartData = (res) => {
    getTypeData(res)
    getLocationData(res)
  }

  const handleSearch = () => {
    if(query.replace(/ /g,"") !== "")
    {
      if(searchType !== "all") {
        const url = `https://api.openbrewerydb.org/v1/breweries?by_${searchType}=${query.replace(/ /g,"_")}`
        if(type !== 'all') {
          axios.get(`${url}&by_type=${type}&page=${page}&per_page=${size}`)
              .then((res) => {
                setBreweries(res.data)
                setNonFilter(res.data)
                getChartData(res.data)
              })
          axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_${searchType}=${query.replace(/ /g,"_")}&by_type=${type}`)
              .then((res) => {
                setTotalResult(res.data.total)
                setTotalFilter(Math.min(res.data.total, size))
                // checkNext(res.data.total)
              })
          setPlus(false)
        }
        else {
          axios.get(`${url}&page=${page}&per_page=${size}`)
              .then((res) => {
                setBreweries(res.data)
                setNonFilter(res.data)
                getChartData(res.data)
              })
          axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_${searchType}=${query.replace(/ /g,"_")}`)
              .then((res) => {
                setTotalResult(res.data.total)
                setTotalFilter(Math.min(res.data.total, size))
                // checkNext(res.data.total)
              })
          setPlus(false)
        }
      }
      else {
        axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${query.replace(/ /g,"_")}&page=${page}&per_page=${size}`)
          .then((res) => {
            setBreweries(res.data)
            setNonFilter(res.data)
            getChartData(res.data)
          })
        axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${query.replace(/ /g,"_")}&page=${page}&per_page=200`)
          .then((res) => {
            if(page > 1) {
              setTotalResult(Math.min(((res.data.length + ((page - 1) * 200)), totalResult)))
            }
            else {
              setTotalResult(Math.min(((page) * 200), (res.data.length + ((page - 1) * 200))))
            }
            if(res.data.length === 200) {
              setPlus(true)
            }
            else {
              setPlus(false)
            }
            setTotalFilter(Math.min(res.data.length, size))
            // checkNext(res.data.length)
          })
      }
    }
    else {
      if(type !== 'all') {
        axios.get(`https://api.openbrewerydb.org/v1/breweries?by_type=${type}&page=${page}&per_page=${size}`)
            .then((res) => {
              setBreweries(res.data)
              setNonFilter(res.data)
              getChartData(res.data)
            })
        axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_type=${type}`)
            .then((res) => {
              setTotalResult(res.data.total)
              setTotalFilter(Math.min(res.data.total, size))
              // checkNext(res.data.total)
            })
        setPlus(false)
      }
      else {
        axios.get(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${size}`)
            .then((res) => {
              setBreweries(res.data)
              setNonFilter(res.data)
              getChartData(res.data)
            })
        axios.get(`https://api.openbrewerydb.org/v1/breweries/meta`)
            .then((res) => {
              setTotalResult(res.data.total)
              setTotalFilter(Math.min(res.data.total, size))
              // checkNext(res.data.total)
            })
        setPlus(false)
      }
    }
  }

  const handleFilter = () => {
    if(filterQuery.replace(/ /g,"") !== "")
    {
      if(filterQueryType !== "all") {
        if(filterType !== 'all') {
          const res = nonFilter.filter((brewery) => (brewery[filterQueryType]?brewery[filterQueryType]:"").toLowerCase().includes(filterQuery.toLowerCase()) && brewery.brewery_type === filterType)
          setBreweries(res)
          setTotalFilter(res.length)
        }
        else {
          const res = nonFilter.filter((brewery) => ((brewery.name?brewery.name:"").toLowerCase().includes(filterQuery.toLowerCase()) || 
                                                    (brewery.city?brewery.city:"").toLowerCase().includes(filterQuery.toLowerCase()) || 
                                                    (brewery.state_province?brewery.state_province:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.country?brewery.country:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_1?brewery.address_1:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_2?brewery.address_2:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_3?brewery.address_3:"").toLowerCase().includes(filterQuery.toLowerCase())) ||
                                                    brewery.brewery_type.includes(filterQuery.toLowerCase()))
          setBreweries(res)
          setTotalFilter(res.length)
        }
      }
      else {
        if(filterType !== 'all') {
          const res = nonFilter.filter((brewery) => ((brewery.name?brewery.name:"").toLowerCase().includes(filterQuery.toLowerCase()) || 
                                                    (brewery.city?brewery.city:"").toLowerCase().includes(filterQuery.toLowerCase()) || 
                                                    (brewery.state_province?brewery.state_province:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.country?brewery.country:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_1?brewery.address_1:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_2?brewery.address_2:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_3?brewery.address_3:"").toLowerCase().includes(filterQuery.toLowerCase())) &&
                                                    brewery.brewery_type === filterType)
          setBreweries(res)
          setTotalFilter(res.length)
        }
        else {
          const res = nonFilter.filter((brewery) => ((brewery.name?brewery.name:"").toLowerCase().includes(filterQuery.toLowerCase()) || 
                                                    (brewery.city?brewery.city:"").toLowerCase().includes(filterQuery.toLowerCase()) || 
                                                    (brewery.state_province?brewery.state_province:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.country?brewery.country:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_1?brewery.address_1:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_2?brewery.address_2:"").toLowerCase().includes(filterQuery.toLowerCase()) ||
                                                    (brewery.address_3?brewery.address_3:"").toLowerCase().includes(filterQuery.toLowerCase())) ||
                                                    brewery.brewery_type.includes(filterQuery.toLowerCase()))
          setBreweries(res)
          setTotalFilter(res.length)
        }
      }
    }
    else {
      if(filterType !== 'all') {
        const res = nonFilter.filter((brewery) => brewery.brewery_type === filterType)
          setBreweries(res)
          setTotalFilter(res.length)
      }
    }
  }

  const handleResetFilter = () => {
    setBreweries(nonFilter)
    setTotalFilter(size)
    setFilterType('all')
    setFilterQueryType('all')
    setFilterQuery('')
  }

  const handleResetSearch = () => {
    setType('all')
    setSearchType('all')
    setQuery('')
    setSize(25)
    setTotalFilter(25)
    axios.get(`https://api.openbrewerydb.org/v1/breweries?page=1&per_page=25`)
            .then((res) => {
              setBreweries(res.data)
              setNonFilter(res.data)
              getChartData(res.data)
            })
    axios.get(`https://api.openbrewerydb.org/v1/breweries/meta`)
          .then((res) => {
            setTotalResult(res.data.total)
          })
    setPlus(false)
    // setPage(1)
  }

  // const checkNext = (total) => {
  //   if(plus) {
  //     if(((page + 1) * size) % 200 !== 0) {
  //       if((page + 1) * size < total || (total - (page * size) > 0)) {
  //         setNext(true)
  //         return
  //       }
  //     }
  //     if(query.replace(/ /g,"") !== "") {
  //       axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${query.replace(/ /g,"_")}&page=${page + 1}&per_page=200`)
  //         .then((res) => {
  //           if(res.data.length === 0) {
  //             setPlus(false)
  //             setNext(false)
  //             return
  //           }
  //         })
  //       if((page + 1) * size <= total || (total- (page * size) > 0)) {
  //         setNext(true)
  //         return
  //       }
  //     }
  //   }
  //   else {
  //     if((page + 1) * size <= total || (total- (page * size) > 0)) {
  //       setNext(true)
  //       return
  //     }
  //     else {
  //       setNext(false)
  //       return
  //     }
  //   }
  // }

  // const handlePrev = () => {
  //   setPage(page - 1)
  //   handleSearch()
  //   handleResetFilter()
  // }

  // const handleNext = () => {
  //   setPage(page + 1)
  //   handleSearch()
  //   handleResetFilter()
  // }

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
        <button type='submit' onClick={() => {setPage(1); handleSearch()}} className='btn'>Search</button>
        <button type='submit' onClick={handleResetSearch} className='reset'>Reset</button>
      </div>
      <div className='filter'>
        <label htmlFor="filter-search-type">Filter: </label>
        <select name="filter-search-type" id="filter-search-type" value={filterQueryType} onChange={e => setFilterQueryType(e.target.value)}>
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="state_province">State</option>
          <option value="country">Country</option>
        </select>
        <input type='text' placeholder='Filter' value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} />
        <label htmlFor="filter-type">Select Type: </label>
        <select name="filter-type" id="filter-type" value={filterType} onChange={e => setFilterType(e.target.value)}>
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
        <button type='submit' onClick={handleFilter} className='btn'>Filter</button>
        <button type='submit' onClick={handleResetFilter} className='reset'>Reset</button>
      </div>
      <div className="charts">
          <div className='chart'>
            <h3>Number of Breweries by Brewery Type</h3>
            <BarChart width={690} height={240} data={typeData} margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name">
                <Label value="Type of Brewery" offset={-10} position={'insideBottom'} fill='black' />
              </XAxis>
              <YAxis label={{ value: 'Number of Breweries', angle: -90, offset:'-10', position: 'center', fill: 'black'}} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </div>
          <div className='chart'>
            <h3>Number of Breweries by {locationType.charAt(0).toUpperCase() + locationType.slice(1)}</h3>
            <BarChart width={690} height={240} data={locationData} margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name">
                <Label value={locationType.charAt(0).toUpperCase() + locationType.slice(1)} offset={-10} position={'insideBottom'} fill='black' />
              </XAxis>
              <YAxis label={{ value: 'Number of Breweries', angle: -90, offset:'-10', position: 'center', fill: 'black'}} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      <div className='list'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              {/* <th>Address</th> */}
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Details</th>
              {/* <th>Phone</th>
              <th>Website</th> */}
            </tr>
          </thead>
          <tbody>
            {breweries.map((brewery, i) => {
              return (
                <tr key={i}>
                  <td>{brewery.name}</td>
                  <td>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</td>
                  {/* <td>{`${brewery.address_1!== null ? brewery.address_1: "N/A"}${brewery.address_2 !== null ? ", " + brewery.address_2 : ""}${brewery.address_3 !== null ? ", " + brewery.address_3 : ""}`}</td> */}
                  <td>{brewery.city}</td>
                  <td>{brewery.state_province}</td>
                  <td>{brewery.country}</td>
                  <td>
                    <Link className='link' to={`/brewery/${brewery.id}`}>Link</Link>
                  </td>
                  {/* <td>{`${brewery.phone!== null ? brewery.phone: "N/A"}`}</td>
                  <td>{brewery.website_url!== null ? (<a href={brewery.website_url}>{brewery.website_url}</a>): "N/A"}</td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        {/* <div className='pagination'>
          {page !== 1 ? <button className="btn" onClick={handlePrev}>Prev</button> : <button className="btn disabled" disabled>Prev</button>}
          <p>Page {page}</p>
          {next ? <button className="btn" onClick={handleNext}>Next</button> : <button className="btn disabled" disabled>Next</button>}
        </div> */}
    </div>
  )
}

export default List