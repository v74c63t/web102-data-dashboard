import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
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
  )
}

export default NavBar