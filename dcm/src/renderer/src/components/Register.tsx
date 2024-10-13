import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        Back
      </button>
      <div className="text">Register New User</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Pacemaker Serial Number:
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </label>
        </div>
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
      </form>
    </div>
  )
}

export default Register