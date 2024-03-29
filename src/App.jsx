import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import List from './components/List/List'

function App() {

  const [resultTotal, setTotalResult] = useState(0)

  return (
    <div>
      <div className='side-bar'>
        <Header />
        <NavBar />
      </div>
      <div className='page'>
        <Card />
        <List setTotalResult={setTotalResult} />
      </div>
    </div>
  )
}

export default App
