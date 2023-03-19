import { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'

export default function Login() {
    const [type, setType] = useState(true)
  return (
    <div className='login'>
        <form className='login-form'>
            <h1 className='login-title'>Login</h1>
            <h2 className='login-subtitle'>Welcome Back!</h2>
            <div>
                <label className='login-label'>Email Address</label>
                <input type='email' className='login-input' placeholder='e.g. example@domain.com' required/>
            </div>
            <div>
                <label className='login-label'>Password</label>
                <div className='password-box'>
                    <input type={type ? 'password' : 'text'} className='login-input' placeholder='Must have at least 6 characters' required/>
                    { type ? <i className="uil uil-eye-slash" onClick={() => setType(!type)}></i> :
                    <i className="uil uil-eye" onClick={() => setType(!type)}></i> }
                </div>
            </div>
            <p><a href='#'>Forgot password?</a></p>
            <button className='login-btn'>Login</button>
        </form>
        <footer>
            <small>Don't have an account? <Link to='/'><span>SIGNUP</span></Link></small>
        </footer>
    </div>
  )
}
