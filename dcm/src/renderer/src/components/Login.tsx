import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import electronLogo from '../assets/electron.svg'
import './Login.css'

function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Login button clicked')
    // here we want to interact with the local db (check password correctness, ensure user exists, etc.)
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
    <div className="login-container">
      {/* <img alt="logo" className="logo" src={electronLogo} /> */}
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <div className="text">Log In User</div>
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
        <div className="login-button">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(e as unknown as React.FormEvent)
            }}
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login