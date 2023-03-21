import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  return (
    <Link to='/'>
      <nav className='header'>
        <i className='bx bx-check-double'></i>
        <h1 className='header-title'>Do-It</h1>
      </nav>
    </Link>
  )
}
