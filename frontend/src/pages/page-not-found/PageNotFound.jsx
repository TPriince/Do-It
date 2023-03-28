import { Link } from 'react-router-dom'
import './pagenotfound.css'

export default function PageNotFound() {
  return (
    <section className='page-not-found'>
        <h1 className='section-title'>404</h1>
        <h1 className='section-subtitle'>Page Not Found</h1>

        <div className='back-home-link'>
          <Link to='/dashboard'>
            <i className='bx bx-arrow-back'></i> 
            <p>Go back home</p>
          </Link>
        </div>
    </section>
  )
}
