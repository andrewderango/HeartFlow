import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import electronLogo from '../assets/electron.svg'
import './Register.css'

function Register(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Register button clicked')
    // here we want to interact with the local db (store password, unique serial number and username, max 10 usrs, etc.)
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('.floating-label-group input')
    inputs.forEach((input) => {
      if (input.value) {
        input.classList.add('filled')
      }
      input.addEventListener('input', () => {
        if (input.value) {
          input.classList.add('filled')
        } else {
          input.classList.remove('filled')
        }
      })
    })
  }, [])

  return (
    <div className="register-container">
      {/* <img alt="logo" className="logo" src={electronLogo} /> */}
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <div className="text">Register New User</div>
      <div style={{ height: '15px' }} />
      <form onSubmit={handleSubmit}>
        <div className="floating-label-group">
          <input
            type="text"
            value={username}
            onChange={handleInputChange(setUsername)}
            required
          />
          <label>Username</label>
        </div>
        <div className="floating-label-group">
          <input
            type="password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
          <label>Password</label>
        </div>
        <div className="floating-label-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword)}
            required
          />
          <label>Confirm Password</label>
        </div>
        <div className="floating-label-group">
          <input
            type="text"
            value={serialNumber}
            onChange={handleInputChange(setSerialNumber)}
            required
          />
          <label>Pacemaker Serial Number</label>
        </div>
        <div className="register-button">
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