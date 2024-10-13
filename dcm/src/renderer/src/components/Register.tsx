import React, { useState } from 'react'

function Register(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [serialNumber, setSerialNumber] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // here we want to interact with the local db (store password, unique serial number and username, max 10 usrs, etc.)
  }

  return (
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
      <button type="submit">Register</button>
    </form>
  )
}

export default Register