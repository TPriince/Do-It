import { Link, useLocation } from 'react-router-dom'
import './header.css'

export default function Header({ user }) {
  const { pathname } = useLocation()
  
  function handleLogOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  return (
    <nav className='header'>
      <Link to='/'>
        <div className='header-logo'>
          <i className='bx bx-check-double'></i>
          <h1 className='header-title'>Do-It</h1>
        </div>
      </Link>
      <div className='user-details'>
        { pathname === '/dashboard/tasks' ? <Link to='/dashboard/boards'><p>Back to boards</p></Link> : null } 
        <Link to='/login'><i className='bx bxs-log-out' onClick={handleLogOut} title='Log out'>Logout</i></Link>
        <h1 className='user-email'>Welcome {' '} <span>{user}</span></h1>
      </div>
    </nav>
  )
}
