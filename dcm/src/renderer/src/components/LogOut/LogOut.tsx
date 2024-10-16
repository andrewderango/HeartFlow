import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import './LogOut.css'

const LogoutButton: React.FC = () => {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    setUser(undefined)
    navigate('/')
  }

  return (
    <button className="logout-button" type="button" onClick={handleLogout}>
      <LogOut size={24} />
      <span>Sign Out</span>
    </button>
  )
}

export default LogoutButton