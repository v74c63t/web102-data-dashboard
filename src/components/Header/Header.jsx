import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
      <Link className='link' to="/">
      🍺 BrewDash
      </Link>
    </div>
  )
}

export default Header