import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../context/ToastContext'
import './Login.css'

function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useUser()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value)
    }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const result = await window.api.loginUser(username, password)
    if (result.success) {
      setUser(result.user)
      addToast('User logged in successfully', 'success')
      navigate('/dashboard')
    } else {
      addToast(result.message ?? 'An unknown error occurred', 'error')
    }
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('.floating-label-group input')
    inputs.forEach((input) => {
      if ((input as HTMLInputElement).value) {
        input.classList.add('filled')
      }
      input.addEventListener('input', () => {
        if ((input as HTMLInputElement).value) {
          input.classList.add('filled')
        } else {
          input.classList.remove('filled')
        }
      })
    })

    return (): void => {
      inputs.forEach((input) => {
        input.removeEventListener('input', () => {})
      })
    }
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
          <input type="text" value={username} onChange={handleInputChange(setUsername)} required />
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
