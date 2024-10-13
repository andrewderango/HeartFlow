import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import electronLogo from '../assets/electron.svg'
import './Register.css'

function Register(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Register button clicked')
    // here we want to interact with the local db (store password, unique serial number and username, max 10 usrs, etc.)
  }

  return (
    <div className="register-container">
      {/* <img alt="logo" className="logo" src={electronLogo} /> */}
      <div className="text">Register New User</div>
      <div style={{ height: '25px' }} />
      <form onSubmit={handleSubmit}>
        <div className="floating-label-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className={username ? 'filled' : ''}>Username</label>
        </div>
        <div className="floating-label-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className={password ? 'filled' : ''}>Password</label>
        </div>
        <div className="floating-label-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label className={confirmPassword ? 'filled' : ''}>Confirm Password</label>
        </div>
        <div className="floating-label-group">
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
          <label className={serialNumber ? 'filled' : ''}>Pacemaker Serial Number</label>
        </div>
        <div className="actions">
          <div className="action">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                handleSubmit(e as unknown as React.FormEvent)
              }}
            >
              Register
            </Link>
          </div>
          <div className="action">
            <button className="back-button" type="button" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register