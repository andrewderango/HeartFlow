import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Register.css'

function Register(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value)
    }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setError(null)
    console.log(
      `handleSubmit called with: ${username}, ${password}, ${confirmPassword}, ${serialNumber}`,
    )

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const result = await window.api.registerUser(username, password, serialNumber)
    console.log(`handleSubmit result: ${JSON.stringify(result)}`)
    if (result.success) {
      navigate('/login')
    } else {
      setError(result.message ?? 'An unknown error occurred')
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
        {error && <div className="error-message">{error}</div>}
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
