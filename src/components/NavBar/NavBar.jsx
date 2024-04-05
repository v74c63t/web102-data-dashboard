import Header from '../Header/Header'
import './NavBar.css'
import { Link, Outlet } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <div className='side-bar'>
        <Header />
        <div className='nav-bar'>
          <ul className="nav-bar-list">
            <li>
              <Link className='link' to="/">
                🏠 Dashboard
              </Link>
            </li>
            <li>
              <Link className='link' to="/">
                🔍 Search
              </Link>
            </li>
            <li>
              <Link className='link' to="/">
                ℹ️ About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default NavBar