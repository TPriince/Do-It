import { Link } from 'react-router-dom'
import './signup.css'

export default function Signup() {

  return (
    <div className='signup'>
        <form className='signup-form'>
            <h1 className='signup-title'>Sign up</h1>
            <input type='email' className='signup-input' placeholder='Email address' required/>
            <input type='password' className='signup-input' placeholder='Enter Password' required/>
            <input type='password' className='signup-input' placeholder='Confirm Password' required/>
            <button className='signup-btn'>Create account </button>
        </form>
        <footer>
            <small>Already have an account? <Link to='/login'><span>Log in</span></Link></small>
        </footer>
    </div>
  )
}
