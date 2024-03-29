import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import List from './components/List/List'

function App() {

  return (
    <div>
      <div className='side-bar'>
        <Header />
        <NavBar />
      </div>
      <div className='page'>
        <Card />
        <List />
      </div>
    </div>
  )
}

export default App
