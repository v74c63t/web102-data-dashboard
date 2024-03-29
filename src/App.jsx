import { useState, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import List from './components/List/List'
import axios from 'axios'

function App() {

  const [totalResult, setTotalResult] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalFilter, setTotalFilter] = useState(0)

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
    <div>
      <div className='side-bar'>
        <Header />
        <NavBar />
      </div>
      <div className='page'>
        <div className='summary'>
          <Card data={total} name={"Breweries in Total"} />
          <Card data={totalResult} name={"Breweries Found in Total from Searching"} />
          <Card data={totalFilter} name={"Breweries Found in Total from Filtering"} />
        </div>
        <List setTotalResult={setTotalResult} setTotalFilter={setTotalFilter} />
      </div>
    </div>
  )
}

export default App
