import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'
import './Register.css'

function Register(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value)
    }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/

    if (username.length < 3) {
      addToast('Username must be at least 3 characters long', 'error')
      return
    }

    if (password.length < 8) {
      addToast('Password must be at least 8 characters long', 'error')
      return
    }

    if (!specialCharRegex.test(password)) {
      addToast('Password must contain at least one special character', 'error')
      return
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error')
      return
    }

    const result = await window.api.registerUser(username, password, serialNumber)
    if (result.success) {
      addToast('User registered successfully', 'success')
      navigate('/login')
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
    <div className="register-container">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <div className="text">Register New User</div>
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